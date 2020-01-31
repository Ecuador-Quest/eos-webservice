import { Test, TestingModule } from '@nestjs/testing';
import { HoldSpacesPaxController } from './hold-spaces-pax.controller';

describe('HoldSpacesPax Controller', () => {
  let controller: HoldSpacesPaxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoldSpacesPaxController],
    }).compile();

    controller = module.get<HoldSpacesPaxController>(HoldSpacesPaxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
