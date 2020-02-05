import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id.helper';
import { User } from './models/user.model';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { LoginVm } from './models/view-models/login-vm.model';
import { RegisterVm } from './models/view-models/register-vm.model';
import { UserVm } from './models/view-models/user-vm.model';
import { UserService } from './user.service';
import {forkJoin, from, iif, Observable, throwError} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

@Controller('user')
@ApiUseTags(User.modelName)
export class UserController {
    constructor(private readonly _userService: UserService) {}

    @Post('register')
    @ApiCreatedResponse({ type: UserVm })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Register'))
    public register(@Body() vm: RegisterVm): Observable<UserVm> {
        const { username, password } = vm;

        const fields = Object.keys(vm);
        fields.forEach(field => {
            if (!vm[field]) {
                throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
            }
        });
        return this._userService.find_One<User>({ username }).pipe(
            switchMap( (user: User) => {
                if ( user ) {  throw new HttpException(`${username} exists`, HttpStatus.BAD_REQUEST); }
                return this._userService.register(vm);
            } ),
        );
    }

    @Post('login')
    @ApiCreatedResponse({ type: LoginResponseVm })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Login'))
    public login(@Body() vm: LoginVm): Observable<LoginResponseVm> {
        const fields = Object.keys(vm);
        fields.forEach(field => {
            if (!vm[field]) {
                throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
            }
        });

        return this._userService.login(vm);
    }
}
