import passport from "passport";
import { BcryptAdapter, JwtAdapter } from "../../config";
import {
  RegisterUserDto,
  UserEntity,
  AuthDatasource,
  CustomError,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";
import { UserModel } from "../../data";

type HashFunction = (password: string) => string;
type CompareHashFunction = (password: string, hash: string) => boolean;
type GenerateTokenFunction = (
  payload: Object,
  duration: string
) => Promise<string | null>;

export class MongoDbAuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareHashFunction = BcryptAdapter.compare,
    private readonly generateToken: GenerateTokenFunction = JwtAdapter.generateToken
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const {
      email,
      password,
      displayName,
      firstName,
      lastName,
      city,
      street,
      houseNumber,
      cep,
      phoneNumber,
      photoUrl,
    } = registerUserDto;

    try {
      const exist = await UserModel.findOne({ email: email });
      if (exist) throw CustomError.badRequest("Invalid credentials");

      const userModel = new UserModel({
        email: email,
        password: this.hashPassword(password),
        displayName: displayName,
        firstName: firstName,
        lastName: lastName,
        city: city,
        street: street,
        houseNumber: houseNumber,
        cep: cep,
        phoneNumber: phoneNumber,
        photoUrl: photoUrl,
      });
      await userModel.save();

      return UserMapper.userEntityFromObject(userModel);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer('Internal Server Error');
    }
  }

  async generateTokenAuth(user: UserEntity): Promise<string> {

    const token = await this.generateToken({ id: user.id }, "2h");

    if (!token) throw CustomError.internalServer("Internal Server Error");

    return token;
  }

  async verifyByEmailAndPassword(email: string, password: string): Promise<UserEntity>{

    const user = await UserModel.findOne({ email: email});

    if(!user) throw CustomError.badRequest('Invalid credentials');

    const isPasswordValid =  this.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw CustomError.badRequest('Invalid credentials');   
    }
    
    return UserMapper.userEntityFromObject(user);
  }
}
