export type ManaCap = number;

export type Rules = Array<string>

export type Splinters = Array<string>

export type Cards = Array<number>

export interface Quest {
    name: string;
    element: string;
    total: number;
    completed: number;
}
