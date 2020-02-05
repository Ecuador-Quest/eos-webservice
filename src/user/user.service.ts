import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { ModelType } from 'typegoose';
import { AuthService } from '../shared/auth/auth.service';
import { JwtPayload } from '../shared/auth/jwt-payload.model';
import { BaseService } from '../shared/base.service';
import { MapperService } from '../shared/mapper/mapper.service';
import { User } from './models/user.model';
import { LoginResponseVm } from './models/view-models/login-response-vm.model';
import { LoginVm } from './models/view-models/login-vm.model';
import { RegisterVm } from './models/view-models/register-vm.model';
import { UserVm } from './models/view-models/user-vm.model';
import {map, switchMap} from 'rxjs/operators';
import {forkJoin, from, Observable, of} from 'rxjs';

@Injectable()
export class UserService extends BaseService<User> {
    constructor(
        @InjectModel(User.modelName) private readonly _userModel: ModelType<User>,
        private readonly _mapperService: MapperService,
        @Inject(forwardRef(() => AuthService))
        readonly _authService: AuthService,
    ) {
        super();
        this._model = _userModel;
        this._mapper = _mapperService.mapper;
    }

    async register(vm: RegisterVm) {
        const { username, password, firstName, lastName } = vm;

        const newUser = User.createModel();
        newUser.username = username.trim().toLowerCase();
        newUser.firstName = firstName;
        newUser.lastName = lastName;

        const salt = await genSalt(10);
        newUser.password = await hash(password, salt);

        try {
            const result = await this.create(newUser);
            return result.toJSON() as User;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    login(vm: LoginVm): Observable<any> {
        const { username, password } = vm;
        return this.find_One<User>({username}).pipe(
            map( (data: User) => {
                if (!data) { throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND); }
                return data;
            }),
            switchMap(  (user: User) => {
                    // tslint:disable-next-line:no-shadowed-variable
                    const payload: JwtPayload = {
                        username: user.username,
                        role: user.role,
                    };
                    return  forkJoin([
                               of(user),
                               from(compare(password, user.password)),
                               from(this._authService.signPayload(payload)), // token
                               from(this.map(user, User, UserVm)),
                           ]);
            },
            ),
            map( (data: [User, boolean, string, UserVm ]) => {
                if (!data[1]) {
                    throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
                }
                const token = data[2] ;
                const userVm: UserVm = data[3];
                const loginResponse: LoginResponseVm = {
                    token,
                    user: userVm,
                };
                return loginResponse;
            }),
        );

    }

}
