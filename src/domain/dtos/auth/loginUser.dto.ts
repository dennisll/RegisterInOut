import { Validators } from "../../../config/validators";

export class LoginUserDto {

  private constructor(
    public email: string,
    public password: string,
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    
    const {
      email,
      password,
      } = object;

    //podria usar el paquete zod para validar tambien

    if (!email) return ["Missing email"];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (password.lenght < 8) return ["Password too short"];
    //if (!Validators.password.test(password)) return ["Password is not valid"];
    

    return [
      undefined,
      new LoginUserDto(
        email,
        password,
      ),
    ];
  }
}
