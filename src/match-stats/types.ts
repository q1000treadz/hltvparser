export type IParseMatchPageMap = {
    map: string;
    team1: string;
    team2: string;
    score1: number;
    score2: number;
};

export type IParseMatchPagePlayer = {
    name:string;
    kills:number;
    deaths:number;
    diff:number;
    adr:number;
    kast:string;
    rating: number;
};

export type IParseMatchPage = {
    maps: Array<IParseMatchPageMap>;
    players: Array<IParseMatchPagePlayer>;
};
