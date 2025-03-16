


import { CustomError, RegisterEntity, } from "../../domain";

export class RegisterMapper {
  static registerEntityFromObject(object: { [key: string]: any }) {
    const {
      _id,
      id,
      data,
      lat,
      long,
      state,
      registerType,
    } = object;

    if (!_id || !id) throw CustomError.badRequest("Missing id");
    if (!data) throw CustomError.badRequest("Missing data");
    if (!lat) throw CustomError.badRequest("Missing lat"); 
    if (!long) throw CustomError.badRequest("Missing long"); 
    if (!state) throw CustomError.badRequest("Missing state"); 
    if (!registerType) throw CustomError.badRequest("Missing registerType"); 

    return new RegisterEntity( 
        _id || id,
        data,
      lat,
      long,
      state,
      registerType,
       )
  }
}
