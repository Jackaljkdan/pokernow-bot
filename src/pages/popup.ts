
document.getElementById("start-bot")?.addEventListener("click", () => {
    chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        const currentTabID = tabs.length === 0 ? 0 : tabs[0].id!;
        chrome.tabs.sendMessage(currentTabID, "start_bot");
    });
});

document.getElementById("kill-bot")?.addEventListener("click", () => {
    chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        const currentTabID = tabs.length === 0 ? 0 : tabs[0].id!;
        chrome.tabs.sendMessage(currentTabID, "kill_bot");
    });
});
