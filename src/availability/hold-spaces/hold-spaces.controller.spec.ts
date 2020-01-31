import { Test, TestingModule } from '@nestjs/testing';
import { HoldSpacesController } from './hold-spaces.controller';

describe('HoldSpaces Controller', () => {
  let controller: HoldSpacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoldSpacesController],
    }).compile();

    controller = module.get<HoldSpacesController>(HoldSpacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
