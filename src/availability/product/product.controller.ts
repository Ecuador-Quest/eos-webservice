import {Body, Controller, HttpException, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {ProductService} from './product.service';
import {Product} from './models/product.model';
import {ProductVm} from './models/product-vm.model';
import {GetOperationId} from '../../shared/utilities/get-operation-id.helper';
import {ProductParams} from './models/product-params.model';
import {Roles} from '../../shared/decorators/roles.decorator';
import {UserRole} from '../../user/models/user-role.enum';
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from '../../shared/guards/roles.guard';
import {ApiException} from '../../shared/api-exception.model';

@Controller('product')
@ApiUseTags(Product.modelName)
@ApiBearerAuth()
export class ProductController {
    constructor(private readonly _productService: ProductService) {    }

    @Post()
    @Roles(UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @ApiCreatedResponse({ type: ProductVm })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId(Product.modelName, 'Create'))
    async create(@Body() params: ProductParams): Promise<ProductVm> {
        try {
            const newCatalogue = await this._productService.createProduct(params);
            return this._productService.map(newCatalogue, Product, ProductVm);
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
