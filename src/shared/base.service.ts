import { Types } from 'mongoose';
import { InstanceType, ModelType, Typegoose } from 'typegoose';
import { AutoMapper, Constructable } from 'automapper-nartc';
import {MongoError} from 'mongodb';
import {InternalServerErrorException} from '@nestjs/common';
import {Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

export abstract class BaseService<T extends Typegoose> {
    protected _model: ModelType< T>;
    protected _mapper: AutoMapper;

    private get modelName(): string {
        return this._model.modelName;
    }
    protected static throwMongoError(err: MongoError): void {
        throw new InternalServerErrorException(err, err.errmsg);
    }
    private get viewModelName(): string {
        return `${this._model.modelName}Vm`;
    }

    // tslint:disable-next-line:no-shadowed-variable
    async map<T, K>(
        object: Partial<InstanceType<T>>,
        source: Constructable<T>,
        destination: Constructable<K>,
    ): Promise<K> {
        return this._mapper.map<T, K>(object as T, source, destination);
    }

    // tslint:disable-next-line:no-shadowed-variable
    async mapArray<T, K>(
        object: Array<Partial<InstanceType<T>>>,
        source: Constructable<T>,
        destination: Constructable<K>,
    ): Promise<K[]> {
        return this._mapper.mapArray<T, K>(object as T[], source, destination);
    }

    async findAll(filter = {}): Promise<InstanceType<T>[]> {
        return this._model.find(filter).exec();
    }

    // tslint:disable-next-line:no-shadowed-variable
    // public query<T>(filter = {} ): Observable<T[]>{
    //
    // }
    async findOne(filter = {}): Promise<InstanceType<T>> {
        try {
        return this._model.findOne(filter).exec();
        } catch (e) {
            BaseService.throwMongoError(e);
        }
    }

    // tslint:disable-next-line:no-shadowed-variable
    public find_One<T>(filter = {}): Observable<T> {
        return of(1).pipe(
            switchMap(  async () => {
                return this._model.findOne(filter).exec();
            } ),
            map( (output: any ) => {
                return output;
            }),
        );
    }
    async findById(id: string): Promise<InstanceType<T>> {
        try {
        return this._model.findById(this.toObjectId(id)).exec();
        } catch (e) {
            BaseService.throwMongoError(e);
        }
    }

    async create(item: InstanceType<T>): Promise<InstanceType<T>> {
        try {
        return this._model.create(item);
        } catch (e) {
            BaseService.throwMongoError(e);
        }
    }

    // tslint:disable-next-line:no-shadowed-variable
    public create_obser<T>( item: InstanceType<T> ): Observable<T> {
        return of(1).pipe(
            switchMap(  async () => {
                return this._model.create(item);
            } ),
            map( (output: any ) => {
                return output;
            }),
        );
    }

    async delete(id: string): Promise<InstanceType<T>> {
        try {
            return this._model.findByIdAndRemove(this.toObjectId(id)).exec();
        } catch (e) {
            BaseService.throwMongoError(e);
        }
    }

    async update(id: string, item: InstanceType<T>): Promise<InstanceType<T>> {
        try {
        return this._model.findByIdAndUpdate(this.toObjectId(id), item, { new: true }).exec();
        } catch (e) {
            BaseService.throwMongoError(e);
        }
    }

    async clearCollection(filter = {}): Promise<{ ok?: number; n?: number; }> {
        try {
        return this._model.deleteMany(filter).exec();
        } catch (e) {
            BaseService.throwMongoError(e);
        }
    }

    private toObjectId(id: string): Types.ObjectId {
        return Types.ObjectId(id);
    }
}
