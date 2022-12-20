import { AceCode, JackCode, QueenCode } from "../../cards";
import { getHighestCard, getLowestCard } from "../aiUtils";
import { lerp } from "../lerp";
import { checkCallBased, postfixNameToCall, probabilisticAction, toCallDependent, uniformFill } from "../probabilisticAction";
import { bestHandAction } from "./handActions";


export function preflopAction(state: State): Action {
    const hasPair = state.hand[0].value.code === state.hand[1].value.code;

    if (hasPair)
        return pairPreflopAction(state);
    else
        return nonPairPreflopAction(state);
}

function pairPreflopAction(state: State): Action {
    const valueCode = state.hand[0].value.code;

    if (valueCode == AceCode)
        return bestHandAction(state);
    
    if (valueCode >= 10)
        return highPairAction(state);

    const ninesCheckOrFoldProbability = 0.05;
    const twosCheckOrFoldProbability = 0.8;

    return probabilisticAction("pre-lowpair", state, uniformFill({
        checkFoldProbability: lerp(twosCheckOrFoldProbability, ninesCheckOrFoldProbability, (valueCode - 2) / 9),
        halfPotRaiseProbability: 0,
        allInProbability: 0,
    }));
}

function nonPairPreflopAction(state: State): Action {
    const highestCard = getHighestCard(state.hand)!;
    const lowestCard = getLowestCard(state.hand)!;

    if (lowestCard.value.code >= QueenCode)
        return premiumNonPairAction(state);

    if (lowestCard.value.code >= 10)
        return semiHighNonPairAction(state);
    
    const delta = highestCard.value.code - lowestCard.value.code;

    // TODO: differenziare ulteriormente, le mani con l'asso non sono così bluffose per dire
    if (delta >= 5)
        return trashAction(state);

    if (highestCard.value.code >= JackCode)
        return faceAction(state);

    return trashAction(state);
}

function highPairAction(state: State): Action {
    return probabilisticAction(postfixNameToCall("pre-highpair", state), state, toCallDependent(state, {
        zero: {
            checkFoldProbability: 0,
            minRaiseProbability: 0.5,
            halfPotRaiseProbability: 0,
            potRaiseProbability : 0.5,
            allInProbability: 0,
        },
        nonZero: checkCallBased({
            checkFoldProbability: 0,
            callProbability: state.toCall >= 3 * state.bigBlind ? 0.5 : 0,
            remainingMinRaiseShare: 0.5,
            remainingHalfPotRaiseShare: 0,
            remainingPotRaiseShare: 0.5,
            remainingAllInShare: 0,
        }),
    }));
}

function premiumNonPairAction(state: State): Action {
    return probabilisticAction(postfixNameToCall("pre-high-nonpair", state), state, toCallDependent(state, {
        zero: {
            checkFoldProbability: 0,
            minRaiseProbability: 0.6,
            halfPotRaiseProbability: 0,
            potRaiseProbability : 0.4,
            allInProbability: 0,
        },
        nonZero: checkCallBased({
            checkFoldProbability: 0,
            callProbability: state.toCall >= 3 * state.bigBlind ? 0.5 : 0,
            remainingMinRaiseShare: 0.7,
            remainingHalfPotRaiseShare: 0,
            remainingPotRaiseShare: 0.3,
            remainingAllInShare: 0,
        }),
    }));
}

function semiHighNonPairAction(state: State): Action {
    return probabilisticAction(postfixNameToCall("pre-semihigh-nonpair", state), state, toCallDependent(state, {
        zero: {
            checkFoldProbability: 0,
            minRaiseProbability: 0.8,
            halfPotRaiseProbability: 0,
            potRaiseProbability : 0.2,
            allInProbability: 0,
        },
        nonZero: checkCallBased({
            checkFoldProbability: 0,
            callProbability: state.toCall >= 3 * state.bigBlind ? 0.7 : 0,
            remainingMinRaiseShare: 0.8,
            remainingHalfPotRaiseShare: 0,
            remainingPotRaiseShare: 0.2,
            remainingAllInShare: 0,
        }),
    }));
}

function trashAction(state: State): Action {
    return probabilisticAction(postfixNameToCall("pre-trash", state), state, toCallDependent(state, {
        zero: {
            checkFoldProbability: 0.98,
            minRaiseProbability: 0,
            halfPotRaiseProbability: 0,
            potRaiseProbability : 0,
            allInProbability: 0.02,
        },
        nonZero: checkCallBased({
            checkFoldProbability: 0.85,
            callProbability: state.toCall <= 3 * state.bigBlind ? 0.07 : 0,
            remainingMinRaiseShare: state.toCall < 3 * state.bigBlind ? 0.06 : 0,
            remainingHalfPotRaiseShare: 0,
            remainingPotRaiseShare: state.toCall >= 3 * state.bigBlind ? 0.13 : 0,
            remainingAllInShare: 0.02,
        }),
    }));
}

function faceAction(state: State): Action {
    return probabilisticAction(postfixNameToCall("pre-face", state), state, toCallDependent(state, {
        zero: {
            checkFoldProbability: 0.7,
            minRaiseProbability: 0.2,
            halfPotRaiseProbability: 0.1,
            potRaiseProbability : 0,
            allInProbability: 0,
        },
        nonZero: checkCallBased({
            checkFoldProbability: 0.6,
            callProbability: state.toCall > state.bigBlind && state.toCall <= 4 * state.bigBlind ? 0.2 : 0,
            remainingMinRaiseShare: state.toCall <= 4 * state.bigBlind ? 0.2 : 0,
            remainingHalfPotRaiseShare: 0,
            remainingPotRaiseShare: 0,
            remainingAllInShare: 0,
        }),
    }));
}
