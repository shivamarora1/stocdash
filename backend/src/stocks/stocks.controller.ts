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
}
