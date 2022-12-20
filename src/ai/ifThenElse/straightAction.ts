import { isOneCardFlushPossible } from "../aiUtils";
import { strongHandAction, weakHandAction } from "./handActions";

export function straightAction(state: State): Action {
    // TODO: se c'è una scala migliore allora risky action

    if (isOneCardFlushPossible(state.board))
        return weakHandAction(state);
    
    return strongHandAction(state);
}
