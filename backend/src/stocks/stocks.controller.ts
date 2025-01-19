import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { StocksService } from './stocks.service';

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
    const response: any = {
      'Gold (22K)': '1gm = ₹ 77,409.34',
      'Gold (24K)': '1gm = ₹ 83,000,34',
      Silver: '1Kg = ₹ 91,000.45',
      'Crude Oil': '₹ 4,500',
      Sensex: '₹ 3,400',
      Nifty: '₹ 2,455',
      USDINR: '₹ 86.12',
    };
    return res.status(HttpStatus.OK).json(response);
  }
}
