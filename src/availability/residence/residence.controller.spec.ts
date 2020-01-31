import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceController } from './residence.controller';

describe('Residence Controller', () => {
  let controller: ResidenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceController],
    }).compile();

    controller = module.get<ResidenceController>(ResidenceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
