
export const PreflopPhase: Phase = {
    name: "preflop",
    code: 0,
};

export const FlopPhase: Phase = {
    name: "flop",
    code: 1,
};

export const TurnPhase: Phase = {
    name: "turn",
    code: 2,
};

export const RiverPhase: Phase = {
    name: "river",
    code: 3,
};

export function getPhase(state: State) {
    if (!state.board)
        return PreflopPhase;

    switch (state.board.length) {
        case 0:
        default:
            return PreflopPhase;
        case 3:
            return FlopPhase;
        case 4:
            return TurnPhase;
        case 5:
            return RiverPhase;
    }
}

export function isPhaseBefore(src: Phase, target: Phase) {
    return src.code < target.code;
}

export function isStatePhaseBefore(state: State, phase: Phase) {
    return isPhaseBefore(getPhase(state), phase);
}
