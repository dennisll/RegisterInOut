import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const {
      _id,
      id,
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
      refreshToken,
      isEmailVerified,
      role
    } = object;

    if (!_id || !id) throw CustomError.badRequest("Missing id");
    if (!email) throw CustomError.badRequest("Missing email");
    if (!password) throw CustomError.badRequest("Missing password");
    if (password.lenght < 8) throw CustomError.badRequest("Password too short"); 
    if (!displayName) throw CustomError.badRequest("Missing displayName"); 
    if (!firstName) throw CustomError.badRequest("Missing firstName"); 
    if (!lastName) throw CustomError.badRequest("Missing lastName"); 
    if (!city) throw CustomError.badRequest("Missing city"); 
    if (!street) throw CustomError.badRequest("Missing street"); 
    if (!houseNumber) throw CustomError.badRequest("Missing houseNumber"); 
    if (!cep) throw CustomError.badRequest("Missing cep"); 
    if (!phoneNumber) throw CustomError.badRequest("Missing phoneNumber"); 
    if (!role) throw CustomError.badRequest("Missing role"); 
    if (role.lenght = 0) throw CustomError.badRequest("Is required something role"); 
    //if (!photoUrl) throw CustomError.badRequest("Missing photoUrl"); 
    if (refreshToken == null) throw CustomError.badRequest("Missing refreshToken");
    if (isEmailVerified == null) throw CustomError.badRequest("Missing isEmailVerified");

    return new UserEntity( 
        _id || id,
        email,
        "", //password,
        displayName,
        firstName,
        lastName,
        city,
        street,
        houseNumber,
        cep,
        phoneNumber,
        photoUrl,
        isEmailVerified,
        refreshToken,
        role)
  }
}
