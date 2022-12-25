import { findBestGapStraight, findBestStraight, isOneCardFlushPossible, isOneCardStraightPossible } from "../aiUtils";
import { riskyHandAction, strongHandAction, weakHandAction } from "./handActions";

export function straightAction(state: State): Action {
    if (isOneCardFlushPossible(state.board))
        return weakHandAction(state);

    const myStraight = findBestStraight(state.handPlusBoard)!;
    const bestGapStraight = findBestGapStraight(state.board);

    if (bestGapStraight !== null && myStraight.min.value.code < bestGapStraight.firstPiece.min.value.code)
        return riskyHandAction(state);
    
    return strongHandAction(state);
}
