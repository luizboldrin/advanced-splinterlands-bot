import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { BattleHistory } from '../../@types/modules/battleEngine.d';
import {
    Quest, Cards, CardsCollectionResponse, CardInfoResponse,
    QuestPlayerResponse, BattleHistoryResponse, BattleHistoryInfoResponse, BattleHistoryTeamResponse, BattleHistoryDetailResponse,
} from '../../@types/modules/splinterlands.d';
import basicCards from './basicCards';


export default class SplinterlandsApi {

    quests = [
        { name: 'Defend the Borders', element: 'life' },
        { name: 'Pirate Attacks', element: 'water' },
        { name: 'High Priority Targets', element: 'snipe' },
        { name: 'Lyanna\'s Call', element: 'earth' },
        { name: 'Stir the Volcano', element: 'fire' },
        { name: 'Rising Dead', element: 'death' },
        { name: 'Stubborn Mercenaries', element: 'neutral' },
        { name: 'Gloridax Revenge', element: 'dragon' },
        { name: 'Stealth Mission', element: 'sneak' },
    ]

    async getPlayerCards(account: string): Promise<Cards> {
        const response = await axios.get<CardsCollectionResponse>(`https://api2.splinterlands.com/cards/collection/${account}`);
        let cardsInfo: Array<CardInfoResponse> = [];

        if (response.data.cards) {
            cardsInfo = response.data.cards;
        }

        return cardsInfo
            .filter((cardInfo) => this.isValidCard(cardInfo, account))
            .map((cardInfo) => cardInfo.card_detail_id)
            .concat(basicCards);
    }

    async getPlayerQuest(account: string): Promise<Quest> {
        const response = await axios.get<[QuestPlayerResponse]>(`https://api2.splinterlands.com/players/quests?username=${account}`);
        const questDetails = _.first(response.data);

        return {
            name: questDetails.name,
            element: this.quests.find((q) => q.name === questDetails.name).element,
            total: questDetails.total_items,
            completed: questDetails.completed_items,
        };
    }

    // eslint-disable-next-line max-lines-per-function
    async getPlayerBattleHistory(account: string): Promise<Array<BattleHistory>> {
        const response = await axios.get<BattleHistoryResponse>(`https://api2.splinterlands.com/battle/history?player=${account}`);

        return response.data.battles
            // eslint-disable-next-line max-lines-per-function
            .map((b: BattleHistoryInfoResponse): BattleHistory | null => {
                const info = {
                    createdAt: b.created_date, matchType: b.match_type,
                    manaCap: b.mana_cap, ruleSet: b.ruleset, inactive: b.inactive,
                };

                const details = <BattleHistoryDetailResponse>JSON.parse(b.details);

                if (details.type === 'Surrender') {
                    return null;
                }

                if (b.winner && b.winner === b.player_1 && !details.team1) {
                    console.log('winner 1');
                    console.log(details.team1);
                    console.log(details);
                }
                if (b.winner && b.winner === b.player_2 && !details.team2) {
                    console.log('winner 2');
                    console.log(details.team2);
                    console.log(details);
                }

                if (b.winner && b.winner === b.player_1) {
                    const monstersDetails = this.extractMonsters(details.team1);
                    return {
                        ...monstersDetails,
                        ...info,
                        battleQueueId: b.battle_queue_id_1,
                        playerRatingInitial: b.player_1_rating_initial,
                        playerRatingFinal: b.player_1_rating_final,
                        winner: b.player_1,

                    };
                } if (b.winner && b.winner === b.player_2) {
                    const monstersDetails = this.extractMonsters(details.team2);
                    return {
                        ...monstersDetails,
                        ...info,
                        battleQueueId: b.battle_queue_id_2,
                        playerRatingInitial: b.player_2_rating_initial,
                        playerRatingFinal: b.player_2_rating_final,
                        winner: b.player_2,
                    };
                }
                return null;
            })
            .filter((b) => !!b);
    }

    private isValidCard(cardInfo: CardInfoResponse, account: string): boolean {
        return this.isValidDelegatedTo(cardInfo, account) &&
            this.isValidaMarketListingType(cardInfo, account) &&
            this.isValidLastUsedPlayer(cardInfo, account);
    }

    private isValidDelegatedTo(cardInfo: CardInfoResponse, account: string): boolean {
        return cardInfo.delegated_to === null || cardInfo.delegated_to === account;
    }

    private isValidaMarketListingType(cardInfo: CardInfoResponse, account: string): boolean {
        return cardInfo.market_listing_type === null || cardInfo.delegated_to === account;
    }

    private isValidLastUsedPlayer(cardInfo: CardInfoResponse, account: string): boolean {
        return !(cardInfo.last_used_player !== account && moment(cardInfo.last_used_date).isAfter(moment().subtract(1, 'day')));
    }

    private extractMonsters(team: BattleHistoryTeamResponse): Partial<BattleHistory> & Pick<BattleHistory, 'summonerId' | 'summonerLevel'> {
        const monsters = {
            summonerId: team.summoner.card_detail_id,
            summonerLevel: team.summoner.level,
        };

        for (let i = 0; i < 6; i++) {
            if (team.monsters[i]) {
                monsters[`monster${i + 1}Id`] = team.monsters[i].card_detail_id;
                monsters[`monster${i + 1}Level`] = team.monsters[i].level;
                monsters[`monster${i + 1}Abilities`] = team.monsters[i].abilities;
            }
        }

        return monsters;
    }

}
