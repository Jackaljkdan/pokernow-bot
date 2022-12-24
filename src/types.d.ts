type ActionType = "check_or_fold" | "call" | "raise";
// type RaiseAmount = "min" | "1/2_pot" | "3/4_pot" | "pot" | "overbet" | "all_in";
type RaiseAmount = "min" | "1/2_pot" | "pot" | "all_in";

type Action = {
    type: ActionType,
    raiseAmount?: RaiseAmount,
};

type ChromeMessage = "start_bot" | "kill_bot" | "get_bot_status";

type BotStatus = "playing" | "off";

type CardValueCode = 14 | 13 | 12 | 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0;
type CardValueName = "A" | "K" | "Q" | "J" | "10" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2";
type CardSuit = "c" | "s" | "d" | "h";

/**
 * Ace, King, ...
 * 
 * Use .code for everything, in cards.ts you can find constants like AceCode, KingCode, ...
 * Aces have the highest code, while the 2 cards have the lowest code (literally 2)
 */
type CardValue = {
    /**
     * Human readable name, useful for debugging
     */
    name: CardValueName,
    /**
     * Numerical code, useful for checking if a card has higher value than another.
     * 
     * Number cards have a code equal to their value (e.g. five has .code === 5),
     * for face cards and aces use the constants AceCode, KingCode, ...
     */
    code: CardValueCode,
}

type Card = {
    value: CardValue,
    suit: CardSuit,
};

type HandRankName = "high" | "pair" | "two_pair" | "three" | "straight" | "flush" | "full" | "four" | "straight_flush" | "royal_flush";
type HandRankCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * High card, pair, ... 
 * 
 * You can test for equality against the ranks you find in rank.ts.
 * If you need to test if a rank is higher than another use .code.
 */
type HandRank = {
    /**
     * Human readable name, useful for debugging
     */
    name: HandRankName,
    /**
     * Numerical code, useful for checking if rank is higher than another.
     */
    code: HandRankCode,
};

type PhaseName = "preflop" | "flop" | "turn" | "river";
type PhaseCode = 0 | 1 | 2 | 3;

/**
 * Preflop, flop, ...
 * 
 * You can test for equality against the phases you find in state.ts.
 * Use .code to check if a phase comes before/after another.
 * 
 * @example if (phase.code < RiverPhase.code) ...
 */
type Phase = {
    /**
     * Human readable name, useful for debugging
     */
    name: PhaseName,
    /**
     * Numerical code, useful for checking phase ordering.
     * Preflop has the lowest .code, while River the highest.
     */
    code: PhaseCode,
};

type State = {
    /**
     * Preflop, flop, ...
     * 
     * You can test for equality against the phases you find in state.ts.
     * Use .code to check if a phase comes before/after another.
     * 
     * @example if (phase.code < RiverPhase.code) ...
     */
    phase: Phase,
    /**
     * High card, pair, ... 
     * 
     * You can test for equality against the ranks you find in rank.ts.
     * If you need to test if a rank is higher than another use .code.
     */
    handRank: HandRank,
    /**
     * Your hole cards
     */
    hand: Card[],
    /**
     * The common cards on the board
     */
    board: Card[],
    /**
     * Your cards and the board cards in a single list for convenience
     */
    handPlusBoard: Card[],
    /**
     * Big blind value
     */
    bigBlind: number,
    /**
     * The amount of your chips
     */
    stack: number,
    /**
     * Total pot including the bets of the current phase
     */
    pot: number,
    /**
     * Pot up to the previous phase, excluding bets of the current phase.
     * This is zero in the preflop phase, the sum of the preflop bets in the flop phase, ...
     */
    prevPhasePot: number,
    /**
     * The amount of chips you need to call. Zero if you go first or if the opponent checked.
     */
    toCall: number,
};
