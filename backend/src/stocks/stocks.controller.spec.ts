import { Test, TestingModule } from '@nestjs/testing';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import { HttpModule } from '@nestjs/axios';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { Response } from 'express';

describe('StocksController', () => {
  let controller: StocksController;
  let service: StocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StocksController],
      providers: [StocksService],
      imports: [HttpModule],
    }).compile();

    controller = module.get<StocksController>(StocksController);
    service = module.get<StocksService>(StocksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('indian-indices', () => {
    it('should return available Options', async () => {
      const mockedResponse: AxiosResponse = {
        data: {
          data: {
            pricecurrent: '37820.45',
          },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} as AxiosRequestHeaders },
      };
      jest
        .spyOn(service, 'getIndianIndicesFeed')
        .mockResolvedValue(mockedResponse);

      // * metal rate api mock
      const mockedMetalApiResponse: AxiosResponse = {
        data: `<div class="rates">
        <i class="icon up_arrow_price s"></i>
        <ul style="height : auto !important;" class="rates-list">
        <li style="margin-right:10px;text-align:right;"><span style="float:right; cursor: pointer;" class="rate-close"> X </span></li>
<!--             <li class="time-date"> -->
<!--                 <div class="date fl">06/10/21</div> -->
<!--                 <div class="fl time" id="time">3:39:42 PM</div> -->
<!--             </li> -->
            <li style="margin-left: " class="head"><span class="left"><b>Metal Type</b></span><span>Per Gram</span></li>
            <li style="margin-left: ; id=" border"=""><span class="left">Gold 18k</span><span><span class="price">₹6578</span></span></li>
            <li style="margin-left: ;"><span class="left">Gold 22k</span><span><span class="price">₹8040</span></span></li>
            <li style="margin-left: ;"><span class="left">Gold 24k</span><span><span class="price">₹8771</span></span></li>
            <li style="margin-left: ;"><span class="left">Silver </span><span><span class="price">₹108.00</span></span></li>
            <li style="margin-left: ;"><span class="left">Platinum</span><span><span class="price">₹3402</span></span></li>
            <li class="rate" id="rates-time" style="padding: 10px 0px 35px 0px;text-align: center;"><span style="float: none;" class="updated-time">Last updated on : 08/03/25 10:15 AM</span></li>
           <li class="rate"><span><a class="view-bow-btn legitRipple" href="https://www.thangamayil.com/scheme/index/rateshistory/">View Now</a></span></li>
        </ul>
    </div>`,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} as AxiosRequestHeaders },
      };
      jest
        .spyOn(service, 'getGoldRateHTML')
        .mockResolvedValue(mockedMetalApiResponse);

      // * currency api mock
      const mockedApiResponse: AxiosResponse = {
        data: {
          success: 1,
          data: {
            data: [
              [
                1, 0.0115, 0.0106, 0.0089, 0.0166, 0.0183, 1.7023, 0.0153,
                0.3777, 0.0832,
              ],
              [86.87, 1, 0.92, 0.77, 1.44, 1.5873, 147.88, 1.33, 32.81, 7.23],
              [
                94.4239, 1.087, 1, 0.837, 1.5652, 1.7253, 160.7391, 1.4457,
                35.663, 7.8587,
              ],
            ],
          },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} as AxiosRequestHeaders },
      };
      jest
        .spyOn(service, 'getCurrencyRates')
        .mockResolvedValue(mockedApiResponse);

      const resMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const response = await controller.getOptions(resMock);
      expect(response.json).toHaveBeenCalledWith({
        'Gold (22K)': '1gm = ₹ 8,040',
        'Gold (24K)': '1gm = ₹ 8,771',
        Nifty: '₹ 37,820.45',
        Sensex: '₹ 37,820.45',
        Silver: '1g = ₹ 108.00',
        USDINR: '₹ 86.87',
      });
    });

    it('should reject the promise', async () => {
      const mockedError = new Error('Failure');
      jest
        .spyOn(service, 'getIndianIndicesFeed')
        .mockRejectedValue(mockedError);
      jest.spyOn(service, 'getGoldRateHTML').mockRejectedValue(mockedError);
      jest.spyOn(service, 'getCurrencyRates').mockRejectedValue(mockedError);

      const resMock = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as Response;

      await expect(controller.getOptions(resMock)).rejects.toThrow();
    });
  });
});
