
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

export function getPhaseFromBoardLength(length: number) {
    switch (length) {
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
