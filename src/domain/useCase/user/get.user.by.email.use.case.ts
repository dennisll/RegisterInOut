import { UserEntity, UserRepository } from "../..";

export class GetUserByEmailCase{

    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository){
       this.userRepository = userRepository;
    }

    getUser(email: string): Promise<UserEntity>{
        return this.userRepository.getByEmail(email);
    }
}