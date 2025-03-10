import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import { IpoDetail, IpoDetailsWithGmp, IpoStatus } from './chittorgarh.dto';
import { firstValueFrom } from 'rxjs';
import { IpoSuggestion } from '../ipos/dto/create-ipo.dto';

@Injectable()
export class ChittorgarhService {
  BASE_URL = 'https://www.chittorgarh.com';
  constructor(private readonly httpService: HttpService) {}
  async getCurrentIpos(): Promise<Array<IpoDetailsWithGmp>> {
    // IPO with status = "Current"

    const [mainstreamIpos, smeIpos] = await Promise.all([
      this.getIpos(false),
      this.getIpos(true),
    ]);
    const ipos = mainstreamIpos
      .concat(smeIpos)
      .filter((e) => e.status === 'Current');

    return Promise.all(
      ipos.map(async (ipo) => {
        const ipoDetail: IpoDetail = await this.getIpoDetail(ipo.url);
        const ipoGmp = await this.getIPOGmp(ipoDetail.gmpUrl);
        return {
          ...ipoDetail,
          gmp: ipoGmp,
          name: ipo.name,
        };
      }),
    );
  }

  private async getIpos(isSme: boolean = false): Promise<Array<IpoStatus>> {
    // get detail about mainline and sme ipo.
    let url = `${this.BASE_URL}/ipo/ipo_dashboard.asp`;
    if (isSme) {
      url = `${this.BASE_URL}/ipo/ipo_dashboard.asp?a=sme`;
    }

    const response = await fetch(url);
    const data = await response.text();

    const dom = new JSDOM(data);
    const document = dom.window.document;
    const ipoTableEle = document.querySelectorAll(
      '#mainlineIpoTable table tbody tr',
    );

    // console.log(ipoTableEle)
    const iposList = Array.from(ipoTableEle).map((ipo) => {
      const tdS = ipo.querySelectorAll('td');
      return {
        name: tdS[0].textContent,
        url: (tdS[0].querySelector('div a') as any).href,
        status: tdS[3].textContent,
      };
    });
    return iposList;
  }

  private async getIpoDetail(url): Promise<IpoDetail> {
    // Get details of IPO , Chittorgarh will give url , making call to that url to get information
    const response = await fetch(`${this.BASE_URL}${url}`);

    const data = await response.text();
    const dom = new JSDOM(data);
    const document = dom.window.document;
    const detailTable = document.querySelector(
      '#main > .row:nth-child(6) > div:nth-child(2) > div > table > tbody',
    );
    const rows = detailTable?.querySelectorAll('tr');

    return {
      openDate: new Date(rows[0].querySelector('td:nth-child(2)')?.textContent),
      closeDate: new Date(
        rows[1].querySelector('td:nth-child(2)')?.textContent,
      ),
      tentative_allotment: new Date(
        rows[2].querySelector('td:nth-child(2)')?.textContent,
      ),
      initiationOfRefunds: new Date(
        rows[3].querySelector('td:nth-child(2)')?.textContent,
      ),
      creditOfSharesToDemat: new Date(
        rows[4].querySelector('td:nth-child(2)')?.textContent,
      ),
      tentativeListingDate: new Date(
        rows[5].querySelector('td:nth-child(2)')?.textContent,
      ),
      suggestion: document
        .querySelector('#main > .row:nth-child(15) > div > h2 > b')
        ?.textContent.replace('(', '')
        .replace(')', '')
        .toLowerCase() as IpoSuggestion,
      review: document.querySelector('#main > .row:nth-child(15) > div > p')
        .textContent,
      gmpUrl: (
        document.querySelector(
          '#main > .row > div:nth-child(3) > div > div:nth-child(7) > a',
        ) as any
      ).href,
    };
  }

  private async getIPOGmp(url): Promise<number> {
    try {
      // Get IPO GMP detail from 3rd party URL...
      const response = await firstValueFrom(this.httpService.get(url));
      const data = await response.data;
      const dom = new JSDOM(data);
      const document = dom.window.document;
      const ipoIdStr = document.querySelector('#main').textContent;
      const match = ipoIdStr.match(/\/(\d+)"/);
      let ipoId = '';
      if (match) {
        ipoId = match[1];
        const apiRes = await firstValueFrom(
          this.httpService.get(
            `https://webnodejs.investorgain.com/cloud/ipo/ipo-gmp-read/${ipoId}/true/`,
          ),
        );
        const apiJson = await apiRes.data;
        return apiJson.ipoGmpData[0].gmp as number;
      } else {
        console.log(`GMP data not found for IPO ${url}`);
        return null;
      }
    } catch {
      console.error(`error in getting GMP for ${url}`);
      return null;
    }
  }
}
