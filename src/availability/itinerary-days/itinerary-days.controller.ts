import {Body, Controller, HttpException, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {GetOperationId} from '../../shared/utilities/get-operation-id.helper';
import {ItineraryDayVm} from './models/itinerary-day-vm.model';
import {ItineraryDay} from './models/itinerary-day.model';
import {ItineraryDayParams} from './models/itinerary-day-params.model';
import {ItineraryDaysService} from './itinerary-days.service';
import {ProductService} from '../product/product.service';
import {ApiException} from '../../shared/api-exception.model';
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from '../../shared/guards/roles.guard';
import {Roles} from '../../shared/decorators/roles.decorator';
import {UserRole} from '../../user/models/user-role.enum';

@Controller('itinerary-days')
@ApiUseTags(ItineraryDay.modelName)
@ApiBearerAuth()
export class ItineraryDaysController {
    constructor(private readonly _itinerariDaysService: ItineraryDaysService,
                private readonly  _productService: ProductService) {
    }
    @Post()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiCreatedResponse({ type: ItineraryDayVm })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId(ItineraryDay.modelName, 'Create'))
    async create(@Body() params: ItineraryDayParams): Promise<ItineraryDayVm> {
        try {
            const { idProduct } = params;
            if (!params.idProduct) {
                throw new HttpException('Id Producto is required', HttpStatus.BAD_REQUEST);
            }

            let exist;
            try {
                exist = await this._productService.findOne({ _id: idProduct });
                console.log(exist);
            } catch (e) {
                throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            if (!exist) {
                throw new HttpException(`Id Product ${idProduct} is invalid`, HttpStatus.BAD_REQUEST);
            }

            const newItineraryDays = await this._itinerariDaysService.createItineraryDays(params);
            return this._itinerariDaysService.map(newItineraryDays, ItineraryDay, ItineraryDayVm);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
