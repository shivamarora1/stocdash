import { Controller, Get, HttpStatus, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { IposService } from './ipos.service';
import { CreateIpoDto } from './dto/create-ipo.dto';
import { BseService } from 'src/bse/bse/bse.service';

@Controller('ipos')
export class IposController {
  constructor(
    private configService: ConfigService,
    private readonly ipoService: IposService,
    private readonly bseService: BseService,
  ) {}
  @Get('')
  async getIpos(@Query('date') date, @Res() res: Response) {
    const ipoData: Array<CreateIpoDto> = await this.bseService.getOpenIpo(
      new Date(date),
    );

    const result = this.ipoService.create(ipoData);
    console.log(result);
    return res.status(HttpStatus.OK).json(ipoData);
  }
}
