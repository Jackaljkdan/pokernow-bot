import { RiverPhase } from "../../state";
import { probabilisticAction, postfixNameToCall, toCallDependent, uniformFill, zeroFill, checkCallBased } from "../probabilisticAction";


export function bestHandAction(state: State): Action {
    return probabilisticAction(postfixNameToCall("best", state), state, uniformFill({
        checkFoldProbability: state.toCall === 0 && state.phase.code < RiverPhase.code
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
            checkFoldProbability: 0.2,
            minRaiseProbability: 0.4,
            halfPotRaiseProbability: 0.25,
            potRaiseProbability : 0.12,
            allInProbability: 0.03,
        },
        nonZero: checkCallBased({
            checkFoldProbability: Math.min(0.05 * (state.toCall / state.prevPhasePot), 0.1),
            callProbability: Math.min(0.5 * (state.toCall / state.prevPhasePot), 0.65),
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
            checkFoldProbability: 0.3,
            minRaiseProbability: 0.42,
            halfPotRaiseProbability: 0.17,
            potRaiseProbability : 0.09,
            allInProbability: 0.02,
        },
        nonZero: checkCallBased({
            checkFoldProbability: Math.min(0.4 * (state.toCall / state.prevPhasePot), 0.2),
            callProbability: Math.min(1.1 * (state.toCall / state.prevPhasePot), 0.6),
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
            checkFoldProbability: 0.4,
            minRaiseProbability: 0.1,
            halfPotRaiseProbability: 0.27,
            potRaiseProbability : 0.2,
            allInProbability: 0.03,
        },
        nonZero: checkCallBased({
            checkFoldProbability: Math.min(2 * (state.toCall / state.prevPhasePot), 0.5),
            callProbability: (1 - (state.toCall / state.prevPhasePot)) * 0.2,
            remainingMinRaiseShare: 0.2,
            remainingHalfPotRaiseShare: 0.32,
            remainingPotRaiseShare: 0.38,
            remainingAllInShare: 0.1,
        }),
    }));
}

export function bluffHandAction(state: State): Action {
    return probabilisticAction(postfixNameToCall("bluff", state), state, toCallDependent(state, {
        zero: {
            checkFoldProbability: 0.7,
            minRaiseProbability: 0.1,
            halfPotRaiseProbability: 0.07,
            potRaiseProbability : 0.1,
            allInProbability: 0.03,
        },
        nonZero: checkCallBased({
            checkFoldProbability: Math.min(2 * (state.toCall / state.prevPhasePot), 0.7),
            callProbability: 0.1,
            remainingMinRaiseShare: 0.15,
            remainingHalfPotRaiseShare: 0.32,
            remainingPotRaiseShare: 0.43,
            remainingAllInShare: 0.1,
        }),
    }));
}
