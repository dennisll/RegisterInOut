export class Validators {

    static get email(){

        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    }

    static get password(){

        return /^[a-zA-Z0-9._-]{2,6}$/;
    }
}