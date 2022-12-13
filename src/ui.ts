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

export function getBoardCards() {
    const cards = [...document.querySelectorAll(".table-cards .card")];

    try {
        return cards.map(parseCard);
    }
    catch (err) {
        throw new Error("error parsing board cards: " + err);
    }
}

export function getBigBlindValue() {
    return parseInt(document.querySelectorAll(".blind-value .chips-value")[1].textContent ?? "");
}

export function getToCallValue() {
    const callText = document.querySelector("button.call")?.textContent;

    if (!callText)
        return 0;

    if (!callText.toLowerCase().indexOf("call"))
        return 0;

    if (callText.indexOf(" ") < 0)
        return 0;

    return parseInt(callText.split(" ")[1]);
}

export function getState(): State {
    return {
        hand: getHandCards(),
        board: getBoardCards(),
        bigBlind: getBigBlindValue(),
        toCall: getToCallValue(),
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

export function call() {
    document.querySelector<HTMLButtonElement>("button.call")?.click();
}

function withRaiseMenu(action: () => void) {
    document.querySelector<HTMLButtonElement>("button.raise")?.click();
    setTimeout(
        () => {
            action();
            document.querySelector<HTMLButtonElement>('.raise-controller-form input[type="submit"]')?.click();
        },
        100,
    );
}

export function minRaise(callback: () => void) {
    withRaiseMenu(() => {
        document.querySelectorAll<HTMLButtonElement>(".default-bet-buttons button")[0].click();
        callback?.();
    });
}

export function halfPotRaise(callback: () => void) {
    withRaiseMenu(() => {
        document.querySelectorAll<HTMLButtonElement>(".default-bet-buttons button")[1].click();
        callback?.();
    });
}

export function tqPotRaise(callback: () => void) {
    withRaiseMenu(() => {
        document.querySelectorAll<HTMLButtonElement>(".default-bet-buttons button")[2].click();
        callback?.();
    });
}

export function potRaise(callback: () => void) {
    withRaiseMenu(() => {
        document.querySelectorAll<HTMLButtonElement>(".default-bet-buttons button")[3].click();
        callback?.();
    });
}

export function allInRaise(callback: () => void) {
    withRaiseMenu(() => {
        document.querySelectorAll<HTMLButtonElement>(".default-bet-buttons button")[4].click();
        callback?.();
    });
}
