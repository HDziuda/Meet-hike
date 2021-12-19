const keyDescriptions = {
  keyD: {
    key: "d",
    code: "KeyD",
    keyCode: 68,
  },
  keyE: {
    key: "e",
    code: "KeyE",
    keyCode: 69,
  },
};

const simulateKeyPress = (keyDescription) => {
  document.body.dispatchEvent(
    new KeyboardEvent("keydown", {
      metaKey: true,
      isTrusted: true,
      altKey: false,
      bubbles: true,
      cancelBubble: false,
      cancelable: true,
      charCode: 0,
      composed: true,
      ctrlKey: false,
      currentTarget: null,
      defaultPrevented: true,
      detail: 0,
      eventPhase: 0,
      isComposing: false,
      location: 0,
      metaKey: true,
      ...keyDescription,
    })
  );
};

const toggleMic = () => {
  simulateKeyPress(keyDescriptions.keyD);
};
const toggleCam = () => {
  simulateKeyPress(keyDescriptions.keyE);
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (sender.id == chrome.runtime.id) {
    switch (request.action) {
      case "toggleMic":
        toggleMic();
        break;
      case "toggleCam":
        toggleCam();
        break;
    }
  }
  // if (request.greeting == "hello") sendResponse({ farewell: "goodbye" });
});
