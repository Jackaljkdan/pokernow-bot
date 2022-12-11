import { getAction } from "./ai";
import { getBigBlindValue } from "./ui";
import { isMyTurn, performAction, sanitizeAction } from "./utils";


let botLoopInterval: NodeJS.Timer;

console.log("hello this is main.ts speaking");

function startBotLoop() {

    console.log("starting bot");
    console.log("big blind: " + getBigBlindValue());

    botLoopInterval = setInterval(
        function botLoop() {
            if (isMyTurn()) {
                let action = getAction();
                let sanitizedAction = sanitizeAction(action);
                performAction(sanitizedAction);
            }
        },
        500,
    );
}

function stopBotLoop() {
    clearInterval(botLoopInterval);
}

chrome.runtime.onMessage.addListener(message => {
    if (message === "start_bot")
        startBotLoop();
    else if (message === "kill_bot")
        stopBotLoop();
});
