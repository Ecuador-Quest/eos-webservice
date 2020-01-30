import { Module } from '@nestjs/common';
import { ItineraryOperationController } from './itinerary-operation/itinerary-operation.controller';
import { AvailabilityService } from './availability.service';
import { ItineraryController } from './itinerary/itinerary.controller';

@Module({
  controllers: [ItineraryOperationController, ItineraryController],
  providers: [AvailabilityService]
})
export class AvailabilityModule {}
