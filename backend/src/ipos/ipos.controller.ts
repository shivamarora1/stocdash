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
  @Get('active')
  async getActiveIpos(@Res() res: Response) {
    const activeIposData = await this.ipoService.findActiveIPOs();
    return res.status(HttpStatus.OK).json(activeIposData);
  }
  @Get('to-be-listed')
  async getToBeListedIpos(@Res() res: Response) {
    const toBeListedIposData = await this.ipoService.findToBeListedIPOs();
    return res.status(HttpStatus.OK).json(toBeListedIposData);
  }
}
