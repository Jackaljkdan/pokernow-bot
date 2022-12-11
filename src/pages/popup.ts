
function sendMessage(message: ChromeMessage, callback?: (response: any) => void) {
    chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        const currentTabID = tabs.length === 0 ? 0 : tabs[0].id!;
        chrome.tabs.sendMessage(currentTabID, message, callback!);
    });
}

document.getElementById("start-bot")?.addEventListener("click", () => {
    sendMessage("start_bot");
});

document.getElementById("kill-bot")?.addEventListener("click", () => {
    sendMessage("kill_bot");
});

setInterval(
    function uiLoop() {
        sendMessage("get_bot_status", (response: BotStatus) => {
            document.getElementById("bot-status")!.textContent = response;
        });
    },
    500,
);
