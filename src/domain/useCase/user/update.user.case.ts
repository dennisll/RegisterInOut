import { UserEntity, UserRepository } from "../..";

export class UpdateUserCase{

    private readonly userRepository: UserRepository

    constructor(userRepository: UserRepository) {
       this.userRepository = userRepository;
    }

    update(id: string, object: {[key:string]: string}): Promise<boolean> {
        return this.userRepository.update(id, object);
    }
}