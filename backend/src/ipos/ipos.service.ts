import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Ipo } from './ipo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIpoDto } from './dto/create-ipo.dto';
@Injectable()
export class IposService {
  constructor(
    @InjectRepository(Ipo) private ipoRepository: Repository<Ipo>,
    private readonly httpService: HttpService,
  ) {}

  findAll(): Promise<Ipo[]> {
    return this.ipoRepository.find();
  }
  async create(createIpoDto: Array<CreateIpoDto>): Promise<Array<Ipo>> {
    const ipo = this.ipoRepository.create(createIpoDto);
    return this.ipoRepository.save(ipo);
  }
}
