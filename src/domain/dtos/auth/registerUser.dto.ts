import { Validators } from "../../../config/validators";

export class RegisterUserDto {
  private constructor(
    // para impedir su uso fuera de la clase
    public email: string,
    public password: string,
    public displayName: string,
    public firstName: string,
    public lastName: string,
    public city: string,
    public street: string,
    public houseNumber: string,
    public cep: string,
    public phoneNumber: string,
    public photoUrl: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    
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

    //podria usar el paquete zod para validar tambien

    if (!email) return ["Missing email"];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (password.lenght < 8) return ["Password too short"];
    if (!firstName) return ["Missing firstName"];
    if (!lastName) return ["Missing lastName"];
    if (!displayName) return ["Missing displayName"];
    if (!city) return ["Missing city"];
    if (!street) return ["Missing street"];
    if (!houseNumber) return ["Missing houseNumber"];
    if (!cep) return ["Missing cep"];
    if (!phoneNumber) return ["Missing phoneNumber"];
    if (!photoUrl) return ["Missing photoUrl"];

    return [
      undefined,
      new RegisterUserDto(
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
        photoUrl
      ),
    ];
  }
}
