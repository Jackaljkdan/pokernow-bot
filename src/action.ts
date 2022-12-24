import { allInRaise, call, canCheck, check, fold, halfPotRaise, minRaise, potRaise, tqPotRaise } from "./ui";

export function performAction(action: Action, callback: () => void) {
    if (action.type === "check_or_fold") {
        if (canCheck())
            check();
        else
            fold();

        callback?.();
    }
    else if (action.type === "call") {
        call();
        callback?.();
    }
    else {
        switch (action.raiseAmount) {
            case "min":
            default:
                minRaise(callback);
                break;
            case "1/2_pot":
                halfPotRaise(callback);
                break;
            // TODO: usare 3/4 pot?
            // case "3/4_pot":
            //     tqPotRaise(callback);
            //     break;
            case "pot":
                potRaise(callback);
                break;
            // TODO: usare overbet?
            case "all_in":
                allInRaise(callback);
                break;
        }
    }
}

export function sanitizeAction(action: Action | undefined, state: State) {
    let sanitized = {...action!};

    switch (sanitized.type) {
        case "check_or_fold":
        case "call":
        case "raise":
            // ok, no problem here
            break;
        default:
            sanitized.type = "check_or_fold";
            break;
    }

    if (sanitized.type === "raise") {
        switch (sanitized.raiseAmount) {
            case "min":
            case "1/2_pot":
            // case "3/4_pot":
            case "pot":
            // case "overbet":
            case "all_in":
                // ok, no problem here
                break;
            default:
                sanitized.raiseAmount = "min";
                break;
        }
    }

    return sanitized;
}
