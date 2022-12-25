import { FlushRank, FullHouseRank, HighCardRank, PairRank, StraightRank, ThreeOfKindRank, TwoPairRank } from "../../rank";
import { PreflopPhase } from "../../state";
import { flushAction } from "./flushAction";
import { bestHandAction, bluffHandAction } from "./handActions";
import { highCardAction } from "./highCardAction";
import { pairAction } from "./pairAction";
import { preflopAction } from "./preflopActions";
import { straightAction } from "./straightAction";
import { threeAction } from "./threeAction";
import { twoPairAction } from "./twoPairAction";


export function ifThenElseAction(state: State): Action {
    if (state.phase === PreflopPhase)
        return preflopAction(state);
    else if (state.handRank.code >= FullHouseRank.code)
        return bestHandAction(state);

    switch (state.handRank) {
        case HighCardRank:
            return highCardAction(state);
        case PairRank:
            return pairAction(state);
        case TwoPairRank:
            return twoPairAction(state);
        case ThreeOfKindRank:
            return threeAction(state);
        case StraightRank:
            return straightAction(state);
        case FlushRank:
            return flushAction(state);
        default:
            return bluffHandAction(state);
    }
}
