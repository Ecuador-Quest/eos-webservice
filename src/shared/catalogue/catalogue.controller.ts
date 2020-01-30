import {Body, Controller, HttpException, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {CatalogueService} from './catalogue.service';
import {ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {ApiException} from '../api-exception.model';
import {GetOperationId} from '../utilities/get-operation-id.helper';
import {CatalogueVm} from './models/view-models/catalogue-vm.model';
import {UserRole} from '../../user/models/user-role.enum';
import {Roles} from '../decorators/roles.decorator';
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from '../guards/roles.guard';
import {Catalogue} from './models/catalogue.model';

@Controller('catalogue')
@ApiUseTags(Catalogue.modelName)
// @ApiBearerAuth()
export class CatalogueController {
    constructor(private readonly _catalogueService: CatalogueService) {
    }
    @Post()
    // @Roles(UserRole.Admin)
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiCreatedResponse({ type: CatalogueVm })
    // @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId(Catalogue.modelName, 'Create'))
    async create(@Body() params: CatalogueVm): Promise<CatalogueVm> {
        try {
            const newCatalogue = await this._catalogueService.crateCatalogue(params);
            return this._catalogueService.map(newCatalogue, Catalogue, CatalogueVm);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
