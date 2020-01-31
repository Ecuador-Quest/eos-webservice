import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryDaysController } from './itinerary-days.controller';

describe('ItineraryDays Controller', () => {
  let controller: ItineraryDaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItineraryDaysController],
    }).compile();

    controller = module.get<ItineraryDaysController>(ItineraryDaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
