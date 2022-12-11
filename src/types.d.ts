type ActionType = "CheckOrFold" | "Call" | "Raise";

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

type State = {
    hand: Card[],
    board: Card[],
    bigBlind: number,
};
