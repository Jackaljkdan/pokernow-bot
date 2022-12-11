import { canCheck, check, fold } from "./ui";

export function performAction(action: Action) {
    if (action.type === "CheckOrFold") {
        if (canCheck())
            check();
        else
            fold();
    }
}

export function sanitizeAction(action: Action, state: State) {
    let sanitized = {...action};

    switch (sanitized.type) {
        case "Call":
        case "CheckOrFold":
        case "Raise":
            // ok, no problem here
            break;
        default:
            sanitized.type = "CheckOrFold";
    }

    if (sanitized.type === "Raise") {
        if (sanitized.raiseAmount == undefined || sanitized.raiseAmount <= 0)
            sanitized.raiseAmount = state.bigBlind;
    }

    return sanitized;
}
