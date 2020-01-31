import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import {DocumentStatus} from '../../../configuration/documentStatus.enum';
import {CatalogueVm} from './catalogue-vm.model';

export class CatalogueParams  implements CatalogueVm {
    @ApiModelProperty()
    label: string;

    @ApiModelProperty()
    value: string;

    @ApiModelPropertyOptional()
    description: string;

    @ApiModelPropertyOptional()
    order: number;

    @ApiModelPropertyOptional()
    company: string;

    @ApiModelPropertyOptional({ enum: DocumentStatus, example: DocumentStatus.ENABLED })
    documentStatus?: DocumentStatus;
}
