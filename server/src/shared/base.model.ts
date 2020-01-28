import { ApiModelPropertyOptional } from '@nestjs/swagger';
import {Schema, SchemaOptions} from 'mongoose';
import {Typegoose, prop, InstanceType} from 'typegoose';
import { Expose } from 'class-transformer';
import {buildSchema} from '@typegoose/typegoose';

export class BaseModelVm {
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    @Expose()
    createdAt?: Date;

    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    @Expose()
    updatedAt?: Date;

    @ApiModelPropertyOptional() 
    @Expose()
    id?: string;
}

export abstract class BaseModel<T> extends Typegoose {
    @prop()
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    @Expose()
    createdAt: Date;

    @prop()
    @ApiModelPropertyOptional({ type: String, format: 'date-time' })
    @Expose()
    updatedAt: Date;

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
