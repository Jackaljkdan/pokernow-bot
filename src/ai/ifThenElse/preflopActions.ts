import { AceCode, JackCode } from "../../cards";
import { lerp } from "../lerp";
import { probabilisticAction, uniformFill } from "../probabilisticAction";
import { bestHandAction, bluffHandAction, riskyHandAction, strongHandAction } from "./handActions";


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
        return strongHandAction(state);

    const ninesCheckOrFoldProbability = 0.05;
    const twosCheckOrFoldProbability = 0.8;

    return probabilisticAction("lowpair", state, uniformFill({
        checkFoldProbability: lerp(twosCheckOrFoldProbability, ninesCheckOrFoldProbability, (valueCode - 2) / 9),
    }));
}

function nonPairPreflopAction(state: State): Action {
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

    // TODO: differenziare ulteriormente, le mani con l'asso non sono così bluffose per dire
    if (delta >= 5)
        return bluffHandAction(state);

    if (lowestCard.value.code >= 10)
        return strongHandAction(state);

    // TODO: differenziare ulteriormente
    if (highestCard.value.code >= JackCode)
        return riskyHandAction(state);

    return bluffHandAction(state);
}
