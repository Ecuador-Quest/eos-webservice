import {InstanceType, ModelType, prop} from 'typegoose';
import { Expose } from 'class-transformer';
import {DocumentStatus} from '../../../shared/configuration/documentStatus.enum';
import {BaseModel, schemaOptions} from '../../../shared/base.model';

export class ItineraryDay extends BaseModel<ItineraryDay> {
    @prop({
        required: [true, 'Operation Days is required and number type'],
    })
    @Expose()
    operationDays: number;

    @prop()
    @Expose()
    company: string;

    @prop({
        required: [true, 'Label  is required'],
        minlength: [1, 'label Must be at least 6 characters'],
    })
    @Expose()
    label: string;

    @prop({ default: true })
    @Expose()
    isVisible: boolean;

    @prop({ enum: DocumentStatus, default: DocumentStatus.ENABLED })
    @Expose()
    documentStatus: DocumentStatus;

    @prop({
        required: [true, 'Id Product  is required'],
    })
    @Expose()
    idProduct: string;

    static get model(): ModelType<ItineraryDay> {
        return new ItineraryDay().getModelForClass(ItineraryDay, { schemaOptions });
    }

    static createModel(): InstanceType<ItineraryDay> {
        return new this.model();
    }
}
