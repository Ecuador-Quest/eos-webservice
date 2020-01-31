import { Module } from '@nestjs/common';
import { RateController } from './rate/rate.controller';

@Module({
  controllers: [RateController]
})
export class InvoiceModule {}
