import { Validators } from "../../../config/validators";

export class UpdateUserDto {

  //dataUpdate: Object = {};

  private constructor(
    public object: {}
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateUserDto?]{  //[string?, Object?] {
    
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
    } = object;

    let dataToUpdate = []

    //podria usar el paquete zod para validar tambien

    if (email){
      if (!Validators.email.test(email)) return ["Email is not valid"];
      dataToUpdate.push(['email', email]);    
    }
    if (password){
      if (password.lenght < 8) return ["Password too short"];
      dataToUpdate.push(['password', password]); 
    }
    if (firstName) dataToUpdate.push(['firstName', firstName]); 
    if (lastName) dataToUpdate.push(['lastName', lastName]); 
    if (displayName) dataToUpdate.push(['displayName', displayName]); 
    if (city) dataToUpdate.push(['city', city]); 
    if (street) dataToUpdate.push(['street', street]); 
    if (houseNumber) dataToUpdate.push(['houseNumber', houseNumber]); 
    if (cep) dataToUpdate.push(['cep', cep]); 
    if (phoneNumber) dataToUpdate.push(['phoneNumber', phoneNumber]); 
    if (photoUrl) dataToUpdate.push(['photoUrl', photoUrl]); 

    const obj = Object.fromEntries(dataToUpdate);

    return [undefined, new UpdateUserDto(obj)];
  }
}
