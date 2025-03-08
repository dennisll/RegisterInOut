import { RegisterType } from "../../entities/register.entity";

export class RegisterDto {
  private constructor(
    public data: Date,
    public lat: string,
    public long: string,
    public imageUrl: string,
    public registerType: RegisterType  
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterDto?] {
    const { data, lat, long, imageUrl, registerType } = object;

    if (!data) return ["Missing data"];
    if (!lat) return ["Missing lat"];
    if (!long) return ["Missing long"];
    if (!imageUrl) return ["Missing imageUrl"];
    if (!registerType) return ["Missing registerType"];

    return [undefined, new RegisterDto(data, lat, long, imageUrl, registerType)];
  }
}
