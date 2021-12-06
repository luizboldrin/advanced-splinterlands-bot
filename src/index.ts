import _ from 'lodash';
import config from './config';
import User from './model/user';

(async () => {
    const start = true;
    const users = _.zipWith<string, string, IAuthData>(
        config.accounts,
        config.passwords,
        (account: string, password: string) => ({ account, password }),
    )
        .map((value: IAuthData) => new User(value));

    // while (start) {
    //     for (const user in users) {
    //         // create browser

    //     }
    // }
})()
    .catch(console.log);
