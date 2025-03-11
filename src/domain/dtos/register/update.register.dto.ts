import { RegisterType } from "../../entities/register.entity";

export class UpdateRegisterDto {
  private constructor(public data: Date, public registerType: RegisterType) {}

  static create(object: { [key: string]: any }): [string?, UpdateRegisterDto?] {
    const { year, month, day, hour, minute, registerType } = object;

    const time = new Date();

    if (!year) return ["Missing year"];
    if (
      parseInt(year) != time.getFullYear() ||
      parseInt(year) != time.getFullYear() - 1
    )
      return ["Incorrect year"];
    if (!month) return ["Missing month"];
    if (parseInt(month) != time.getMonth()) {
      if (parseInt(month) != time.getMonth() - 1) {
        return ["Incorrect month"];
      } 
    };
    if (!day) return ["Missing day"];
    if (month == "1" && parseInt(day) > 29) return ["Incorrect day"];
    if (0 > parseInt(day) && parseInt(day) > 31) return ["Incorrect day"];
    if (!hour) return ["Missing hour"];
    if (0 > parseInt(hour) && parseInt(hour) > 23) return ["Incorrect hour"];
    if (!minute) return ["Missing minute"];
    if (0 > parseInt(minute) && parseInt(minute) > 60)
      return ["Incorrect minute"];
    if (!registerType) return ["Missing registerType"];

    const data = new Date(
      parseInt(year),
      parseInt(month),
      parseInt(day),
      parseInt(hour),
      parseInt(minute)
    );

    return [undefined, new UpdateRegisterDto(data, registerType)];
  }
}
