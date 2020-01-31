import {ItineraryDay} from './models/itinerary-day.model';
import {ItineraryDayVm} from './models/itinerary-day-vm.model';
import {HttpService, Injectable, InternalServerErrorException} from '@nestjs/common';
import {BaseService} from '../../shared/base.service';
import {InjectModel} from '@nestjs/mongoose';
import {MapperService} from '../../shared/mapper/mapper.service';
import {ModelType} from 'typegoose';

@Injectable()
export class ItineraryDaysService extends BaseService<ItineraryDay> {
    constructor(
        private readonly httpService: HttpService,
        @InjectModel(ItineraryDay.modelName) private readonly _itineraryDaysModel: ModelType<ItineraryDay>,
        private readonly _mapperService: MapperService,
    ) {
        super();
        this._model = _itineraryDaysModel;
        this._mapper = _mapperService.mapper;
    }

    async createItineraryDays(params: ItineraryDayVm): Promise<ItineraryDay> {
        const newItineraryDays = ItineraryDay.createModel();
        newItineraryDays.operationDays = params.operationDays;
        newItineraryDays.isVisible = params.isVisible;
        newItineraryDays.documentStatus = params.documentStatus;
        newItineraryDays.idProduct = params.idProduct;
        newItineraryDays.label = params.label;
        newItineraryDays.company = params.company;
        console.log('----------');
        console.log(newItineraryDays);
        try {
            const result = await this.create(newItineraryDays);
            return result.toJSON() as ItineraryDay;
        } catch (e) {
            throw new InternalServerErrorException(e);
        }
    }
}

