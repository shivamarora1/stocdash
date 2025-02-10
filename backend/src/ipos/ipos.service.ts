import { Injectable } from '@nestjs/common';
import { Ipo } from './ipo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIpoDto } from './dto/create-ipo.dto';

@Injectable()
export class IposService {
  constructor(@InjectRepository(Ipo) private ipoRepository: Repository<Ipo>) {}

  findAll(): Promise<Ipo[]> {
    return this.ipoRepository.find();
  }
  async create(createIpoDto: CreateIpoDto): Promise<Ipo> {
    const ipo = this.ipoRepository.create(createIpoDto);
    return this.ipoRepository.save(ipo);
  }
}
