import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {ProductService} from './product.service';
import {Product} from './product.model';
import {ProductVm} from '../view-models/product-vm.model';
import {GetOperationId} from '../../shared/utilities/get-operation-id.helper';

@Controller('product')
@ApiUseTags(Product.modelName)
// @ApiBearerAuth()
export class ProductController {
    constructor(private readonly _catalogueService: ProductService) {
    }
    @Post()
    // @Roles(UserRole.Admin)
    // @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiCreatedResponse({ type: ProductVm })
    // @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId(Product.modelName, 'Create'))
    async create(@Body() params: ProductVm): Promise<ProductVm> {
        try {
            const newCatalogue = await this._catalogueService.crateCatalogue(params);
            return this._catalogueService.map(newCatalogue, Product, ProductVm);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
