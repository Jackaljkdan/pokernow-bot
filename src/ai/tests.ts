import { AceCode } from "../cards";
import { findBestGapStraight, isOneCardStraightPossible, removeSortedDuplicateValuesInPlace } from "./aiUtils";

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


const _23445: Card[] = [
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
            name: "3",
            code: 3,
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
            name: "4",
            code: 4,
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

const _234445: Card[] = [
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
            name: "3",
            code: 3,
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
            name: "4",
            code: 4,
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
            name: "5",
            code: 5,
        },
    },
];

const _2344455: Card[] = [
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
            name: "3",
            code: 3,
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
            name: "4",
            code: 4,
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
            name: "5",
            code: 5,
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

console.log("remove duplicates", {
    first: _23445,
    firstRemoved: removeSortedDuplicateValuesInPlace([..._23445]),
    second: _234445,
    secondRemoved: removeSortedDuplicateValuesInPlace([..._234445]),
    third: _2344455,
    thirdRemoved: removeSortedDuplicateValuesInPlace([..._2344455]),
});


console.log("duplicate values straight", {
    _23445,
    gap: findBestGapStraight(_23445),
});

