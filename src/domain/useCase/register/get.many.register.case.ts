import { RegisterEntity } from "../..";
import { RegisterRepository } from "../../repositories/register.repository";


export class GetManyRegisterCase{

    private readonly registerRepository: RegisterRepository;

    constructor( registerRepository: RegisterRepository
    ){
        this.registerRepository = registerRepository;
    }

    getManyRegisterData(data: Date): Promise<RegisterEntity []>{
        return this.registerRepository.getManyRegisterData(data);
    }
}