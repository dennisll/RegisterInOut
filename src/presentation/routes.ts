
import {Router } from 'express'
import { AuthRoutes } from './auth/routes';
import { UserRoutes } from './users/routes';
import { RegisterRoutes } from './registers/routes';

export class AppRoutes{

    static get routes (): Router {

        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/users', UserRoutes.routes);
        router.use('/api/registers', RegisterRoutes.routes);
        return router;
    }
}