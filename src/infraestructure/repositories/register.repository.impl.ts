import { RegisterDatasource, RegisterDto, RegisterEntity, RegisterRepository, UpdateRegisterDto } from "../../domain";



export class RegisterRepositoryImpl implements RegisterRepository{
    constructor(
        private readonly registerDatasource: RegisterDatasource
    ){}

    registerData(id: string, registerDto: RegisterDto): Promise<RegisterEntity> {
        return this.registerDatasource.registerData(id, registerDto);
    }

    getOneRegisterData(id: string): Promise<RegisterEntity> {
        return this.registerDatasource.getOneRegisterData(id);
    }

    getAllRegisterData(): Promise<RegisterEntity[]> {
        return this.registerDatasource.getAllRegisterData();
    }

    updateRegisterData(id: string, updateRegisterDto: UpdateRegisterDto): Promise<string> {
        return this.registerDatasource.updateRegisterData(id, updateRegisterDto);
    }

    deleteRegisterData(id: string): Promise<boolean> {
        return this.registerDatasource.deleteRegisterData(id);
    }
}