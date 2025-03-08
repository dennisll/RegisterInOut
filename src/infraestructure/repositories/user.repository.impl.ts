import { UserDatasource, UserEntity, UserRepository } from "../../domain";

export class UserRepositoryImpl extends UserRepository {

  constructor(private readonly userDatasource: UserDatasource) {
    super();
  }

  async getAll(): Promise<UserEntity[]> {
    return this.userDatasource.getAll();
  }

  update(id: string, object: { [key: string]: string }): Promise<boolean> {
    return this.userDatasource.update(id, object);
  }

  async getById(id: string): Promise<UserEntity> {
    return this.userDatasource.getById(id);
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return this.userDatasource.getByEmail(email);
  }

  async delete(id: string): Promise<boolean> {
    return this.userDatasource.delete(id);
  }
}
