
export function isMyTurn() {
    return document.querySelector(".action-signal") !== null;
}

export function getBigBlindValue() {
    return parseInt(document.querySelectorAll(".blind-value .chips-value")[1].textContent ?? "");
}

export function canCheck() {
    return !document.querySelector<HTMLButtonElement>("button.check")?.disabled;
}

export function check() {
    document.querySelector<HTMLButtonElement>("button.check")?.click();
}

export function fold() {
    document.querySelector<HTMLButtonElement>("button.fold")?.click();
}
