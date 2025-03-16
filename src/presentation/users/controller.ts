import { Request, Response } from "express";
import { UpdateUserDto } from "../../domain/dtos/user/updateUser.dto";
import { CustomError, DeleteUserCase, GetUserCase, GetUsersCase, UpdateUserCase, UserEntity } from "../../domain";
import { RolesList } from "../../roles";
import { handleError } from "../shared/handleError";


const roles: any = RolesList();

export class UserController{

    constructor(
        private readonly getUsersCase: GetUsersCase,
        private readonly getUserCase: GetUserCase,
        private readonly updateUsersCase: UpdateUserCase,
        private readonly deleteUsersCase: DeleteUserCase,

    ){}

    public getAll = (req: Request, res: Response) => {

        const user = req.user as UserEntity;

        if(!user.role.includes("USER_ROLE")){ 

            let error = CustomError.unauthorized("Dont Access this resource");

            return handleError(error, res); 
        }

        this.getUsersCase.getAllUsers().then( users => {
            res.json(users);
            return;
        }).catch( error => {
            return handleError(error, res);
        }) 
    }

    public getById = (req: Request, res: Response) => {

        this.getUserCase.getUser(req.params.id).then( user => {
            res.json(user);
        }).catch( error =>{
            return handleError(error, res);
        })
    }

    public update = (req: Request, res: Response) => {

        const [err, updateUserDto] = UpdateUserDto.create(req.body);

        if (err) {
            res.status(400).json({ err });
            return;
          }

        this.updateUsersCase.update(req.params.id, updateUserDto!.object).
        then( user => {
            res.send(user);
        }).catch( error => {
            return handleError(error, res);
        })
    }

    public delete = (req: Request, res: Response) => {

        this.deleteUsersCase.delete(req.params.id).
        then( user => {
            res.send(user);
        }).
        catch( error => {
            return handleError(error, res);
        })
    }
}