import { isPhaseBefore, RiverPhase } from "../../state";
import { probabilisticAction, postfixNameToCall, toCallDependent, uniformFill, zeroFill, checkCallBased } from "../probabilisticAction";


export function bestHandAction(state: State): Action {
    return probabilisticAction(postfixNameToCall("best", state), state, uniformFill({
        checkFoldProbability: state.toCall === 0 && isPhaseBefore(state.phase, RiverPhase)
            ? undefined
            : 0
        ,
        minRaiseProbability: 0.3,
        halfPotRaiseProbability: 0.25,
        potRaiseProbability : 0.15,
        allInProbability: 0.05,
    }));
}

export function strongHandAction(state: State): Action {
    return probabilisticAction(postfixNameToCall("strong", state), state, toCallDependent(state, {
        zero: {
            checkFoldProbability: 0.3,
            minRaiseProbability: 0.3,
            halfPotRaiseProbability: 0.25,
            potRaiseProbability : 0.12,
            allInProbability: 0.03,
        },
        nonZero: checkCallBased({
            checkFoldProbability: Math.min(0.1 * (state.toCall / state.prevPhasePot), 0.15),
            callProbability: Math.min(0.5 * (state.toCall / state.prevPhasePot), 0.75),
            remainingMinRaiseShare: 0.4,
            remainingHalfPotRaiseShare: 0.33,
            remainingPotRaiseShare: 0.24,
            remainingAllInShare: 0.03,
        }),
    }));
}

export function riskyHandAction(state: State): Action {
    return probabilisticAction(postfixNameToCall("risky", state), state, toCallDependent(state, {
        zero: {
            checkFoldProbability: 0.5,
            minRaiseProbability: 0.22,
            halfPotRaiseProbability: 0.17,
            potRaiseProbability : 0.09,
            allInProbability: 0.02,
        },
        nonZero: checkCallBased({
            checkFoldProbability: Math.min(0.4 * (state.toCall / state.prevPhasePot), 0.35),
            callProbability: Math.min(1.1 * (state.toCall / state.prevPhasePot), 0.55),
            remainingMinRaiseShare: 0.4,
            remainingHalfPotRaiseShare: 0.33,
            remainingPotRaiseShare: 0.24,
            remainingAllInShare: 0.03,
        }),
    }));
}

export function weakHandAction(state: State): Action {
    return probabilisticAction(postfixNameToCall("weak", state), state, toCallDependent(state, {
        zero: {
            checkFoldProbability: 0.7,
            minRaiseProbability: 0.05,
            halfPotRaiseProbability: 0.11,
            potRaiseProbability : 0.13,
            allInProbability: 0.01,
        },
        nonZero: checkCallBased({
            checkFoldProbability: Math.min(2 * (state.toCall / state.prevPhasePot), 0.7),
            callProbability: (1 - (state.toCall / state.prevPhasePot)) * 0.05,
            remainingMinRaiseShare: 0.05,
            remainingHalfPotRaiseShare: 0.4,
            remainingPotRaiseShare: 0.45,
            remainingAllInShare: 0.1,
        }),
    }));
}

export function bluffHandAction(state: State): Action {
    return probabilisticAction(postfixNameToCall("bluff", state), state, toCallDependent(state, {
        zero: {
            checkFoldProbability: 0.9,
            minRaiseProbability: 0.02,
            halfPotRaiseProbability: 0.01,
            potRaiseProbability : 0.02,
            allInProbability: 0.02,
        },
        nonZero: checkCallBased({
            checkFoldProbability: Math.min(2 * (state.toCall / state.prevPhasePot), 0.95),
            callProbability: 0,
            remainingMinRaiseShare: 0.02,
            remainingHalfPotRaiseShare: 0.32,
            remainingPotRaiseShare: 0.63,
            remainingAllInShare: 0.03,
        }),
    }));
}
