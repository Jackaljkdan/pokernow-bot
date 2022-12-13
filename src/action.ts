import { canCheck, check, fold } from "./ui";

export function performAction(action: Action) {
    if (action.type === "check_or_fold") {
        if (canCheck())
            check();
        else
            fold();
    }
}

export function sanitizeAction(action: Action | undefined, state: State) {
    let sanitized = {...action};

    switch (sanitized.type) {
        case "call":
        case "check_or_fold":
        case "raise":
            // ok, no problem here
            break;
        default:
            sanitized.type = "check_or_fold";
    }

    if (sanitized.type === "raise") {
        if (sanitized.raiseAmount == undefined || sanitized.raiseAmount <= 0)
            sanitized.raiseAmount = state.bigBlind;
    }

    return sanitized;
}
