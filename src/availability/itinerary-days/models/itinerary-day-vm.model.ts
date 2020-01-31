import {BaseModelVm} from '../../../shared/base.model';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {DocumentStatus} from '../../../shared/configuration/documentStatus.enum';
import { Expose } from 'class-transformer';


export class ItineraryDayVm extends BaseModelVm {
    @ApiModelPropertyOptional({ default: '1' })
    @Expose()
    company: string;

    @ApiModelProperty({ default: '4 Days' })
    @Expose()
    label: string;

    @ApiModelProperty({ enum: DocumentStatus, example: DocumentStatus.ENABLED })
    @Expose()
    documentStatus?: DocumentStatus;

    @ApiModelProperty({ default: '1 Days' })
    @Expose()
    operationDays: number;

    @ApiModelProperty({ default: true })
    @Expose()
    isVisible: boolean;

    @ApiModelProperty()
    @Expose()
    idProduct: string;
}
