import { RegisterModel } from "../../data";
import {
  CustomError,
  RegisterDatasource,
  RegisterDto,
  RegisterEntity,
  UpdateRegisterDto,
} from "../../domain";
import { RegisterMapper } from "../mappers/register.mapper";

export class RegisterDatasourceImpl implements RegisterDatasource {

  async registerData(
    userId: string,
    registerDto: RegisterDto
  ): Promise<RegisterEntity> {
    const { data, lat, long, imageUrl, registerType } = registerDto;

    try {
      const registerExist = await RegisterModel.findOne({
        data: data,
        registerType: registerType, 
        userId: userId,
      });

      if (registerExist) throw new CustomError(400, "Register already exist");

      const register = new RegisterModel({
        data: data,
        lat: lat,
        long: long,
        imageUrl: imageUrl,
        registerType: registerType,
        userId: userId,
      });
      await register.save();

      return RegisterMapper.registerEntityFromObject(register);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer("Internal Server Error");
    }
  }

  async getOneRegisterData(id: string): Promise<RegisterEntity> {
    try {
      const register = await RegisterModel.findById({ _id: id });
      if (!register) {
        throw CustomError.notFound("Register not found");
      }

      return RegisterMapper.registerEntityFromObject(register);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(" Internal Server Error");
    }
  }

  async getAllRegisterData(): Promise<RegisterEntity[]> {
    try {
      const registersData = await RegisterModel.find();

      if (registersData.length > 0) {
        return registersData.map((register) =>
          RegisterMapper.registerEntityFromObject(register)
        );
      }
      return [];
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(" Internal Server Error");
    }
  }

  async updateRegisterData(
    id: string,
    updateRegisterDto: UpdateRegisterDto
  ): Promise<string> {
    const { data, registerType } = updateRegisterDto;

    try {
      const register = await RegisterModel.findOne({ _id: id });

      if (!register) throw CustomError.notFound("Register not Found");

      const registerUpdate = await RegisterModel.updateOne(
        { _id: id },
        { data: data, registerType: registerType }
      );
      if (registerUpdate.modifiedCount > 0) {
        return "Register updated";
      }
      return "Register not updated";
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer(" Internal Server Error");
    }
  }

  async deleteRegisterData(id: string): Promise<boolean> {
    try {
      const register = await RegisterModel.deleteOne({ _id: id });

      if (register.deletedCount) {
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
