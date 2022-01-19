let micMuteCheckbox = document.getElementById("micMuteCheckbox");
let camOffCheckbox = document.getElementById("camOffCheckbox");

// When the button is clicked, inject setPageBackgroundColor into current page
const eventListner = async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      // window.addEventListener("animationstart", (event) => {
      //   if (event.animationName === "joinToastExpand") {
      //     const participantsContainers = document.querySelectorAll(
      //       'div[role="listitem"]'
      //     );

      //     // mdc-ripple-fg-opacity-in
      //     // click
      //     console.log(document);
      //     console.log(participantsContainers);
      //   }
      // });
      console.log("co jest");

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

// document.body.dispatchEvent(
//   new KeyboardEvent("keydown", {
//     key: "d",
//     code: "KeyD",
//     keyCode: 68,
//     metaKey: true,
//     isTrusted: true,
//     altKey: false,
//     bubbles: true,
//     cancelBubble: false,
//     cancelable: true,
//     charCode: 0,
//     code: "KeyD",
//     composed: true,
//     ctrlKey: false,
//     currentTarget: null,
//     defaultPrevented: true,
//     detail: 0,
//     eventPhase: 0,
//     isComposing: false,
//     key: "d",
//     keyCode: 68,
//     location: 0,
//     metaKey: true,
//   })
// );
