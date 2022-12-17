import { isPhaseBefore, RiverPhase } from "../../state";
import { probabilisticAction, uniformFill, zeroFill } from "../probabilisticAction";


// TODO: tenere in conto anche la grandezza del raise, quando è vicino al big blind è quasi come un check

export function bestHandAction(state: State): Action {
    return probabilisticAction("best", state, uniformFill({
        checkFoldProbability: state.toCall === 0 && isPhaseBefore(state.phase, RiverPhase)
            ? undefined
            : 0
        ,
    }));
}

export function strongHandAction(state: State): Action {
    return probabilisticAction("strong", state, uniformFill({
        checkFoldProbability: state.toCall > 0
            ? 0.1
            : undefined
        ,
    }));
}

export function riskyHandAction(state: State): Action {
    return probabilisticAction("risky", state, uniformFill({
        checkFoldProbability: state.toCall > 0 ? 0.3 : 0.5,
        callProbability: state.toCall > 0 ? 0.3 : 0,
    }));
}

export function weakHandAction(state: State): Action {
    return probabilisticAction("weak", state, uniformFill({
        checkFoldProbability: state.toCall > 0 ? 0.5 : 0.7,
        callProbability: state.toCall > 0 ? 0.2 : 0,
    }));
}

export function bluffHandAction(state: State): Action {
    if (state.toCall > 0) {
        return probabilisticAction("bluff-c", state, zeroFill({
            checkFoldProbability: 0.95,
            potRaiseProbability: 0.05 / 2,
            allInProbability: 0.05 / 2,
        }));
    }
    else {
        return probabilisticAction("bluff", state, zeroFill({
            checkFoldProbability: 0.9,
            potRaiseProbability: 0.1 / 2,
            allInProbability: 0.1 / 2,
        }));
    }
}
