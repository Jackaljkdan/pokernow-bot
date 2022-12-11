type ActionType = "CheckOrFold" | "Call" | "Raise";

type Action = {
    type: ActionType,
    raiseAmount?: number,
};

type ChromeMessage = "start_bot" | "kill_bot" | "get_bot_status";

type BotStatus = "playing" | "off";
