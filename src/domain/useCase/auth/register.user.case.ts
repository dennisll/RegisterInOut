import { AuthRepository, RegisterUserDto, UserEntity } from "../..";



export class RegisterUserCase {

    private readonly authRepository: AuthRepository

    constructor(authRepository: AuthRepository){
        this.authRepository = authRepository;
    } 

    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authRepository.register(registerUserDto)
    }
    
}