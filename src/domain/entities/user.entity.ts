


export class UserEntity{

    constructor(
        public id: string,
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
        public photoUrl: string,
        public isEmailVerified: boolean,
        public refreshToken: boolean,
        public role: string [],
    ) {}
}