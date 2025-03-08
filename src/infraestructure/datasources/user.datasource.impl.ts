import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, UserDatasource, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;

export class UserDatasourceImpl implements UserDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash
  ) {}
  
  async getAll(): Promise<UserEntity[]> {
    try {
      const users = await UserModel.find();
      if (users.length > 0) {
        return users.map((user) => UserMapper.userEntityFromObject(user));
      }
      return [];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(" Internal Server Error");
    }
  }

  async update(
    id: string,
    object: { [key: string]: string }
  ): Promise<boolean> {
    try {
      //verificar si el correo ya existe
      if (object.email) {
        const userExist = await UserModel.findOne({ email: object.email });

        if (userExist && userExist._id.toString() !== id) {
          throw CustomError.badRequest("Invalid email");
        }
      }

      if (object.password) {
        object.password = this.hashPassword(object.password);
      }

      const user = await UserModel.updateOne({ _id: id }, object);
      if (user.modifiedCount > 0) {
        return true;
      }
      return false;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(" Internal Server Error");
    }
  }

  async getById(id: string): Promise<UserEntity> {
    try {
      const user = await UserModel.findById({ _id: id });
      if (user) {
        const userUntity = UserMapper.userEntityFromObject(user);
        return userUntity;
      }
      throw CustomError.notFound("User not found");
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(" Internal Server Error");
    }
  }

  async getByEmail(query: string): Promise<UserEntity> {
    try {
      const user = await UserModel.findOne({ email: query });
      if (user) {
        const userUntity = UserMapper.userEntityFromObject(user);
        return userUntity;
      }
      throw CustomError.notFound("User not found");
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(" Internal Server Error");
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const userDelete = await UserModel.deleteOne({ _id: id });
      if (userDelete.deletedCount > 0) {
        return true;
      }
      return false;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(" Internal Server Error");
    }
  }
}
