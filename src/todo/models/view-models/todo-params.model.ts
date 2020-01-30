import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { TodoLevel } from '../todo-level.enum';
import {DocumentStatus} from '../../../shared/configuration/documentStatus.enum';

export class TodoParams {
    @ApiModelProperty()
    content: string;
    @ApiModelPropertyOptional({ enum: TodoLevel, example: TodoLevel.Normal })
    level?: TodoLevel;
    @ApiModelPropertyOptional({ enum: DocumentStatus, example: DocumentStatus.ENABLED })
    DocumentStatus?: DocumentStatus;
}
