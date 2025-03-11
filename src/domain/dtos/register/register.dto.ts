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
    const {
      year,
      month,
      day,
      hour,
      minute,
      second,
      lat,
      long,
      imageUrl,
      registerType,
    } = object;

    const time = new Date();

    if (!year) return ["Missing year"];
    if (parseInt(year) != time.getFullYear()) return ["Incorrect year"];
    if (!month) return ["Missing month"];
    if (parseInt(month) != time.getMonth()) {
      if (parseInt(month) != time.getMonth() - 1) {
        return ["Incorrect month"];
      } else if (
        parseInt(day) != 31 ||
        parseInt(day) != 30 ||
        parseInt(day) != 29 ||
        parseInt(day) != 28
      ) {
        return ["Incorrect month"];
      }
    }
    if (!day) return ["Missing day"];
    if (month == "1" && parseInt(day) > 29) return ["Incorrect day"];
    if (0 > parseInt(day) && parseInt(day) > 31) return ["Incorrect day"];
    if (!hour) return ["Missing hour"];
    if (0 > parseInt(hour) && parseInt(hour) > 23) return ["Incorrect hour"];
    if (!minute) return ["Missing minute"];
    if (0 > parseInt(minute) && parseInt(minute) > 60)
      return ["Incorrect minute"];
    if (!second) return ["Missing second"];
    if (0 > parseInt(second) && parseInt(second) > 60)
      return ["Incorrect second"];
    if (!lat) return ["Missing lat"];
    if (!long) return ["Missing long"];
    if (!imageUrl) return ["Missing imageUrl"];
    if (!registerType) return ["Missing registerType"];

    const data = new Date(
      parseInt(year),
      parseInt(month),
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second)
    );

    return [
      undefined,
      new RegisterDto(data, lat, long, imageUrl, registerType),
    ];
  }
}
