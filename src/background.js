chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    console.log(tabId + " loaded");
    console.log(tab);
    console.log(chrome.tabs);

    // chrome.storage.sync.set({ inputs: "1111" });
    setTimeout(() => {
      chrome.storage.sync.get("micMute", ({ micMute }) => {
        if (!micMute) return;

        requestAction(tabId, "toggleMic");
      });
      chrome.storage.sync.get("camOff", ({ camOff }) => {
        console.log(camOff);
        if (!camOff) return;

        requestAction(tabId, "toggleCam");
      });
    }, 1);
  }
});

const requestAction = (tabId, action) => {
  chrome.tabs.sendMessage(tabId, { action });
};
