
import { Quest } from 'src/@types/model/quest';
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

    quest: Quest;

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
        console.log('ecr:', this.ecr);
        this.dec = await this.splinterlands.page.getDec();
        console.log('dec:', this.dec);
        this.rating = await this.splinterlands.page.getRating();
        console.log('rating:', this.rating);
        this.cards = await this.splinterlands.api.getPlayerCards(this.account);
        console.log('cards:', this.cards);
        this.quest = await this.splinterlands.api.getPlayerQuest(this.account);
        console.log('quest:', this.quest);
        // this.isRewardCollectable = await this.splinterlands.page.isRewardCollectable();
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
