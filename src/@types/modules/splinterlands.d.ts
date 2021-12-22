export type ManaCap = number;

export type Rules = string;

export type Splinters = Array<string>

export type Cards = Array<number>

export interface Quest {
    name: string;
    element: string;
    total: number;
    completed: number;
}

export interface CardInfoResponse {
    'card_detail_id': number;
    'delegated_to'?: string;
    'market_listing_type'?: string;
    'last_used_player'?: string;
    'last_used_date'?: string;
}
export interface CardsCollectionResponse {
    player: string;
    cards: CardInfoResponse[];
}

export interface QuestPlayerResponse {
     id: string;
     player: string;
     name: string;
     'total_items': number;
     'completed_items': number;
}

export interface BattleHistoryCardDetailResponse {
    'card_detail_id': number;
    abilities: Array<string>;
    level: number;
    gold: boolean;
    state: {
        abilities: Array<string>
    }
}

export interface BattleHistoryTeamResponse {
    monsters: Array<BattleHistoryCardDetailResponse>;
    summoner: BattleHistoryCardDetailResponse;
}

export interface BattleHistoryDetailResponse {
    team1: BattleHistoryTeamResponse;
    team2: BattleHistoryTeamResponse;
    type: string;
}

export interface BattleHistoryInfoResponse {
    'ruleset': string;
    'mana_cap': number;
    'match_type': string;
    'inactive': string;
    'details': string;
    'created_date': string;
    'winner': string;
    'player_1': string;
    'player_2': string;
    'battle_queue_id_1': string;
    'player_1_rating_initial': number;
    'player_1_rating_final': number;
    'battle_queue_id_2': string;
    'player_2_rating_initial': number;
    'player_2_rating_final': number;
}

export interface BattleHistoryResponse {
    player: string;
    battles: Array<BattleHistoryInfoResponse>
}
