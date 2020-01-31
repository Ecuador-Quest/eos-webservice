import {BaseModelVm} from '../../shared/base.model';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {DocumentStatus} from '../../shared/configuration/documentStatus.enum';
import { Expose } from 'class-transformer';

export class ProductVm extends BaseModelVm {
    @ApiModelProperty()
    @Expose()
    name: string;

    @ApiModelPropertyOptional()
    @Expose()
    description: string;

    @ApiModelPropertyOptional()
    @Expose()
    company: string;

    @ApiModelProperty({ enum: DocumentStatus, example: DocumentStatus.ENABLED })
    @Expose()
    DocumentStatus?: DocumentStatus;
}
