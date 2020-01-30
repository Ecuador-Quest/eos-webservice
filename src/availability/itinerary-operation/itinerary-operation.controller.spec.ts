import { Test, TestingModule } from '@nestjs/testing';
import { ItineraryOperationController } from './itinerary-operation.controller';

describe('ItineraryOperation Controller', () => {
  let controller: ItineraryOperationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItineraryOperationController],
    }).compile();

    controller = module.get<ItineraryOperationController>(ItineraryOperationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
