import axios from 'axios';
import moment from 'moment';
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

export default class SplinterlandsApi {

    async getPlayerCards(account: string) {
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

    private isValidCard(cardInfo: CardInfo, account: string) {
        return this.isValidDelegatedTo(cardInfo, account) &&
            this.isValidaMarketListingType(cardInfo, account) &&
            this.isValidLastUsedPlayer(cardInfo, account);
    }

    private isValidDelegatedTo(cardInfo: CardInfo, account: string) {
        return cardInfo.delegated_to === null || cardInfo.delegated_to === account;
    }

    private isValidaMarketListingType(cardInfo: CardInfo, account: string) {
        return cardInfo.market_listing_type === null || cardInfo.delegated_to === account;
    }

    private isValidLastUsedPlayer(cardInfo: CardInfo, account: string) {
        return !(cardInfo.last_used_player !== account && moment(cardInfo.last_used_date).isAfter(moment().subtract(1, 'day')));
    }

}


// const fetch = require("node-fetch");
// const basicCards = require('./data/basicCards'); //phantom cards available for the players but not visible in the api endpoint

// getPlayerCards = (username, oneDayAgo) => (fetch(`https://game-api.splinterlands.io/cards/collection/${username}`,
//   { "credentials": "omit", "headers": { "accept": "application/json, text/javascript, */*; q=0.01" }, "referrer": `https://splinterlands.com/?p=collection&a=${username}`, "referrerPolicy": "no-referrer-when-downgrade", "body": null, "method": "GET", "mode": "cors" })
//   .then(x => x && x.json())
//   .then(x => x['cards'] ? x['cards'].filter(x=>(x.delegated_to === null || x.delegated_to === username)
//   && (x.market_listing_type === null || x.delegated_to === username)
//   && (!(x.last_used_player !== username && Date.parse(x.last_used_date) > oneDayAgo))).map(card => card.card_detail_id) : '')
//   .then(advanced => basicCards.concat(advanced))
//    .catch(e=> {
//     console.log('Error: game-api.splinterlands did not respond trying api.slinterlands... ');
//     fetch(`https://api.splinterlands.io/cards/collection/${username}`,
//       { "credentials": "omit", "headers": { "accept": "application/json, text/javascript, */*; q=0.01" }, "referrer": `https://splinterlands.com/?p=collection&a=${username}`, "referrerPolicy": "no-referrer-when-downgrade", "body": null, "method": "GET", "mode": "cors" })
//       .then(x => x && x.json())
//       .then(x => x['cards'] ? x['cards'].filter(x=>(x.delegated_to === null || x.delegated_to === username)
// 	  && (x.market_listing_type === null || x.delegated_to === username)
// 	  && (!(x.last_used_player !== username && Date.parse(x.last_used_date) > oneDayAgo))).map(card => card.card_detail_id) : '')
//       .then(advanced => basicCards.concat(advanced))
//       .catch(e => {
//         console.log('Using only basic cards due to error when getting user collection from splinterlands: ',e);
//         return basicCards
//       })
//   })
// )

// module.exports.getPlayerCards = getPlayerCards;
