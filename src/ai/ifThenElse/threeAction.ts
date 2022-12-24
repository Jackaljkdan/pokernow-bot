import { AceCode, KingCode } from "../../cards";
import { RiverPhase } from "../../state";
import { getHighestCard, getPairs, getTriplets, hasFlushDrawOrOpenEndedStraight, isOneCardFlushOrStraightPossible } from "../aiUtils";
import { bestHandAction, riskyHandAction, strongHandAction } from "./handActions";
import { highCardAction } from "./highCardAction";


export function threeAction(state: State): Action {
    const threes = getTriplets(state.board);
    
    if (threes.length !== 0) {
        const kicker = getHighestCard(state.hand)!;
        if (kicker.value.code === AceCode)
            return bestHandAction(state);
        else if (kicker.value.code === KingCode)
            return strongHandAction(state);
        else
            return highCardAction(state);
    }

    if (isOneCardFlushOrStraightPossible(state.board))
        return riskyHandAction(state);

    const boardPair = getPairs(state.board)[0];
    const isSet = !boardPair;

    if (isSet) {
        console.log("three state", {
            isSet,
        });
        
        return strongHandAction(state);
    }

    const kicker = boardPair[0].value.code === state.hand[0].value.code
        ? state.hand[1]
        : state.hand[0]
    ;

    console.log("three state", {
        isSet,
        kicker,
    });

    if (kicker.value.code >= KingCode)
        return strongHandAction(state);
    
    if (state.phase.code <= RiverPhase.code) {
        if (hasFlushDrawOrOpenEndedStraight(state.handPlusBoard))
            return strongHandAction(state);
    }

    return riskyHandAction(state);
}
