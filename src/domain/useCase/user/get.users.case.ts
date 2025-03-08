import { UserEntity, UserRepository } from "../..";

export class GetUsersCase{

    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository) {
       this.userRepository = userRepository;
    }

    getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.getAll();
    }
}