
import { Quest, Cards } from '../@types/modules/splinterlands.d';
import { IAuthData } from '../@types/model/user.d';
import Splinterlands from '../modules/splinterlands';
import { BattleDetail } from '../@types/modules/battleEngine.d';
import BattleEngine from '../modules/battleEngine';

export default class User {

    account: string;

    password: string;

    splinterlands: Splinterlands;

    battleEngine: BattleEngine;

    ecr: number;

    dec: number;

    rating: number;

    cards: Cards;

    quest: Quest;

    battleDetail: BattleDetail

    constructor({ account, password }: IAuthData) {
        this.account = account;
        this.password = password;
    }

    async init() {
        if (!this.splinterlands) {
            this.splinterlands = new Splinterlands();
            this.battleEngine = new BattleEngine();
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
    }

    async collectRewards() {
        await this.splinterlands.page.collectQuestReward();
        await this.splinterlands.page.collectSeasonReward(this.account);
    }

    async startBattlePreparation() {
        // selectRankedMode
        await this.splinterlands.page.clickOnBattleButton();
        await this.splinterlands.page.waitOpponent();
    }

    async getBattleInfo() {
        const manaCap = await this.splinterlands.page.getManaCap();
        const rules = await this.splinterlands.page.getRules();
        const splinters = await this.splinterlands.page.getSplinters();
        // TODO: getOpponentRecentePlayedTeams
        // https://api2.splinterlands.com/players/recent_teams?player={{account}}

        console.log('manaCap:', manaCap);
        console.log('rules:', rules);
        console.log('splinters:', splinters);

        this.battleDetail = {
            manaCap,
            rules,
            splinters,
            cards: this.cards,
            quest: this.quest,
        };
    }

    async getTeam() {
        const possibleTeams = await this.battleEngine.getPossibleTeams(this.battleDetail);
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
