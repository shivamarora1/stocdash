import { Test, TestingModule } from '@nestjs/testing';
import { IposController } from './ipos.controller';
import { IposService } from './ipos.service';
import { BseService } from '../bse/bse.service';
import { ChittorgarhService } from '../chittorgarh/chittorgarh.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ipo } from './ipo.entity';
import { HttpModule } from '@nestjs/axios';
import { Response } from 'express';
import { IpoSuggestion } from './dto/create-ipo.dto';

describe('IposController', () => {
  let controller: IposController;
  let service: IposService;
  let mockIpoRepo: any;
  let mockedBseService: BseService;
  let mockedChService: ChittorgarhService;

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
    mockedBseService = module.get<BseService>(BseService);
    mockedChService = module.get<ChittorgarhService>(ChittorgarhService);
    mockIpoRepo = module.get(getRepositoryToken(Ipo));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get active ipo', () => {
    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    it('should get empty active ipos', async () => {
      const ipos: Ipo[] = [];
      mockIpoRepo.findBy.mockReturnValue(ipos);

      const result = await controller.getActiveIpos(resMock);
      expect(result.json).toHaveBeenCalledWith(ipos);
    });

    it('should return ipos obj', async () => {
      const ipos: Ipo[] = [
        {
          symbol: 'PSPL',
          name: 'PDP SHIPPING & PROJECTS LTD',
          price: 135,
          gmp: 0,
          lotPrice: 135000,
          lotSize: 1000,
          suggestion: 'avoid',
          review:
            '[Dilip Davda]  PSPL is engaged in the business of providing end-to-end logistic and transport services as an MTO. It posted declining trends for its top lines.',
          openDate: new Date('2025-03-09T18:30:00.000Z'),
          closeDate: new Date('2025-03-11T18:30:00.000Z'),
          listingDate: new Date('2025-03-17T18:30:00.000Z'),
          basisOfAllotment: new Date('2025-03-16T18:30:00.000Z'),
          minimumInvestment: 135000,
          faceValue: 10,
        },
      ];
      mockIpoRepo.findBy.mockReturnValue(ipos);

      const result = await controller.getActiveIpos(resMock);
      expect(result.json).toHaveBeenCalledWith(ipos);
    });
  });

  describe('get to be listed ipo', () => {
    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

    it('should return to be listed ipos obj', async () => {
      const ipos: Ipo[] = [
        {
          symbol: 'PSPL',
          name: 'PDP SHIPPING & PROJECTS LTD',
          price: 135,
          gmp: 0,
          lotPrice: 135000,
          lotSize: 1000,
          suggestion: 'avoid',
          review:
            '[Dilip Davda]  PSPL is engaged in the business of providing end-to-end logistic and transport services as an MTO. It posted declining trends for its top lines.',
          openDate: new Date('2025-03-09T18:30:00.000Z'),
          closeDate: new Date('2025-03-11T18:30:00.000Z'),
          listingDate: new Date('2025-03-17T18:30:00.000Z'),
          basisOfAllotment: new Date('2025-03-16T18:30:00.000Z'),
          minimumInvestment: 135000,
          faceValue: 10,
        },
      ];
      mockIpoRepo.findBy.mockReturnValue(ipos);

      const result = await controller.getToBeListedIpos(resMock);
      expect(result.json).toHaveBeenCalledWith(ipos);
    });
  });

  describe('get ipo cron', () => {
    it('should return empty bse chittorgarh list', async () => {
      const resMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      mockIpoRepo.create.mockReturnValue({});
      jest.spyOn(mockedBseService, 'getOpenIpo').mockResolvedValue([]);
      jest.spyOn(mockedChService, 'getCurrentIpos').mockResolvedValue([]);
      const result = await controller.getIpos(new Date(), resMock);
      expect(result.json).toHaveBeenCalledWith([]);
      expect(mockIpoRepo.save).toHaveBeenCalled();
    });

    it('should return data from bse chittorgarh list', async () => {
      const resMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;
      mockIpoRepo.create.mockReturnValue({});
      const bseResponse = [
        {
          symbol: 'PSPL',
          name: 'PDP SHIPPING & PROJECTS LTD',
          price: 135,
          lotPrice: 135000,
          lotSize: 1000,
          openDate: new Date('2025-03-09T18:30:00.000Z'),
          closeDate: new Date('2025-03-11T18:30:00.000Z'),
          minimumInvestment: 135000,
          faceValue: 10,
        },
      ];
      const chResponse = [
        {
          openDate: new Date(),
          closeDate: new Date(),
          tentative_allotment: new Date(),
          initiationOfRefunds: new Date(),
          creditOfSharesToDemat: new Date('2025-03-21T18:30:00.000Z'),
          tentativeListingDate: new Date('2025-03-21T18:30:00.000Z'),
          suggestion: 'avoid' as IpoSuggestion,
          review: 'Good IPO',
          gmp: 0,
          name: 'PDP SHIPPING & PROJECTS Limited',
          gmpUrl: 'https://www.google.com',
        },
      ];

      const expectResponse = [
        {
          symbol: 'PSPL',
          name: 'PDP SHIPPING & PROJECTS LTD',
          price: 135,
          lotPrice: 135000,
          lotSize: 1000,
          openDate: new Date('2025-03-09T18:30:00.000Z'),
          closeDate: new Date('2025-03-11T18:30:00.000Z'),
          minimumInvestment: 135000,
          faceValue: 10,
          suggestion: 'avoid' as IpoSuggestion,
          review: 'Good IPO',
          gmp: 0,
          listingDate: new Date('2025-03-21T18:30:00.000Z'),
          basisOfAllotment: new Date('2025-03-21T18:30:00.000Z'),
        },
      ];
      jest.spyOn(mockedBseService, 'getOpenIpo').mockResolvedValue(bseResponse);
      jest
        .spyOn(mockedChService, 'getCurrentIpos')
        .mockResolvedValue(chResponse);
      await controller.getIpos(new Date(), resMock);
      expect(resMock.json).toHaveBeenCalledWith(expectResponse);
      expect(mockIpoRepo.save).toHaveBeenCalled();
    });

    it('should return correct data if chittorgarh has multiple list', async () => {
      const resMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;
      mockIpoRepo.create.mockReturnValue({});
      const bseResponse = [
        {
          symbol: 'PSPL',
          name: 'PDP SHIPPING & PROJECTS LTD',
          price: 135,
          lotPrice: 135000,
          lotSize: 1000,
          openDate: new Date('2025-03-09T18:30:00.000Z'),
          closeDate: new Date('2025-03-11T18:30:00.000Z'),
          minimumInvestment: 135000,
          faceValue: 10,
        },
      ];
      const chResponse = [
        {
          openDate: new Date(),
          closeDate: new Date(),
          tentative_allotment: new Date(),
          initiationOfRefunds: new Date(),
          creditOfSharesToDemat: new Date('2025-03-21T18:30:00.000Z'),
          tentativeListingDate: new Date('2025-03-21T18:30:00.000Z'),
          suggestion: 'avoid' as IpoSuggestion,
          review: 'Good IPO',
          gmp: 0,
          name: 'PDP SHIPPING & PROJECTS Limited',
          gmpUrl: 'https://www.google.com',
        },
        {
          openDate: new Date(),
          closeDate: new Date(),
          tentative_allotment: new Date(),
          initiationOfRefunds: new Date(),
          creditOfSharesToDemat: new Date('2025-03-21T18:30:00.000Z'),
          tentativeListingDate: new Date('2025-03-21T18:30:00.000Z'),
          suggestion: 'apply' as IpoSuggestion,
          review: 'Better IPO',
          gmp: 10,
          name: 'Nirma Washing Powder',
          gmpUrl: 'https://www.google.com',
        },
        {
          openDate: new Date(),
          closeDate: new Date(),
          tentative_allotment: new Date(),
          initiationOfRefunds: new Date(),
          creditOfSharesToDemat: new Date('2025-03-21T18:30:00.000Z'),
          tentativeListingDate: new Date('2025-03-21T18:30:00.000Z'),
          suggestion: 'may apply' as IpoSuggestion,
          review: 'This is good as compared to previous one',
          gmp: 5,
          name: 'Adani Wilmar',
          gmpUrl: 'https://www.google.com',
        },
      ];

      const expectResponse = [
        {
          symbol: 'PSPL',
          name: 'PDP SHIPPING & PROJECTS LTD',
          price: 135,
          lotPrice: 135000,
          lotSize: 1000,
          openDate: new Date('2025-03-09T18:30:00.000Z'),
          closeDate: new Date('2025-03-11T18:30:00.000Z'),
          minimumInvestment: 135000,
          faceValue: 10,
          suggestion: 'avoid' as IpoSuggestion,
          review: 'Good IPO',
          gmp: 0,
          listingDate: new Date('2025-03-21T18:30:00.000Z'),
          basisOfAllotment: new Date('2025-03-21T18:30:00.000Z'),
        },
      ];
      jest.spyOn(mockedBseService, 'getOpenIpo').mockResolvedValue(bseResponse);
      jest
        .spyOn(mockedChService, 'getCurrentIpos')
        .mockResolvedValue(chResponse);
      await controller.getIpos(new Date(), resMock);
      expect(resMock.json).toHaveBeenCalledWith(expectResponse);
      expect(mockIpoRepo.save).toHaveBeenCalled();
    });

    it('should return correct data if chittorgarh has multiple list', async () => {
      const resMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;
      mockIpoRepo.create.mockReturnValue({});
      const bseResponse = [
        {
          symbol: 'PSPL',
          name: 'PDP SHIPPING & PROJECTS LTD',
          price: 135,
          lotPrice: 135000,
          lotSize: 1000,
          openDate: new Date('2025-03-09T18:30:00.000Z'),
          closeDate: new Date('2025-03-11T18:30:00.000Z'),
          minimumInvestment: 135000,
          faceValue: 10,
        },
        {
          symbol: 'ADANI',
          name: 'ADANI WILMER',
          price: 235,
          lotPrice: 235000,
          lotSize: 1000,
          openDate: new Date('2025-03-19T18:30:00.000Z'),
          closeDate: new Date('2025-03-21T18:30:00.000Z'),
          minimumInvestment: 235000,
          faceValue: 10,
        },
        {
          symbol: 'TATA',
          name: 'TATA and Sons',
          price: 65,
          lotPrice: 65000,
          lotSize: 1000,
          openDate: new Date('2025-03-12T18:30:00.000Z'),
          closeDate: new Date('2025-03-15T18:30:00.000Z'),
          minimumInvestment: 65000,
          faceValue: 10,
        },
      ];
      const chResponse = [
        {
          openDate: new Date(),
          closeDate: new Date(),
          tentative_allotment: new Date(),
          initiationOfRefunds: new Date(),
          creditOfSharesToDemat: new Date('2025-03-21T18:30:00.000Z'),
          tentativeListingDate: new Date('2025-03-21T18:30:00.000Z'),
          suggestion: 'avoid' as IpoSuggestion,
          review: 'Good IPO',
          gmp: 0,
          name: 'PDP SHIPPING & PROJECTS Limited',
          gmpUrl: 'https://www.google.com',
        },
      ];

      const expectResponse = [
        {
          symbol: 'PSPL',
          name: 'PDP SHIPPING & PROJECTS LTD',
          price: 135,
          lotPrice: 135000,
          lotSize: 1000,
          openDate: new Date('2025-03-09T18:30:00.000Z'),
          closeDate: new Date('2025-03-11T18:30:00.000Z'),
          minimumInvestment: 135000,
          faceValue: 10,
          suggestion: 'avoid' as IpoSuggestion,
          review: 'Good IPO',
          gmp: 0,
          listingDate: new Date('2025-03-21T18:30:00.000Z'),
          basisOfAllotment: new Date('2025-03-21T18:30:00.000Z'),
        },
        {
          symbol: 'ADANI',
          name: 'ADANI WILMER',
          price: 235,
          lotPrice: 235000,
          lotSize: 1000,
          openDate: new Date('2025-03-19T18:30:00.000Z'),
          closeDate: new Date('2025-03-21T18:30:00.000Z'),
          minimumInvestment: 235000,
          faceValue: 10,
        },
        {
          symbol: 'TATA',
          name: 'TATA and Sons',
          price: 65,
          lotPrice: 65000,
          lotSize: 1000,
          openDate: new Date('2025-03-12T18:30:00.000Z'),
          closeDate: new Date('2025-03-15T18:30:00.000Z'),
          minimumInvestment: 65000,
          faceValue: 10,
        },
      ];
      jest.spyOn(mockedBseService, 'getOpenIpo').mockResolvedValue(bseResponse);
      jest
        .spyOn(mockedChService, 'getCurrentIpos')
        .mockResolvedValue(chResponse);
      await controller.getIpos(new Date(), resMock);
      expect(resMock.json).toHaveBeenCalledWith(expectResponse);
      expect(mockIpoRepo.save).toHaveBeenCalled();
    });
  });
});
