import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class StocksService {
  constructor(private readonly httpService: HttpService) {}

  getIndianIndicesFeed(indicesName: string): Promise<AxiosResponse<any>> {
    indicesName = encodeURIComponent(indicesName);
    return this.httpService.axiosRef.get(
      `https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/${indicesName}`,
    );
  }
}
