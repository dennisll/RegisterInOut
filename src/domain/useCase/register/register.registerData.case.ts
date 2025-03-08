import { RegisterDto, RegisterEntity } from "../..";
import { RegisterRepository } from "../../repositories/register.repository";


export class RegisterDataCase{

    private readonly registerRepository: RegisterRepository;

    constructor( registerRepository: RegisterRepository
    ){
        this.registerRepository = registerRepository;
    }

    registerData(registerDto: RegisterDto ): Promise<RegisterEntity>{
        return this.registerRepository.registerData(registerDto);
    }
}