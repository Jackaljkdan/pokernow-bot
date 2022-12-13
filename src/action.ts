import { allInRaise, call, canCheck, check, fold, halfPotRaise, minRaise, potRaise, tqPotRaise } from "./ui";

export function performAction(action: Action) {
    if (action.type === "check_or_fold") {
        if (canCheck())
            check();
        else
            fold();
    }
    else if (action.type === "call") {
        call();
    }
    else {
        switch (action.raiseAmount) {
            case "min":
                minRaise();
                break;
            case "1/2_pot":
                halfPotRaise();
                break;
            case "3/4_pot":
                tqPotRaise();
                break;
            case "pot":
                potRaise();
                break;
            // TODO: overbet
            case "all_in":
                allInRaise();
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
            case "3/4_pot":
            case "pot":
            case "overbet":
            case "all_in":
                // ok, no problem here
            default:
                sanitized.raiseAmount = "min";
                break;
        }
    }

    return sanitized;
}
