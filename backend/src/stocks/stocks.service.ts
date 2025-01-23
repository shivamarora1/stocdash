import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

export const BS_SENSEX = 'in;SEN';
export const BS_NIFTY = 'in;NSX';

@Injectable()
export class StocksService {
  constructor(private readonly httpService: HttpService) {}

  // * Sort of workaround api
  getGoldRateHTML(): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef.get(
      `https://www.thangamayil.com/scheme/index/rateshistory/`,
    );
  }
  getIndianIndicesFeed(indicesName: string): Promise<AxiosResponse<any>> {
    indicesName = encodeURIComponent(indicesName);
    return this.httpService.axiosRef.get(
      `https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/${indicesName}`,
    );
  }
  getCurrencyRates(): Promise<AxiosResponse<any>> {
    return this.httpService.axiosRef.get(
      `https://api.moneycontrol.com/mcapi/v1/currency/getGlobalCurrencyRates`,
    );
  }
}
