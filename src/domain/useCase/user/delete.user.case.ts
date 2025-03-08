import { UserEntity, UserRepository } from "../..";



export class DeleteUserCase{

    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository){
       this.userRepository = userRepository;
    }

    delete(id: string): Promise<boolean>{
        return this.userRepository.delete(id);
    }
}