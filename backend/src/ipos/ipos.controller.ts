import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { IposService } from './ipos.service';

@Controller('ipos')
export class IposController {
  constructor(private readonly ipoService: IposService) {}

  @Get('')
  async getIpos(@Query('date') date, @Res() res: Response) {
    // * endpoint used to manually fed ipo data to database
    let dateObj = new Date();
    if (date) {
      dateObj = new Date(date);
    }
    const ipoData = await this.ipoService.handleIpoCron(dateObj);
    return res.status(HttpStatus.OK).json(ipoData);
  }
}
