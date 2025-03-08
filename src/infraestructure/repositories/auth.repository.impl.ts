import { AuthDatasource, AuthRepository, RegisterUserDto, UserEntity } from "../../domain";



export class AuthRepositoryImpl implements AuthRepository{

    constructor(
        private readonly authDatasource: AuthDatasource
    ){}

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        return this.authDatasource.register(registerUserDto);
    }

    generateTokenAuth(user: UserEntity): Promise<string> {

        return this.authDatasource.generateTokenAuth(user);
    }

    verifyByEmailAndPassword(email: string, password: string): Promise<UserEntity>{
        return this.authDatasource.verifyByEmailAndPassword(email, password);
    }

}