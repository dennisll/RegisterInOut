import { UserEntity } from "../entities/user.entity";



export abstract class UserRepository{

    abstract getAll(): Promise< UserEntity[]>;
    abstract getById(id: string): Promise< UserEntity>;
    abstract getByEmail(email: string): Promise< UserEntity>;
    abstract update(id: string, object: {[key:string]: string}): Promise<boolean>;
    abstract delete(id: string): Promise<boolean>;
}