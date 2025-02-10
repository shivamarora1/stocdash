import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { IposService } from './ipos.service';
import { CreateIpoDto } from './dto/create-ipo.dto';

@Controller('ipos')
export class IposController {
  constructor(
    private configService: ConfigService,
    private readonly ipoService: IposService,
  ) {}
  @Get('')
  async getIpos(@Res() res: Response) {
    console.log('get IPOS');
    const sampleIpo = new CreateIpoDto();
    sampleIpo.name = 'ABC IPO';
    sampleIpo.price = 100.5;
    sampleIpo.gmp = 10.2;
    sampleIpo.lotPrice = 15000;
    sampleIpo.lotSize = 150;
    sampleIpo.suggestion = 'Good for long-term investment';
    sampleIpo.review = 'High demand in the market';
    sampleIpo.openDate = new Date('2025-02-15T10:00:00Z');
    sampleIpo.closeDate = new Date('2025-02-18T10:00:00Z');
    sampleIpo.listingDate = new Date('2025-02-25T10:00:00Z');
    sampleIpo.minimumInvestment = 15000;
    sampleIpo.issuePrice = 100;
    sampleIpo.issueSize = 5000000;
    sampleIpo.faceValue = 10;
    sampleIpo.totalShareOffered = 500000;
    sampleIpo.offeredToPublic = 300000;
    sampleIpo.sector = 'Finance';
    sampleIpo.subSector = 'Banking';
    sampleIpo.issueType = 'Book Building';

    const result = this.ipoService.create(sampleIpo);
    console.log(result);
    return res.status(HttpStatus.OK).json([{ input: 'here' }]);
  }
}
