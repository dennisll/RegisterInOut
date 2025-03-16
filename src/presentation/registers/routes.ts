import { Router } from "express";
import { DeleteRegisterDataCase, GetAllRegisterCase, GetOneRegisterCase, RegisterDataCase, RegisterDatasource, UpdateRegisterDataCase } from "../../domain";
import { RegisterDatasourceImpl } from "../../infraestructure/datasources/register.datasource.impl";
import { RegisterRepositoryImpl } from "../../infraestructure/repositories/register.repository.impl";
import { RegisterController } from "./controller";
import { passportJwtMiddleware } from "../middlewares/passport.jwt.middleware";



export class RegisterRoutes {


    
    static get routes(): Router {

        const router = Router();

        const registerDatasource = new RegisterDatasourceImpl();
        const registerRepository = new RegisterRepositoryImpl(registerDatasource);
        const getAllRegisterCase = new GetAllRegisterCase(registerRepository);
        const getOneRegisterCase = new GetOneRegisterCase(registerRepository);
        const registerDataCase = new RegisterDataCase(registerRepository);
        const updateRegisterDataCase = new UpdateRegisterDataCase(registerRepository);
        const deleteRegisterDataCase = new DeleteRegisterDataCase(registerRepository);

        const controller = new RegisterController(
            getAllRegisterCase,
            getOneRegisterCase,
            registerDataCase,
            updateRegisterDataCase,
            deleteRegisterDataCase
        );

        router.get('/', passportJwtMiddleware, controller.getAllRegisters);
        router.get('/:id', passportJwtMiddleware, controller.getOneRegister) ;
        router.post('/', passportJwtMiddleware, controller.registerData);
        router.patch('/:id', passportJwtMiddleware, controller.updateRegisterData);
        router.delete('/:id', passportJwtMiddleware, controller.deleteRegisterData);
        return router;
    }
}