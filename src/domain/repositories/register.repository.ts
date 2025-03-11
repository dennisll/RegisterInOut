import { RegisterDto } from "../dtos/register/register.dto";
import { UpdateRegisterDto } from "../dtos/register/update.register.dto";
import { RegisterEntity } from "../entities/register.entity";



export abstract class RegisterRepository{

    abstract registerData(registerDto: RegisterDto ): Promise<RegisterEntity>;
    abstract getOneRegisterData(id: string): Promise<RegisterEntity>;
    abstract getManyRegisterData(data: Date): Promise<RegisterEntity []>;
    abstract getAllRegisterData(): Promise<RegisterEntity []>;
    abstract updateRegisterData(id: string, updateRegisterDto: UpdateRegisterDto ): Promise<string>;
    abstract deleteRegisterData(id: string): Promise<boolean>;
}