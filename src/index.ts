import _ from 'lodash';
import config from './config';
import User from './model/user';
import { IAuthData } from './@types/model/user.d';

(async () => {
    let start = true;
    const users = _.zipWith<string, string, IAuthData>(
        config.accounts,
        config.passwords,
        (account: string, password: string) => ({ account, password }),
    )
        .map((authData: IAuthData) => new User(authData));

    while (start) {
        for (const user of users) {
            await user.init();
            await user.login();
            await user.loadInfo();
            await user.collectRewards();
            await user.startBattlePreparation();
            await user.getBattleInfo();
            await user.getTeam();
            await user.startBattle();
            await user.rumbleAndSkipBattle();
            await user.getBattleResult();
            await user.updateStats();
            await user.waitTimeToNextBattle();
        }
        start = false;
    }
})()
    .catch(console.log);
