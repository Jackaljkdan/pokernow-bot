
export function isMyTurn() {
    return document.querySelector(".action-signal") !== null;
}

export function getBigBlindValue() {
    return parseInt(document.querySelectorAll(".blind-value .chips-value")[1].textContent ?? "");
}

export function performAction(action: Action) {

}

export function sanitizeAction(action: Action) {
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
            sanitized.raiseAmount = getBigBlindValue();
    }

    return sanitized;
}
