import { AceCode, JackCode, QueenCode } from "../../cards";
import { getHighestCard, getLowestCard } from "../aiUtils";
import { lerp } from "../lerp";
import { probabilisticAction, uniformFill } from "../probabilisticAction";
import { bestHandAction, bluffHandAction, riskyHandAction, strongHandAction, weakHandAction } from "./handActions";


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
    const highestCard = getHighestCard(state.hand)!;
    const lowestCard = getLowestCard(state.hand)!;

    if (lowestCard.value.code >= QueenCode)
        return strongHandAction(state);

    if (lowestCard.value.code >= 10)
        return riskyHandAction(state);
    
    const delta = highestCard.value.code - lowestCard.value.code;

    // TODO: differenziare ulteriormente, le mani con l'asso non sono così bluffose per dire
    if (delta >= 5)
        return bluffHandAction(state);

    if (highestCard.value.code >= JackCode)
        return weakHandAction(state);

    return bluffHandAction(state);
}
