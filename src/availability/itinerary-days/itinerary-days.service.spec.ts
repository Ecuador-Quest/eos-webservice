import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryDaysService } from './itinerary-days.service';

describe('ItineraryDaysService', () => {
  let service: ItineraryDaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItineraryDaysService],
    }).compile();

    service = module.get<ItineraryDaysService>(ItineraryDaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
