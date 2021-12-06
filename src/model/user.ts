export default class User {

    account: string;

    password: string;

    constructor({ account, password }: IAuthData) {
        this.account = account;
        this.password = password;
    }

}
