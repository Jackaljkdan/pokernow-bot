import { FlopPhase, RiverPhase } from "../../state";
import { hasFlushDrawOrOpenEndedStraight } from "../aiUtils";
import { bluffHandAction, riskyHandAction, strongHandAction, weakHandAction } from "./handActions";


export function highCardAction(state: State): Action {
    if (state.phase.code < RiverPhase.code) {
        if (hasFlushDrawOrOpenEndedStraight(state.handPlusBoard)) {
            if (state.phase === FlopPhase)
                return strongHandAction(state);
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
