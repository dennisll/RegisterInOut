import { UserEntity, UserRepository } from "../..";

export class GetUserCase{

    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository){
       this.userRepository = userRepository;
    }

    getUser(id: string): Promise<UserEntity>{
        return this.userRepository.getById(id);
    }
}