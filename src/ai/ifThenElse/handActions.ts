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
    // TODO: raise less likely
    return probabilisticAction("risky", state, uniformFill({
        checkFoldProbability: state.toCall > 0
            ? 0.2
            : undefined
        ,
    }));
}

export function weakHandAction(state: State): Action {
    // TODO: raise less likely
    return probabilisticAction("risky", state, uniformFill({
        checkFoldProbability: state.toCall > 0
            ? 0.33
            : undefined
        ,
    }));
}

export function bluffHandAction(state: State): Action {
    if (state.toCall > 0) {
        return probabilisticAction("bluff-c", state, zeroFill({
            checkFoldProbability: 0.9,
            potRaiseProbability: 0.1/3,
            overbetProbability: 0.1/3,
            allInProbability: 0.1/3,
        }));
    }
    else {
        return probabilisticAction("bluff", state, zeroFill({
            checkFoldProbability: 0.8,
            potRaiseProbability: 0.2/3,
            overbetProbability: 0.2/3,
            allInProbability: 0.2/3,
        }));
    }
}
