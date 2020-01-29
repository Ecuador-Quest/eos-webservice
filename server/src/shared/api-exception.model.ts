import { ApiModelPropertyOptional } from '@nestjs/swagger';
import {HttpStatus} from '@nestjs/common';

export class ApiException {
    @ApiModelPropertyOptional() statusCode?: number;
    @ApiModelPropertyOptional() message?: string;
    @ApiModelPropertyOptional() status?: string;
    @ApiModelPropertyOptional() error?: string;
    @ApiModelPropertyOptional() errors?: any;
    @ApiModelPropertyOptional() timestamp?: number;
    @ApiModelPropertyOptional() path?: string;
    @ApiModelPropertyOptional()  stack?: string;
    constructor(
        message: string,
        error: string,
        stack: string,
        errors: any,
        path: string,
        statusCode: number,
    ) {
        this.message = message;
        this.error = error;
        this.stack = stack;
        this.errors = errors;
        this.path = path;
        this.timestamp = new Date().getTime();
        this.statusCode = statusCode;
        this.status = HttpStatus[statusCode];
    }
}
