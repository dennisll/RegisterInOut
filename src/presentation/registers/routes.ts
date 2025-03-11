import { Router } from "express";
import { DeleteRegisterDataCase, GetAllRegisterCase, GetManyRegisterCase, GetOneRegisterCase, RegisterDataCase, RegisterDatasource, UpdateRegisterDataCase } from "../../domain";
import { RegisterDatasourceImpl } from "../../infraestructure/datasources/register.datasource.impl";
import { RegisterRepositoryImpl } from "../../infraestructure/repositories/register.repository.impl";
import { RegisterController } from "./controller";



export class RegisterRoutes {


    
    static get routes(): Router {

        const router = Router();

        const registerDatasource = new RegisterDatasourceImpl();
        const registerRepository = new RegisterRepositoryImpl(registerDatasource);
        const getAllRegisterCase = new GetAllRegisterCase(registerRepository);
        const getManyRegisterCase = new GetManyRegisterCase(registerRepository);
        const getOneRegisterCase = new GetOneRegisterCase(registerRepository);
        const registerDataCase = new RegisterDataCase(registerRepository);
        const updateRegisterDataCase = new UpdateRegisterDataCase(registerRepository);
        const deleteRegisterDataCase = new DeleteRegisterDataCase(registerRepository);

        const controller = new RegisterController(
            getAllRegisterCase,
            getManyRegisterCase,
            getOneRegisterCase,
            registerDataCase,
            updateRegisterDataCase,
            deleteRegisterDataCase
        );

        router.get('/', controller.getAllRegisters);
        router.get('/:id', controller.getOneRegister) ;
        router.get('/:year/:month/:day', controller.getManyRegisters);
        router.post('/', controller.registerData);
        router.patch('/:id', controller.updateRegisterData);
        router.delete('/:id', controller.deleteRegisterData);
        return router;
    }
}