import { KingCode } from "../../cards";
import { RiverPhase } from "../../state";
import { getHighestCard, getPairs, hasFlushDrawOrOpenEndedStraight, isOneCardFlushOrStraightPossible, isOneCardFlushPossible, isOneCardStraightPossible, isOpenEndedStraightPresent } from "../aiUtils"
import { bluffHandAction, riskyHandAction, strongHandAction, weakHandAction } from "./handActions";
import { highCardAction } from "./highCardAction";


export function pairAction(state: State): Action {
    const boardPairs = getPairs(state.board);

    if (boardPairs.length > 0)
        return highCardAction(state);

    return pairActionIgnoringBoardPair(state);
}

export function pairActionIgnoringBoardPair(state: State): Action {
    const myPair = getPairs(state.handPlusBoard)[0];

    if (!myPair || myPair.length === 0)
        throw new Error("pair expected but not found " + JSON.stringify(state.handPlusBoard, null, 4));

    const highestBoardCard = getHighestCard(state.board)!;
    const isTopPair = myPair[0].value.code >= highestBoardCard.value.code;
    const isHandPair = state.hand[0].value.code === state.hand[1].value.code;
    const kicker = !isHandPair
        ? state.hand[0].value.code !== myPair[0].value.code
            ? state.hand[0]
            : state.hand[1]
        : highestBoardCard
    ;

    console.log("pair hand state", {
        myPair,
        highestBoardCard,
        isTopPair,
        isHandPair,
        kicker,
    });

    if (state.phase.code < RiverPhase.code) {
        if (hasFlushDrawOrOpenEndedStraight(state.handPlusBoard)) {
            if (isTopPair)
                return strongHandAction(state);
            else
                return riskyHandAction(state);
        }
        else {
            if (isOneCardFlushOrStraightPossible(state.board)) {
                if (isTopPair)
                    return weakHandAction(state);
                else
                    return bluffHandAction(state);
            }

            if (isTopPair) {
                if (isHandPair)
                    return strongHandAction(state);
                else
                    return riskyHandAction(state);
            }
            
            return weakHandAction(state);
        }
    }
    else {  // river
        if (isOneCardFlushOrStraightPossible(state.board)) {
            if (isTopPair)
                return weakHandAction(state);
            else
                return bluffHandAction(state);
        }

        if (isTopPair && isHandPair)
            return strongHandAction(state);
        else if (isTopPair && kicker.value.code >= KingCode)
            return riskyHandAction(state);
        else if (isTopPair)
            return weakHandAction(state);
        else
            return bluffHandAction(state);
    }
}
