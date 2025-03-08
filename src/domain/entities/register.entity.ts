

export enum RegisterType { entrance, startLunch, endLunch, exit }

export class RegisterEntity{

    constructor(
        public id: string,
        public data: Date,
        public accumulatedTime: number,
        public lat: string,
        public long: string,
        public imageUrl: string,
        public state: string,
        public registerType: RegisterType 
    ) {}
}