import { getAction } from "./ai";
import { isMyTurn, performAction, sanitizeAction } from "./utils";


setInterval(
    function mainLoop() {
        if (isMyTurn()) {
            let action = getAction();
            let sanitizedAction = sanitizeAction(action);
            performAction(sanitizedAction);
        }
    },
    500,
);
