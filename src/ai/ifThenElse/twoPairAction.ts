import { getPairs, isOneCardFlushOrStraightPossible } from "../aiUtils";
import { strongHandAction, weakHandAction } from "./handActions";
import { highCardAction } from "./highCardAction";
import { pairActionIgnoringBoardPair } from "./pairAction";


export function twoPairAction(state: State): Action {
    const boardPairs = getPairs(state.board);
    
    if (boardPairs.length !== 0) {
        if (boardPairs.length == 1)
            return pairActionIgnoringBoardPair(state);
        else
            return highCardAction(state);
    }

    if (isOneCardFlushOrStraightPossible(state.board))
        return weakHandAction(state);

    return strongHandAction(state);
}
