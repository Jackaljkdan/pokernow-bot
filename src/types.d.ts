type ActionType = "check_or_fold" | "call" | "raise";

type Action = {
    type: ActionType,
    raiseAmount?: number,
};

type ChromeMessage = "start_bot" | "kill_bot" | "get_bot_status";

type BotStatus = "playing" | "off";

type CardValueCode = 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0;
type CardValueName = "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2";
type CardSuit = "c" | "s" | "d" | "h";

type Card = {
    valueName: CardValueName,
    valueCode: CardValueCode,
    suit: CardSuit,
};

type PhaseName = "preflop" | "flop" | "turn" | "river";
type PhaseCode = 0 | 1 | 2 | 3;

type Phase = {
    name: PhaseName,
    code: PhaseCode,
};

type State = {
    hand: Card[],
    board: Card[],
    bigBlind: number,
    toCall: number,
};
