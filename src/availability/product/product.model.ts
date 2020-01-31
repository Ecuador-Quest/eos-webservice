import {InstanceType, ModelType, prop} from 'typegoose';
import { Expose } from 'class-transformer';
import {BaseModel, schemaOptions} from '../../shared/base.model';
import {DocumentStatus} from '../../shared/configuration/documentStatus.enum';

export class Product extends BaseModel<Product> {
    @prop({
        required: [true, 'Name is required'],
        minlength: [1, 'Name must be at least 1 characters'],
        maxlength: [100, 'Name Must be at most 100 characters'],
    })
    @Expose()
    name: string;

    @prop({
        maxlength: [500, 'Description Must be at most 500 characters'],
    })
    @Expose()
    description: string;

    @prop()
    @Expose()
    company: string;


    static get model(): ModelType<Product> {
        return new Product().getModelForClass(Product, { schemaOptions });
    }

    static createModel(): InstanceType<Product> {
        return new this.model();
    }
}
