import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';
import { CreateIpoDto } from '../ipos/dto/create-ipo.dto';
import { isSameDay } from '../utils/date.utils';

@Injectable()
export class BseService {
  constructor(private readonly httpService: HttpService) {}
  async getOpenIpo(date: Date): Promise<Array<CreateIpoDto>> {
    // * Call BSE India api to get list of live IPOs
    const response = await this.httpService.axiosRef.get(
      'https://api.bseindia.com/BseIndiaAPI/api/GetPublicIssue/w',
      { headers: { Referer: 'https://www.bseindia.com/' } },
    );

    const ipoTableData = (response.data as any).Table;

    const IPOsData: Array<CreateIpoDto> = await Promise.all(
      ipoTableData
        .filter(
          (ele: any) =>
            ['IPO', 'FPO'].includes(ele['IR_flag']) &&
            isSameDay(new Date(ele['Start_Dt']), date),
        )
        .map(async (ele: any) => {
          const startDate = new Date(ele['Start_Dt']);
          const formattedDate = startDate
            .toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })
            .replace(' ', '/')
            .replace(',', '/');

          return await this.getIpoDetail(
            ele['Scrip_cd'],
            ele['IR_flag'],
            ele['FLAG'],
            ele['Status'],
            ele['IPO_NO'],
            formattedDate,
          );
        }),
    );
    return IPOsData;
  }

  private async getIpoDetail(
    ipoId: number,
    ipoType: string,
    idType: number,
    status: string,
    ipoNo: number,
    startDate: string,
  ): Promise<CreateIpoDto> {
    const url = `https://www.bseindia.com/markets/publicIssues/DisplayIPO.aspx?id=${ipoId}&type=${ipoType}&idtype=${idType}&status=${status}&IPONo=${ipoNo}&startdt=${startDate}`;
    try {
      const response = await this.httpService.axiosRef.get(url);
      const responseStr = response.data;

      const dom = new JSDOM(responseStr);
      const document = dom.window.document;
      const ipoName = document.querySelector('td.TTHeader font b').textContent;

      //   const securityTypeEle = Array.from(
      //     document.querySelectorAll('td.TTRow_left'),
      //   ).find((td) => td.textContent.trim() == 'Security Type');
      //   const securityType = securityTypeEle.nextElementSibling.textContent;

      const symbolTypeEle = Array.from(
        document.querySelectorAll('td.TTRow_left'),
      ).find((td) => td.textContent.trim() == 'Symbol');
      const symbolType = symbolTypeEle.nextElementSibling.textContent;

      const issuePeriodEle = Array.from(
        document.querySelectorAll('td.TTRow_left'),
      ).find((td) => td.textContent.trim() == 'Issue Period');
      const issuePeriod = issuePeriodEle.nextElementSibling.textContent;

      const priceBandEle = Array.from(
        document.querySelectorAll('td.TTRow_left'),
      ).find((td) => td.textContent.trim() == 'Price Band');
      const priceBand = priceBandEle?.nextElementSibling?.textContent;

      const issuePriceEle = Array.from(
        document.querySelectorAll('td.TTRow_left'),
      ).find((td) => td.textContent.trim() == 'Issue Price');
      const issuePriceBand = issuePriceEle?.nextElementSibling?.textContent;

      const faceValueEle = Array.from(
        document.querySelectorAll('td.TTRow_left'),
      ).find((td) => td.textContent.trim() == 'Face Value');
      const faceValue = faceValueEle.nextElementSibling.textContent;

      const minimumBidQuantityEle = Array.from(
        document.querySelectorAll('td.TTRow_left'),
      ).find((td) => td.textContent.trim() == 'Minimum Bid Quantity');
      const minimumBidQuantity =
        minimumBidQuantityEle.nextElementSibling.textContent;

      return {
        name: ipoName,
        symbol: symbolType,
        price: Number(priceBand || issuePriceBand),
        lotPrice:
          Number(priceBand || issuePriceBand) * Number(minimumBidQuantity),
        openDate: new Date(issuePeriod.split(' to ')[0]),
        closeDate: new Date(issuePeriod.split(' to ')[1]),
        lotSize: Number(minimumBidQuantity),
        minimumInvestment:
          Number(priceBand || issuePriceBand) * Number(minimumBidQuantity),
        faceValue: Number(faceValue),
      };
    } catch (e) {
      console.error(`error in fetching data from ${url} : ${e.message}`);
      throw e;
    }
  }
}
