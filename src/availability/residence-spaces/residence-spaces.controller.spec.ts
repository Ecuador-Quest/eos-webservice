import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceSpacesController } from './residence-spaces.controller';

describe('ResidenceSpaces Controller', () => {
  let controller: ResidenceSpacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceSpacesController],
    }).compile();

    controller = module.get<ResidenceSpacesController>(ResidenceSpacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
