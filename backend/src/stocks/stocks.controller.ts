import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { StocksService, BS_NIFTY, BS_SENSEX } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stockService: StocksService) {}

  @Get('indian-indices/:indices')
  async getIndianIndices(
    @Param('indices') indices: string,
    @Res() res: Response,
  ) {
    console.log(indices);
    const idxResponse = await this.stockService.getIndianIndicesFeed(indices);
    console.log(idxResponse);

    return res.status(HttpStatus.OK).json([{ input: indices }]);
  }

  @Get('options')
  async getOptions(@Res() res: Response) {
    // ! Logic is to call api and fetch data from multiple apis one by one.
    // ! call api to get options data.

    const currencyRes = await this.stockService.getCurrencyRates();
    const niftyRes = await this.stockService.getIndianIndicesFeed(BS_NIFTY);
    const sensexRes = await this.stockService.getIndianIndicesFeed(BS_SENSEX);
    const goldRate = await this.stockService.getGoldRate();

    const response: any = {
      'Gold (22K)': `1gm = ₹ ${goldRate['22kt']}`,
      'Gold (24K)': `1gm = ₹ ${goldRate['24kt']}`,
      Silver: '1Kg = ₹ 91,000.45',
      'Crude Oil': '₹ 4,500',
      Sensex: `₹ ${(sensexRes as any).data.data.pricecurrent.toLocaleString()}`,
      Nifty: `₹ ${(niftyRes as any).data.data.pricecurrent.toLocaleString()}`,
      USDINR: `₹ ${(currencyRes as any).data.data.data[1][0].toLocaleString()}`,
    };
    return res.status(HttpStatus.OK).json(response);
  }
}
