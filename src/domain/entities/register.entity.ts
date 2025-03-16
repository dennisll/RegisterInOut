export const enum RegisterType {
  ENTRANCE = "entrance",
  STARTLUNCH = "startLunch",
  ENDLUNCH = "endLunch",
  EXIT = "exit",
}

export class RegisterEntity {
  constructor(
    public id: string,
    public data: Date,
    public lat: string,
    public long: string,
    public state: string,
    public registerType: RegisterType
  ) {}
}
