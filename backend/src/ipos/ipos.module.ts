import { Module } from '@nestjs/common';
import { IposController } from './ipos.controller';
import { IposService } from './ipos.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ipo } from './ipo.entity';
import { HttpModule } from '@nestjs/axios';
import { BseService } from 'src/bse/bse.service';
import { ChittorgarhService } from 'src/chittorgarh/chittorgarh.service';

@Module({
  imports: [ConfigModule, HttpModule, TypeOrmModule.forFeature([Ipo])],
  controllers: [IposController],
  providers: [IposService, BseService, ChittorgarhService],
})
export class IposModule {}
