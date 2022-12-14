import { AceCode, JackCode } from "../cards";
import { isPhaseBefore, PreflopPhase, RiverPhase } from "../state";
import { lerp } from "./lerp";
import { probabilisticAction, uniformFill, zeroFill } from "./probabilisticAction";

export function ifThenElseAction(state: State): Action {
    if (state.phase === PreflopPhase)
        return preflopAction(state);
    else
        return bluffHandAction(state);
}

function preflopAction(state: State): Action {
    const hasPair = state.hand[0].value.code === state.hand[1].value.code;

    if (hasPair)
        return pairPreflopAction(state);
    
    const highestCard = state.hand[0].value.code > state.hand[1].value.code
        ? state.hand[0]
        : state.hand[1]
    ;

    const lowestCard = state.hand[0].value.code > state.hand[1].value.code
        ? state.hand[1]
        : state.hand[0]
    ;

    if (highestCard.value.code >= 10 && lowestCard.value.code >= 10)
        return strongHandAction(state);
    
    const delta = highestCard.value.code - lowestCard.value.code;

    if (delta >= 5)
        return bluffHandAction(state);

    if (lowestCard.value.code >= 10)
        return strongHandAction(state);

    if (highestCard.value.code >= JackCode)
        return riskyHandAction(state);

    return bluffHandAction(state);
}

function pairPreflopAction(state: State): Action {
    const valueCode = state.hand[0].value.code;

    if (valueCode == AceCode)
        return bestHandAction(state);
    
    if (valueCode >= 10)
        return strongHandAction(state);

    const ninesCheckOrFoldProbability = 0.05;
    const twosCheckOrFoldProbability = 0.8;

    return probabilisticAction("lowpair", state, uniformFill({
        checkFoldProbability: lerp(twosCheckOrFoldProbability, ninesCheckOrFoldProbability, (valueCode - 2) / 9),
    }));
}

function bestHandAction(state: State): Action {
    return probabilisticAction("best", state, uniformFill({
        checkFoldProbability: state.toCall === 0 && isPhaseBefore(state.phase, RiverPhase)
            ? undefined
            : 0
        ,
    }));
}

function strongHandAction(state: State): Action {
    return probabilisticAction("strong", state, uniformFill({
        checkFoldProbability: state.toCall > 0
            ? 0.1
            : 0
        ,
    }));
}

function riskyHandAction(state: State): Action {
    return probabilisticAction("risky", state, uniformFill({
        checkFoldProbability: state.toCall > 0
            ? 0.2
            : 0
        ,
    }));
}

function bluffHandAction(state: State): Action {
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
