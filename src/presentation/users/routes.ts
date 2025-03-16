import { Router } from "express";
import { UserController } from "./controller";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infraestructure";
import { DeleteUserCase, GetUserCase, GetUsersCase, UpdateUserCase } from "../../domain";
import { createJwtStrategy } from "../../config";
import { passportJwtMiddleware } from "../middlewares/passport.jwt.middleware";




export class UserRoutes{

    static get routes (): Router {

        const router = Router();
        const userDatasource = new UserDatasourceImpl();
        const userRepositoryImpl = new UserRepositoryImpl(userDatasource);
        const getUserCase = new GetUserCase(userRepositoryImpl);
        const getUsersCase = new GetUsersCase(userRepositoryImpl);
        const updateUserCase = new UpdateUserCase(userRepositoryImpl);
        const deleteUserCase = new DeleteUserCase(userRepositoryImpl);

        createJwtStrategy(getUserCase);


        const controller = new UserController(
            getUsersCase,
            getUserCase,
            updateUserCase,
            deleteUserCase
        );

        router.get('/', passportJwtMiddleware, controller.getAll); 
        
        router.get('/:id', passportJwtMiddleware, controller.getById); 

        router.patch('/:id', passportJwtMiddleware, controller.update);

        router.delete('/:id', passportJwtMiddleware, controller.delete);

        return router;
    }
}