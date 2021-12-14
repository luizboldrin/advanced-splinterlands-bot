
import SplintelandsPage from '../modules/splinterlandsPage';
import { IAuthData } from '../@types/model/user.d';

export default class User {

    account: string;

    password: string;

    splinterlandsPage: SplintelandsPage;

    ecr: number;

    dec: number;

    rating: number;

    cards: Array<number>;

    isRewardCollectable: boolean;

    quest: string;

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
        if (await this.splinterlandsPage.isUserLogged(this.account)) {
            return;
        }
        await this.splinterlandsPage.login(this.account, this.password);
    }

    async loadInfo() {
        await this.splinterlandsPage.gotoBattlePage();
        await this.splinterlandsPage.closeModal();
        // this.ecr = await this.splinterlandsPage.getEcr();
        // this.dec = await this.splinterlandsPage.getDec();
        // this.rating = await this.splinterlandsPage.getRating();
        // this.cards = await this.splinterlandsPage.getCards();
        // this.isRewardCollectable = await this.splinterlandsPage.isRewardCollectable();
        // this.quest = await this.splinterlandsPage.getQuest();
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
