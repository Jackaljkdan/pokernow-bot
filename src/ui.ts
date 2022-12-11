import { AceCode, cardValueCodeFromName, isCardValueCodeValid } from "./cards";

export function isMyTurn() {
    return document.querySelector(".action-signal") !== null;
}

export function parseCard(element: Element): Card {
    if (!element)
        throw new Error("can't parse card from null element");

    const rawValue = element.querySelector(".value")?.textContent;
    const rawSuit = element.querySelector(".suit")?.textContent;

    if (!rawValue || !rawSuit)
        throw new Error("can't find value or suit in card element");

    const valueName = rawValue as CardValueName;
    const valueCode = cardValueCodeFromName(valueName);

    if (!isCardValueCodeValid(valueCode))
        throw new Error("invalid card value code: " + rawValue);

    return {
        valueName,
        valueCode,
        suit: rawSuit as CardSuit,
    };
}

export function getHandCards() {
    const cards = document.querySelectorAll(".you-player .card");

    try {
        const firstCard = parseCard(cards[0]);
        const secondCard = parseCard(cards[1]);
        return [firstCard, secondCard];
    }
    catch (err) {
        throw new Error("error parsing hand cards: " + err);
    }
}

export function getBigBlindValue() {
    return parseInt(document.querySelectorAll(".blind-value .chips-value")[1].textContent ?? "");
}

export function getState(): State {
    return {
        hand: getHandCards(),
        board: [],
        bigBlind: getBigBlindValue(),
    };
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
