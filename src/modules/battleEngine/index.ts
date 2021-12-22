import { Cards } from '../../@types/modules/splinterlands.d';
import { BattleDetail, BattleHistory } from '../../@types/modules/battleEngine.d';
import cardsEnum from '../splinterlands/cardsEnum';
import history from '../../data/history';

export default class BattleEngine {

    getPossibleTeams(battleDetails: BattleDetail): Array<BattleHistory> {
        let possibleTeams: Array<BattleHistory> = [];
        let manaCap = battleDetails.manaCap;

        // eslint-disable-next-line no-magic-numbers
        while (battleDetails.manaCap > 10) {
            console.log(`check battles based on manaCap: ${manaCap}`);

            const mySummoners = battleDetails.cards
                .filter((value) => cardsEnum.summonersIdList.includes(Number(value)));
            console.log('INPUT: ', manaCap, battleDetails.rules, battleDetails.splinters, battleDetails.cards.length);

            possibleTeams = <Array<BattleHistory>>history
                .filter((battleHistory: BattleHistory) => (this.checkManaCap(manaCap, battleHistory.manaCap) &&
                    this.checkSummoner(mySummoners, battleHistory.summonerId) &&
                    this.checkRules(battleDetails.rules, battleHistory.ruleSet) &&
                    this.checkCards(battleDetails.cards, battleHistory)));

            if (possibleTeams.length > 0) {
                return possibleTeams;
            }
            manaCap--;
        }
        return possibleTeams;
    }

    private checkManaCap(manaCap: number, battleHistoryManaCap: number): boolean {
        return manaCap === battleHistoryManaCap;
    }

    private checkSummoner(summoners: Array<number>, battleHistorySummoner: number) {
        return summoners.includes(battleHistorySummoner);
    }

    private checkRules(rules: string, battleHistoryRules: string) {
        return !rules || rules === battleHistoryRules;
    }

    private checkCards(cards: Cards, battleHistory: BattleHistory): boolean {
        const battleHistoryCardProperties: Array<keyof Pick<BattleHistory, 'monster1Id' | 'monster2Id' | 'monster3Id' | 'monster4Id' | 'monster5Id' | 'monster6Id'>> =
            ['monster1Id', 'monster2Id', 'monster3Id', 'monster4Id', 'monster5Id', 'monster6Id'];
        return battleHistoryCardProperties
            .every(
                (cardProperty) => !battleHistory[cardProperty] || cards.includes(battleHistory[cardProperty]),
            );
    }

}
