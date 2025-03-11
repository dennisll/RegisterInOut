import { UpdateRegisterDto } from "..";
import { RegisterDto } from "../dtos/register/register.dto";
import { RegisterEntity } from "../entities/register.entity";



export abstract class RegisterDatasource{

    abstract registerData(registerDto: RegisterDto ): Promise<RegisterEntity>;
    abstract getOneRegisterData(id: string): Promise<RegisterEntity>;
    abstract getManyRegisterData(data: Date): Promise<RegisterEntity []>;
    abstract getAllRegisterData(): Promise<RegisterEntity []>;
    abstract updateRegisterData(id: string, updateRegisterDto: UpdateRegisterDto ): Promise<string>;
    abstract deleteRegisterData(id: string): Promise<boolean>;
}