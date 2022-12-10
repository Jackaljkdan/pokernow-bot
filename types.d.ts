type ActionType = "CheckOrFold" | "Call" | "Raise";

type Action = {
    type: ActionType,
    raiseAmount?: number,
};
