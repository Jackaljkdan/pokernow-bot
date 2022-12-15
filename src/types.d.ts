type ActionType = "check_or_fold" | "call" | "raise";
type RaiseAmount = "min" | "1/2_pot" | "3/4_pot" | "pot" | "overbet" | "all_in";

type Action = {
    type: ActionType,
    raiseAmount?: RaiseAmount,
};

type ChromeMessage = "start_bot" | "kill_bot" | "get_bot_status";

type BotStatus = "playing" | "off";

type CardValueCode = 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0;
type CardValueName = "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2";
type CardSuit = "c" | "s" | "d" | "h";

type CardValue = {
    name: CardValueName,
    code: CardValueCode,
}

type Card = {
    value: CardValue,
    suit: CardSuit,
};

type HandRankName = "high" | "pair" | "two_pair" | "three" | "straight" | "flush" | "full" | "four" | "straight_flush" | "royal_flush";
type HandRankCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type HandRank = {
    name: HandRankName,
    code: HandRankCode,
};

type PhaseName = "preflop" | "flop" | "turn" | "river";
type PhaseCode = 0 | 1 | 2 | 3;

type Phase = {
    name: PhaseName,
    code: PhaseCode,
};

type State = {
    phase: Phase,
    handRank: HandRank,
    hand: Card[],
    board: Card[],
    handPlusBoard: Card[],
    bigBlind: number,
    toCall: number,
};
