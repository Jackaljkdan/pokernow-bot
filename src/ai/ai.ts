import { PreflopPhase } from "../state";
import { findBestGapStraight, getPairs, isOneCardFlushPossible, isOneCardStraightPossible, isOpenEndedStraightPresent } from "./aiUtils";
import { ifThenElseAction } from "./ifThenElse/ifThenElseAi";

export function getAction(state: State): Action {
    if (state.phase.code > PreflopPhase.code) {
        console.log("stats", {
            flushDraw: isOneCardFlushPossible(state.handPlusBoard),
            openStraight: isOpenEndedStraightPresent(state.handPlusBoard),
            oneCardFlush: isOneCardFlushPossible(state.board),
            oneCardStraight: isOneCardStraightPossible(state.board),
            bestGapStraight: findBestGapStraight(state.board),
            boardPairs: getPairs(state.board),
        });
    }
    
    return ifThenElseAction(state);
}
