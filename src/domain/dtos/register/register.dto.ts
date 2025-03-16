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
      data,
      lat,
      long,
      imageUrl,
      registerType,
    } = object;

    const time = new Date();

    /* if (!year) return ["Missing year"];
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
      return ["Incorrect second"]; */
    if (!lat) return ["Missing lat"];
    if (!long) return ["Missing long"];
    if (!registerType) return ["Missing registerType"];
    if (registerType != RegisterType.ENTRANCE) {
      if (registerType != RegisterType.STARTLUNCH) {
        if (registerType != RegisterType.ENDLUNCH) {
          if (registerType != RegisterType.EXIT) {
            return ["Incorrect RegisterType"];
          }
        }
      }
    }
    /* if (registerType == RegisterType.ENTRANCE && (hour < 8 || hour >= 12)) {
      return ["Not matching RegisterType with datatime"];
    }
    if (registerType == RegisterType.STARTLUNCH && hour <= 12) {
      return ["Not matching RegisterType with datatime"];
    }
    if (registerType == RegisterType.ENDLUNCH && hour >= 18) {
      return ["Not matching RegisterType with datatime"];
    }
    if (registerType == RegisterType.EXIT && (hour >= 8 || hour <= 18)) {
      return ["Not matching RegisterType with datatime"];
    } */

    const newData = new Date(
      data
    );

    return [
      undefined,
      new RegisterDto(newData, lat, long, imageUrl, registerType),
    ];
  }
}
