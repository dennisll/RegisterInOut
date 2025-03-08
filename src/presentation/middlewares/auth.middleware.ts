import { NextFunction, Response, Request } from "express";
import { LoginUserDto } from "../../domain";



export class AuthMiddleware{

    static validateJwt = (req: Request, res: Response, next: NextFunction) =>{

        console.log('paso por el middleware');
        return next();
    }

    static validateEmailAndPassword (req: Request, res: Response, next: NextFunction) {

        const [err, loginUserDto] = LoginUserDto.create(req.body);
        
            if (err) {
              res.status(400).json({ err });
              return;
            }

        req.body = loginUserDto;
        
        return next();
    }
}