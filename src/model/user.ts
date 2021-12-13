
import SplintelandsPage from '../modules/splinterlandsPage';
import { IAuthData } from '../@types/model/user.d';

export default class User {

    account: string;

    password: string;

    splinterlandsPage: SplintelandsPage;

    constructor({ account, password }: IAuthData) {
        this.account = account;
        this.password = password;
    }

    async init() {
        if (!this.splinterlandsPage) {
            this.splinterlandsPage = new SplintelandsPage();
            await this.splinterlandsPage.init();
            await this.splinterlandsPage.gotoBattlePage();
        }
    }

    async login() {
        try {
            await this.splinterlandsPage.login(this.account, this.password);
        } catch (e) {
            throw new Error('Didnt login');
        }
    }

    async loadInfo() {
        // getEcr
        // getDec
        // getRating
        // getCards
        // getRewardIsCollectable
        // getQuest
    }

    async collectRewards() {
        // collectQuestReward
        // collectSeasonReward
    }

    async startBattlePreparation() {
        // clickOnBattleButton
        // waitOpponent
    }

    async getBattleInfo() {
        // getManaCap
        // getRules
        // getSplinters
    }

    async getTeam() {
        // getPossibleTeams
        // selectTeamFromPossibleTeams
        // selectCardsForBattle
    }

    async startBattle() {
        // startBattle
        // waitBattleStart
    }

    async rumbleAndSkipBattle() {
        // clickOnRumble
        // clickOnSkip
    }

    async getBattleResult() {
        // getBattleWinner
        // getBattleDecReward
    }

    async updateStats() {
        // updateRatingChange
        // updateWinnerCount
        // updateDecWon
    }

    async waitTimeToNextBattle() {
        // sleep
    }

}
