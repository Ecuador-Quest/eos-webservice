import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import { SchemaOptions} from 'mongoose';
import {Typegoose, prop} from 'typegoose';
import { Expose } from 'class-transformer';

export class BaseModelVm {
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    @Expose()
    createdAt?: number;

    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    @Expose()
    updatedAt?: number;

    @ApiModelPropertyOptional()
    @Expose()
    id?: string;

}

// tslint:disable-next-line:max-classes-per-file
export abstract class BaseModel<T> extends Typegoose {
    @prop({default:  new Date().getTime()})
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    @Expose()
    createdAt: number;

    @prop({default:  new Date().getTime()})
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    @Expose()
    updatedAt: number;

    @ApiModelPropertyOptional()
    @Expose()
    id: string;
    static get modelName(): string {
        return this.name;
    }

}

export const schemaOptions: SchemaOptions = {
    timestamps: true,
    toJSON: {
        virtuals: true,
        getters: true,
    },
};
