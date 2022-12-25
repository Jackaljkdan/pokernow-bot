import { AceCode } from "../cards";
import { findBestGapStraight, isOneCardStraightPossible } from "./aiUtils";

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

console.log("A234 straight tests", {
    cards,
    oneCardStraight: isOneCardStraightPossible(cards),
    gap: findBestGapStraight(cards),
});


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
    {
        suit: "c",
        value: {
            name: "5",
            code: 5,
        },
    },
];

console.log("best gap test", {
    cards,
    gap: findBestGapStraight(cards),
});
