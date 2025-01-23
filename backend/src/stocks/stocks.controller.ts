import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { StocksService, BS_NIFTY, BS_SENSEX } from './stocks.service';
import { extractString, formatNumberToEnglish } from 'src/utils/string.utils';

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
    const [currencyRes, niftyRes, sensexRes, goldRateRes] = await Promise.all([
      this.stockService.getCurrencyRates(),
      this.stockService.getIndianIndicesFeed(BS_NIFTY),
      this.stockService.getIndianIndicesFeed(BS_SENSEX),
      this.stockService.getGoldRateHTML(),
    ]);

    const gold22Kt = extractString(
      /<span class="left">Gold 22k<\/span><span><span class="price">₹(\d*\.?\d+)<\/span>/,
      goldRateRes.data,
    );
    const gold24Kt = extractString(
      /<span class="left">Gold 24k<\/span><span><span class="price">₹(\d*\.?\d+)<\/span>/,
      goldRateRes.data,
    );
    const silver = extractString(
      /<span class="left">Silver <\/span><span><span class="price">₹(\d*\.?\d+)<\/span>/,
      goldRateRes.data,
    );

    const response: any = {
      'Gold (22K)': `1gm = ₹ ${formatNumberToEnglish(gold22Kt)}`,
      'Gold (24K)': `1gm = ₹ ${formatNumberToEnglish(gold24Kt)}`,
      Silver: `1g = ₹ ${formatNumberToEnglish(silver)}`,
      Sensex: `₹ ${formatNumberToEnglish((sensexRes as any).data.data.pricecurrent)}`,
      Nifty: `₹ ${formatNumberToEnglish((niftyRes as any).data.data.pricecurrent)}`,
      USDINR: `₹ ${formatNumberToEnglish((currencyRes as any).data.data.data[1][0])}`,
    };
    return res.status(HttpStatus.OK).json(response);
  }
}
