
import { IAuthData } from '../@types/model/user.d';
import Splinterlands from '../modules/splinterlands';

export default class User {

    account: string;

    password: string;

    splinterlands: Splinterlands;

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
        if (!this.splinterlands) {
            this.splinterlands = new Splinterlands();
            await this.splinterlands.init();
            await this.splinterlands.page.gotoBattlePage();
        }
    }

    async login() {
        if (await this.splinterlands.page.isUserLogged(this.account)) {
            return;
        }
        await this.splinterlands.page.login(this.account, this.password);
    }

    async loadInfo() {
        await this.splinterlands.page.gotoBattlePage();
        await this.splinterlands.page.closeModal();
        this.ecr = await this.splinterlands.page.getEcr();
        this.dec = await this.splinterlands.page.getDec();
        this.rating = await this.splinterlands.page.getRating();
        // this.cards = await this.splinterlands.page.getCards();
        // this.isRewardCollectable = await this.splinterlands.page.isRewardCollectable();
        // this.quest = await this.splinterlands.page.getQuest();
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
