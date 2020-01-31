import {HttpService, Injectable, InternalServerErrorException} from '@nestjs/common';
import {BaseService} from '../../shared/base.service';
import {Product} from './product.model';
import {InjectModel} from '@nestjs/mongoose';
import {MapperService} from '../../shared/mapper/mapper.service';
import {ModelType} from 'typegoose';
import {ProductVm} from '../view-models/product-vm.model';

@Injectable()
export class ProductService extends BaseService<Product> {
    constructor(
        private readonly httpService: HttpService,
        @InjectModel(Product.modelName) private readonly _productModel: ModelType<Product>,
        private readonly _mapperService: MapperService,
    ) {
        super();
        this._model = _productModel;
        this._mapper = _mapperService.mapper;
    }

    async crateCatalogue(params: ProductVm): Promise<Product> {

        const newCatalogue = Product.createModel();
        newCatalogue.name = params.name;
        newCatalogue.description = params.description;
        newCatalogue.company = params.company;
        try {
            const result = await this.create(newCatalogue);
            return result.toJSON() as Product;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}
