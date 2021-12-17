import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { Quest, Cards } from '../../@types/modules/splinterlands.d';
import basicCards from './basicCards';

interface CardInfo {
    'card_detail_id': number;
    'delegated_to'?: string;
    'market_listing_type'?: string;
    'last_used_player'?: string;
    'last_used_date'?: string;
}
interface CardsCollectionResponse {
    player: string;
    cards: CardInfo[];
}

interface QuestPlayerResponse {
     id: string;
     player: string;
     name: string;
     'total_items': number;
     'completed_items': number;
}

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
        let cardsInfo: Array<CardInfo> = [];

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

    private isValidCard(cardInfo: CardInfo, account: string): boolean {
        return this.isValidDelegatedTo(cardInfo, account) &&
            this.isValidaMarketListingType(cardInfo, account) &&
            this.isValidLastUsedPlayer(cardInfo, account);
    }

    private isValidDelegatedTo(cardInfo: CardInfo, account: string): boolean {
        return cardInfo.delegated_to === null || cardInfo.delegated_to === account;
    }

    private isValidaMarketListingType(cardInfo: CardInfo, account: string): boolean {
        return cardInfo.market_listing_type === null || cardInfo.delegated_to === account;
    }

    private isValidLastUsedPlayer(cardInfo: CardInfo, account: string): boolean {
        return !(cardInfo.last_used_player !== account && moment(cardInfo.last_used_date).isAfter(moment().subtract(1, 'day')));
    }

}
