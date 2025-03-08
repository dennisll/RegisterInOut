import { AuthRepository, RegisterUserDto, UserEntity } from "../..";



export class VerifyByEmailAndPasswordCase {

    private readonly authRepository: AuthRepository

    constructor(authRepository: AuthRepository){
        this.authRepository = authRepository;
    } 

    verifyByEmailAndPassword(email: string, password: string): Promise<UserEntity> {
        return this.authRepository.verifyByEmailAndPassword(email, password)
    }
    
}