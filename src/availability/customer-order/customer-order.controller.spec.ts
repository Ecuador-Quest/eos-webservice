import { Test, TestingModule } from '@nestjs/testing';
import { CustomerOrderController } from './customer-order.controller';

describe('CustomerOrder Controller', () => {
  let controller: CustomerOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerOrderController],
    }).compile();

    controller = module.get<CustomerOrderController>(CustomerOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
