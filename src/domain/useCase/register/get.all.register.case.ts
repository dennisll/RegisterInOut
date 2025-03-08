import { RegisterEntity } from "../..";
import { RegisterRepository } from "../../repositories/register.repository";



export class GetAllRegisterCase{

    private readonly registerRepository: RegisterRepository 

    constructor( registerRepository: RegisterRepository
    ){
        this.registerRepository = registerRepository;
    }

    getAllRegisterData(): Promise<RegisterEntity []>{
        return this.registerRepository.getAllRegisterData();
    }
}