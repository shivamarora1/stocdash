import { Test, TestingModule } from '@nestjs/testing';
import { IposController } from './ipos.controller';
import { IposService } from './ipos.service';
import { BseService } from '../bse/bse.service';
import { ChittorgarhService } from '../chittorgarh/chittorgarh.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ipo } from './ipo.entity';
import { HttpModule } from '@nestjs/axios';
import { Response } from 'express';

describe('IposController', () => {
  let controller: IposController;
  let service: IposService;
  let mockIpoRepo: any;

  const mockIpoRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    findBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IposController],
      providers: [
        IposService,
        {
          provide: getRepositoryToken(Ipo),
          useValue: mockIpoRepository,
        },
        BseService,
        ChittorgarhService,
      ],

      imports: [HttpModule],
    }).compile();

    controller = module.get<IposController>(IposController);
    service = module.get<IposService>(IposService);
    mockIpoRepo = module.get(getRepositoryToken(Ipo));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get active ipo', () => {
    it('should get active ipos', async () => {
      const ipos: Ipo[] = [];
      mockIpoRepo.findBy.mockReturnValue(ipos);

      const resMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;
      const result = await controller.getActiveIpos(resMock);
      expect(result.json).toHaveBeenCalledWith(ipos);
    });
  });
});
