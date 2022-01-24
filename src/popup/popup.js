let micMuteCheckbox = document.getElementById("micMuteCheckbox");
let camOffCheckbox = document.getElementById("camOffCheckbox");

const eventListner = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      // Object.keys(window).forEach((key) => {
      //   if (/^on/.test(key)) {
      //     if (
      //       "transitionrun" == key.slice(2) ||
      //       "mouseup" == key.slice(2) ||
      //       "focus" == key.slice(2) ||
      //       "deviceorientationabsolute" == key.slice(2) ||
      //       "pointerrawupdate" == key.slice(2) ||
      //       "transitionstart" == key.slice(2) ||
      //       "transitionend" == key.slice(2) ||
      //       "mouseout" == key.slice(2) ||
      //       "mousemove" == key.slice(2) ||
      //       "mouseover" == key.slice(2) ||
      //       "pointerout" == key.slice(2) ||
      //       "pointerover" == key.slice(2) ||
      //       "blur" == key.slice(2) ||
      //       "pointermove" == key.slice(2) ||
      //       "animationiteration" == key.slice(2) ||
      //       "animationstart" == key.slice(2)
      //     )
      //       return;
      //     window.addEventListener(key.slice(2), (event) => {
      //       console.log("fired: " + key.slice(2));
      //       console.log(event);
      //     });
      //   }
      // });
    },
  });
};

micMuteCheckbox.addEventListener("click", async (e) => {
  chrome.storage.sync.set({ micMute: e.target.checked });
});
camOffCheckbox.addEventListener("click", async (e) => {
  chrome.storage.sync.set({ camOff: e.target.checked });
});

(function () {
  chrome.storage.sync.get("micMute", ({ micMute }) => {
    micMuteCheckbox.checked = micMute;
  });
  chrome.storage.sync.get("camOff", ({ camOff }) => {
    camOffCheckbox.checked = camOff;
  });
  eventListner();
})();
