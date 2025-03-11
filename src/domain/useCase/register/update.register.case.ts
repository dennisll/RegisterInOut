import {RegisterEntity, UpdateRegisterDto } from "../..";
import { RegisterRepository } from "../../repositories/register.repository";


export class UpdateRegisterDataCase{

    private readonly registerRepository: RegisterRepository;

    constructor( registerRepository: RegisterRepository
    ){
        this.registerRepository = registerRepository;
    }

    updateRegisterData(id: string, updateRegisterDto: UpdateRegisterDto ): Promise<string>{
        return this.registerRepository.updateRegisterData(id, updateRegisterDto);
    }
}