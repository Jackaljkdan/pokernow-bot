import { getAction } from "./ai";
import { isMyTurn, performAction, sanitizeAction } from "./utils";


console.log("hello this is main.ts speaking");

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
