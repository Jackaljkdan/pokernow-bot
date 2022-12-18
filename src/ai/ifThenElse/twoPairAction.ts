import { getPairs, isOneCardFlushOrStraightPossible } from "../aiUtils";
import { strongHandAction, weakHandAction } from "./handActions";


export function twoPairAction(state: State): Action {
    const boardPairs = getPairs(state.board);
    
    if (boardPairs.length !== 0) {
        // TODO: tratta diversamente
    }

    if (isOneCardFlushOrStraightPossible(state.board))
        return weakHandAction(state);

    return strongHandAction(state);
}
