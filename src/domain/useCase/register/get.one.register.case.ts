import { RegisterEntity } from "../..";
import { RegisterRepository } from "../../repositories/register.repository";


export class GetOneRegisterCase{

    private readonly registerRepository: RegisterRepository;

    constructor( registerRepository: RegisterRepository
    ){
        this.registerRepository = registerRepository;
    }

    getOneRegisterData(id: string): Promise<RegisterEntity>{
        return this.registerRepository.getOneRegisterData(id);
    }
}