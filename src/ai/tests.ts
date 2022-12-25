import { AceCode } from "../cards";
import { isOneCardStraightPossible } from "./aiUtils";

let cards: Card[];

cards = [
    {
        suit: "c",
        value: {
            name: "2",
            code: 2,
        },
    },
    {
        suit: "c",
        value: {
            name: "4",
            code: 4,
        },
    },
    {
        suit: "c",
        value: {
            name: "3",
            code: 3,
        },
    },
    {
        suit: "c",
        value: {
            name: "A",
            code: AceCode,
        },
    },
];

console.log("one card straight", {
    cards,
    oneCardStraight: isOneCardStraightPossible(cards),
});
