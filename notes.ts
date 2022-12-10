
type CardValue = "A" | "K" | "Q" | "J" | "10"
type CardSuit = "c" | "s" | "d" | "h"

type Card = {
    value: CardValue;
    suit: CardSuit;
}

// card value
document.querySelectorAll(".you-player .card .value")[0].textContent;

// card suit
document.querySelectorAll(".you-player .card .suit")[0].textContent;


// it is my turn
document.querySelector(".action-signal") !== null;

// pot size (excluding this phase)
document.querySelector(".table-pot-size .main-value .chips-value")?.textContent;

// big blind value
document.querySelectorAll(".blind-value .chips-value")[1].textContent;

// current phase pot
document.querySelector(".table-pot-size .add-on .chips-value")?.textContent;

// call or min bet
(document.querySelector("button.call") as HTMLButtonElement)?.click();

// check
(document.querySelector("button.check") as HTMLButtonElement)?.click();

// cannot check
(document.querySelector("button.check") as HTMLButtonElement).disabled;

// fold
document.querySelector("button.fold").click();

// open raise form
(document.querySelector("button.raise") as HTMLButtonElement)?.click();
// get raise value (contains min bet at first)
(document.querySelector(".raise-bet-value input") as HTMLInputElement).value;
// increment raise by one big blind
document.querySelector(".raise-controller .increase").click();
// confirm raise
document.querySelector('.raise-controller-form input[type="submit"]').click();


