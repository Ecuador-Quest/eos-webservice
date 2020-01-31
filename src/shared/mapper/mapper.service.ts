import { Injectable } from '@nestjs/common';
import {AutoMapper, Mapper, Configuration} from 'automapper-nartc';
import { User } from '../../user/models/user.model';
import { UserVm } from '../../user/models/view-models/user-vm.model';
import { Todo } from '../../todo/models/todo.model';
import { TodoVm } from '../../todo/models/view-models/todo-vm.model';
import {Catalogue} from '../catalogue/models/catalogue.model';
import {CatalogueVm} from '../catalogue/models/view-models/catalogue-vm.model';
import {Product} from '../../availability/product/models/product.model';
import {ProductVm} from '../../availability/product/models/product-vm.model';

@Injectable()
export class MapperService {

    constructor() {
        this.mapper = Mapper;
        this.initializeMapper();
    }
    mapper: AutoMapper;

    private static configure(config: Configuration): void {
        config.createMap(User, UserVm)
            .forMember('fullName', opts => opts.mapFrom(s => s.fullName));
        config.createMap(Todo, TodoVm);
        config.createMap(Catalogue, CatalogueVm);
        config.createMap(Product, ProductVm);
    }

    private initializeMapper(): void {
        this.mapper.initialize(MapperService.configure);
    }
}
