import { Module } from '@nestjs/common';
import { AgencyController } from './agency.controller';

@Module({
  controllers: [AgencyController]
})
export class AgencyModule {}
