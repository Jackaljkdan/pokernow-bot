import { isOneCardFlushPossible } from "../aiUtils";
import { strongHandAction, weakHandAction } from "./handActions";

export function straightAction(state: State): Action {
    if (isOneCardFlushPossible(state.board))
        return weakHandAction(state);

    // TODO: se c'è una scala migliore allora risky action
    
    return strongHandAction(state);
}
