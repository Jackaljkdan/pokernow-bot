import { FullHouseRank, HighCardRank } from "../../rank";
import { PreflopPhase } from "../../state";
import { bestHandAction, bluffHandAction } from "./handActions";
import { highCardAction } from "./highCardAction";
import { preflopAction } from "./preflopActions";


export function ifThenElseAction(state: State): Action {
    if (state.phase === PreflopPhase)
        return preflopAction(state);
    else if (state.handRank.code >= FullHouseRank.code)
        return bestHandAction(state);

    switch (state.handRank) {
        case HighCardRank:
            return highCardAction(state);
        default:
            return bluffHandAction(state);
    }   
}
