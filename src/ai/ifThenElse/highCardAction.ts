import { FlopPhase, RiverPhase } from "../../state";
import { hasFlushDrawOrOpenEndedStraight, isOneCardFlushPossible, isOneCardStraightPossible, isOpenEndedStraightPresent } from "../aiUtils";
import { bluffHandAction, riskyHandAction, weakHandAction } from "./handActions";


export function highCardAction(state: State): Action {
    console.log("high card hand state", {
        flushDraw: isOneCardFlushPossible(state.handPlusBoard),
        openStraight: isOpenEndedStraightPresent(state.handPlusBoard),
        oneCardFlush: isOneCardFlushPossible(state.board),
        oneCardStraight: isOneCardStraightPossible(state.board),
    });
    
    if (state.phase.code < RiverPhase.code) {
        if (hasFlushDrawOrOpenEndedStraight(state.handPlusBoard)) {
            if (state.phase === FlopPhase)
                return riskyHandAction(state);
            else  // turn
                return weakHandAction(state);
        }
        else {
            return bluffHandAction(state);
        }
    }
    else {  // river
        // TODO: se l'avversario ha solo checkato raise more likely
        return bluffHandAction(state);
    }
}
