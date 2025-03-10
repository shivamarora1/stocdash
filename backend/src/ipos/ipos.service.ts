import { Injectable } from '@nestjs/common';
import { Ipo } from './ipo.entity';
import { Raw, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIpoDto } from './dto/create-ipo.dto';
import { BseService } from '../bse/bse.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ChittorgarhService } from '../chittorgarh/chittorgarh.service';
import { IpoDetailsWithGmp } from '../chittorgarh/chittorgarh.dto';
@Injectable()
export class IposService {
  constructor(
    @InjectRepository(Ipo) private ipoRepository: Repository<Ipo>,
    private readonly bseService: BseService,
    private readonly chService: ChittorgarhService,
  ) {}

  findAll(): Promise<Ipo[]> {
    return this.ipoRepository.find();
  }
  findActiveIPOs(): Promise<Ipo[]> {
    return this.ipoRepository.findBy({
      openDate: Raw((alias) => `${alias} <= date(NOW())`),
      closeDate: Raw((alias) => `date(NOW()) <= ${alias} `),
    });
  }
  findToBeListedIPOs(): Promise<Ipo[]> {
    return this.ipoRepository.findBy({
      openDate: Raw((alias) => `${alias} <= date(NOW())`),
      listingDate: Raw((alias) => `date(NOW()) <= ${alias} `),
    });
  }
  @Cron(CronExpression.EVERY_12_HOURS)
  async handleIpoCron(date: Date = new Date()): Promise<CreateIpoDto[]> {
    console.log(`running ipo cron: ${date}`);
    const ipoData: Array<CreateIpoDto> = await this.bseService.getOpenIpo(date);

    const cIpoData: Array<IpoDetailsWithGmp> =
      await this.chService.getCurrentIpos();

    ipoData.forEach((i) => {
      const match = cIpoData.find(
        (c) =>
          c.name.toLowerCase() ===
          i.name.toLowerCase().replace('ltd', 'limited'),
      );
      if (match) {
        Object.assign(i, {
          gmp: match.gmp,
          suggestion: match.suggestion,
          review: match.review,
          listingDate: match.tentativeListingDate,
          basisOfAllotment: match.creditOfSharesToDemat,
        });
      }
    });

    // * save or update new values.
    this.create(ipoData);
    return ipoData;
  }
  async create(createIpoDto: Array<CreateIpoDto>): Promise<Array<Ipo>> {
    const ipo = this.ipoRepository.create(createIpoDto);
    return this.ipoRepository.save(ipo);
  }
}
