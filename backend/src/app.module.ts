import { Module } from '@nestjs/common';
import { StocksModule } from './stocks/stocks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IposModule } from './ipos/ipos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    StocksModule,
    ConfigModule.forRoot(),
    IposModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, ScheduleModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER_NAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: 'stocdash',
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class AppModule {}
