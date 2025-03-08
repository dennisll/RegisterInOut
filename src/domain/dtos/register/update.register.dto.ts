import { RegisterType } from "../../entities/register.entity";

export class UpdateRegisterDto {
  private constructor(
    public data: Date,
    public registerType: RegisterType 
  ) {}

  static create(object: { [key: string]: any }): [string?, UpdateRegisterDto?] {
    const {data, registerType} = object;

    if (!data) return ["Missing data"];
    if (!registerType) return ["Missing registerType"];

    return [undefined, new UpdateRegisterDto(data, registerType)];
  }
}
