import { RegisterUserDto, UserEntity } from "..";


export abstract class AuthDatasource{

    abstract generateTokenAuth(user: UserEntity): Promise<string>;

    abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

    abstract verifyByEmailAndPassword(email: string, password: string): Promise<UserEntity>;

}
