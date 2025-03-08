import { AuthRepository, LoginUserDto, UserEntity } from "../..";



export class GenerateTokenAuthCase {

    private readonly authRepository: AuthRepository

    constructor(authRepository: AuthRepository){
        this.authRepository = authRepository;
    } 

    generateTokenAuthCase(user: UserEntity): Promise<string> {
        return this.authRepository.generateTokenAuth(user)
    }
    
}