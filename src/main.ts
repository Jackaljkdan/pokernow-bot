import { getAction } from "./ai/ai";
import { getBigBlindValue, getState, isMyTurn } from "./ui";
import { performAction, sanitizeAction } from "./action";


let botLoopTimeout: NodeJS.Timer | undefined;

console.log("hello this is main.ts speaking");

function startBotLoop() {
    stopBotLoop();

    console.log("starting bot");
    console.log("big blind: " + getBigBlindValue());

    function botLoop() {
        if (isMyTurn()) {
            console.log("bot turn");
            
            const state = getState();
            console.log("state: ", state);

            let action: Action | undefined;

            try {
                action = getAction(state);
                console.log("bot action:", action);
            }
            catch (err) {
                action = undefined;
                console.error("bot error:", err);
            }

            const sanitizedAction = sanitizeAction(action, state);
            console.log("sanitized bot action:", sanitizedAction);

            performAction(sanitizedAction, botLoop);
        }
        else {
            botLoopTimeout = setTimeout(botLoop, 500);
        }
    }

    botLoop();
}

function stopBotLoop() {
    clearTimeout(botLoopTimeout);
    botLoopTimeout = undefined;
}

chrome.runtime.onMessage.addListener((message: ChromeMessage, sender, callback) => {
    switch (message) {
        case "start_bot":
            startBotLoop();
            break;
        case "kill_bot":
            stopBotLoop();
            break;
        case "get_bot_status":
            let status: BotStatus = botLoopTimeout === undefined
                ? "off"
                : "playing"
            ;
            callback(status);
            break;
    }
});
