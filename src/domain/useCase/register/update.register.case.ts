import {RegisterEntity, UpdateRegisterDto } from "../..";
import { RegisterRepository } from "../../repositories/register.repository";


export class RegisterDataCase{

    private readonly registerRepository: RegisterRepository;

    constructor( registerRepository: RegisterRepository
    ){
        this.registerRepository = registerRepository;
    }

    updateRegisterData(updateRegisterDto: UpdateRegisterDto ): Promise<string>{
        return this.registerRepository.updateRegisterData(updateRegisterDto);
    }
}