import {HttpModule, Module} from '@nestjs/common';
import { ItineraryOperationController } from './itinerary-operation/itinerary-operation.controller';
import { AvailabilityService } from './availability.service';
import { ItineraryDaysController } from './itinerary-days/itinerary-days.controller';
import { ProductController } from './product/product.controller';
import { ResidenceController } from './residence/residence.controller';
import { ResidenceSpacesController } from './residence-spaces/residence-spaces.controller';
import { HoldSpacesController } from './hold-spaces/hold-spaces.controller';
import { HoldSpacesPaxController } from './hold-spaces-pax/hold-spaces-pax.controller';
import { CustomerOrderController } from './customer-order/customer-order.controller';
import { ProductService } from './product/product.service';
import {MongooseModule} from '@nestjs/mongoose';
import {Product} from './product/models/product.model';

@Module({
  imports: [MongooseModule.forFeature(
      [
          { name: Product.modelName, schema: Product.model.schema},
      ]), HttpModule],
  controllers: [
      ItineraryOperationController,
    ItineraryDaysController,
    ProductController,
    ResidenceController,
    ResidenceSpacesController,
    HoldSpacesController,
    HoldSpacesPaxController,
    CustomerOrderController],
  providers: [AvailabilityService, ProductService],
})
export class AvailabilityModule {}
