import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Ipo } from './ipo.entity';
import { Raw, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIpoDto } from './dto/create-ipo.dto';
import { BseService } from 'src/bse/bse.service';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class IposService {
  constructor(
    @InjectRepository(Ipo) private ipoRepository: Repository<Ipo>,
    private readonly bseService: BseService,
    private readonly httpService: HttpService,
  ) {}

  findAll(): Promise<Ipo[]> {
    return this.ipoRepository.find();
  }
  findActiveIPOs(): Promise<Ipo[]> {
    return this.ipoRepository.findBy({
      openDate: Raw((alias) => `${alias} <= NOW()`),
      closeDate: Raw((alias) => `${alias} > NOW()`),
    });
  }
  @Cron(CronExpression.EVERY_12_HOURS)
  async handleIpoCron(date: Date = new Date()): Promise<CreateIpoDto[]> {
    console.log(`running ipo cron: ${date}`);
    const ipoData: Array<CreateIpoDto> = await this.bseService.getOpenIpo(date);

    // * save or update new values.
    this.create(ipoData);
    return ipoData;
  }
  async create(createIpoDto: Array<CreateIpoDto>): Promise<Array<Ipo>> {
    const ipo = this.ipoRepository.create(createIpoDto);
    return this.ipoRepository.save(ipo);
  }
}
