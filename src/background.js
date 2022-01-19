chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    setTimeout(() => {
      chrome.storage.sync.get("micMute", ({ micMute }) => {
        if (!micMute) return;

        requestAction(tabId, "toggleMic");
      });
      chrome.storage.sync.get("camOff", ({ camOff }) => {
        if (!camOff) return;

        requestAction(tabId, "toggleCam");
      });
    }, 1);
  }
});

const requestAction = (tabId, action) => {
  chrome.tabs.sendMessage(tabId, { action });
};
