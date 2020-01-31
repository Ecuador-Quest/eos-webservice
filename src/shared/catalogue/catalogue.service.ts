import {HttpService, Injectable, InternalServerErrorException} from '@nestjs/common';
import {BaseService} from '../base.service';
import {Catalogue} from './models/catalogue.model';
import {InjectModel} from '@nestjs/mongoose';
import {ModelType} from 'typegoose';
import {MapperService} from '../mapper/mapper.service';
import {CatalogueVm} from './models/view-models/catalogue-vm.model';

@Injectable()
export class CatalogueService extends BaseService<Catalogue> {
    constructor(
        private readonly httpService: HttpService,
        @InjectModel(Catalogue.modelName) private readonly _catalogueModel: ModelType<Catalogue>,
        private readonly _mapperService: MapperService,
    ) {
        super();
        this._model = _catalogueModel;
        this._mapper = _mapperService.mapper;
    }

    async crateCatalogue(params: CatalogueVm): Promise<Catalogue> {

        const newCatalogue = Catalogue.createModel();
        newCatalogue.label = params.label;
        newCatalogue.value = params.value;
        newCatalogue.description = params.description;
        newCatalogue.order = params.order;
        newCatalogue.company = params.company;
        newCatalogue.documentStatus = params.DocumentStatus;
        try {
            const result = await this.create(newCatalogue);
            return result.toJSON() as Catalogue;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}
