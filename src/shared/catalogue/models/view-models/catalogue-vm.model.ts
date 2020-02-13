import {BaseModelVm} from '../../../base.model';
import { Expose } from 'class-transformer';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {DocumentStatus} from '../../../configuration/documentStatus.enum';

export class CatalogueVm extends BaseModelVm {
    @ApiModelProperty()
    @Expose()
    label: string;

    @ApiModelProperty()
    @Expose()
    value: string;

    @ApiModelPropertyOptional()
    @Expose()
    description: string;

    @ApiModelPropertyOptional()
    @Expose()
    order: number;

    @ApiModelPropertyOptional()
    @Expose()
    company: string;

    @ApiModelProperty()
    @Expose()
    documentStatus?: DocumentStatus;
}
