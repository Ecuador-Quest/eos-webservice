import {HttpModule, Module} from '@nestjs/common';
import {CatalogueController} from './catalogue.controller';
import {CatalogueService} from './catalogue.service';
import {MongooseModule} from '@nestjs/mongoose';
import {Catalogue} from './models/catalogue.model';

@Module({
    imports: [MongooseModule.forFeature(
        [{
            name: Catalogue.modelName,
            schema: Catalogue.model.schema,
        }]), HttpModule],
    controllers: [CatalogueController],
    providers: [CatalogueService],
})
export class CatalogueModule {}
