import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {DocumentStatus} from '../../../shared/configuration/documentStatus.enum';
import {ItineraryDayVm} from './itinerary-day-vm.model';

export class ItineraryDayParams  implements ItineraryDayVm {
    @ApiModelProperty({  example: '4' })
    operationDays: number;

    @ApiModelPropertyOptional({  example: '1' })
    company: string;

    @ApiModelProperty({ enum: DocumentStatus, example: DocumentStatus.ENABLED })
    documentStatus: DocumentStatus;

    @ApiModelProperty()
    idProduct: string;

    @ApiModelProperty({  example: true })
    isVisible: boolean;

    @ApiModelProperty({  example: '4 Days' })
    label: string;
}
