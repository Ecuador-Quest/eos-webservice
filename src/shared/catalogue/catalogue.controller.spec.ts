import { Test, TestingModule } from '@nestjs/testing';
import { CatalogueController } from './catalogue.controller';

describe('Catalogue Controller', () => {
  let controller: CatalogueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogueController],
    }).compile();

    controller = module.get<CatalogueController>(CatalogueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
