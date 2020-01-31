import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {DocumentStatus} from '../../../shared/configuration/documentStatus.enum';
import {ProductVm} from './product-vm.model';

export class ProductParams  implements ProductVm {
    @ApiModelProperty()
    name: string;

    @ApiModelPropertyOptional()
    description: string;

    @ApiModelPropertyOptional()
    company: string;

    @ApiModelPropertyOptional({ enum: DocumentStatus, example: DocumentStatus.ENABLED })
    DocumentStatus: DocumentStatus;
}
