import {
    ManaCap, Rules, Splinters, Cards, Quest,
} from './splinterlands.d';

export interface BattleDetail {
    manaCap: ManaCap,
    rules: Rules,
    splinters: Splinters,
    cards: Cards,
    quest: Quest,
}

export interface BattleHistory {
    createdAt: string;
    matchType: string;
    manaCap: number;
    ruleSet: string;
    inactive: string;
    battleQueueId: string;
    playerRatingInitial: number;
    playerRatingFinal: number;
    winner: string;
    summonerId: number;
    summonerLevel: number;
    monster1Id?: number;
    monster1Level?: number;
    monster1Abilities?: Array<string>;
    monster2Id?: number;
    monster2Level?: number;
    monster2Abilities?: Array<string>;
    monster3Id?: number;
    monster3Level?: number;
    monster3Abilities?: Array<string>;
    monster4Id?: number;
    monster4Level?: number;
    monster4Abilities?: Array<string>;
    monster5Id?: number;
    monster5Level?: number;
    monster5Abilities?: Array<string>;
    monster6Id?: number;
    monster6Level?: number;
    monster6Abilities?: Array<string>;
}
