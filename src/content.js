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

const iconSize = 19;

const uncheckedIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
</svg>`;

const checkedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
<path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
</svg>`;

const isMac = () => navigator.userAgent.indexOf("Mac OS X") != -1;
console.log(isMac());

const simulateKeyPress = (keyDescription) => {
  document.body.dispatchEvent(
    new KeyboardEvent("keydown", {
      isTrusted: true,
      altKey: false,
      bubbles: true,
      cancelBubble: false,
      cancelable: true,
      charCode: 0,
      composed: true,
      ctrlKey: !isMac(),
      currentTarget: null,
      defaultPrevented: true,
      detail: 0,
      eventPhase: 0,
      isComposing: false,
      location: 0,
      metaKey: isMac(),
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
});

const participantIndex = (participant) => {
  const pName = participant.querySelector("span").innerHTML;
  const pProfUrl = participant.querySelector("img").getAttribute("src");
  return `id:${pName + pProfUrl}`;
};

const renderIcons = (participantsContainers) => {
  participantsContainers.forEach((participant) => {
    const pIndex = participantIndex(participant);
    const icon = participant.querySelector(".gmh__checkedIcon");

    if (window.gmhParticipants[pIndex]) {
      participant.setAttribute("gmgparticipantchecked", true);
      icon.innerHTML = checkedIcon;
      return;
    }

    participant.removeAttribute("gmgparticipantchecked");
    icon.innerHTML = uncheckedIcon;
  });
};

const createCheckboxes = () => {
  const participantsContainers = document.querySelectorAll(
    'div[role="listitem"]'
  );

  if (!window.gmhParticipants) {
    window.gmhParticipants = {};
  }
  // const participantsIds = Array.from(participantsContainers).map(
  //   (cointainer) => {
  //     return cointainer.getAttribute("data-participant-id");
  //   }
  // );

  participantsContainers.forEach((participant) => {
    if (participant.querySelector(".gmh__iconWrapper")) {
      return;
    }

    const pIndex = participantIndex(participant);
    if (window.gmhParticipants[pIndex] === undefined) {
      window.gmhParticipants[pIndex] = false;
    }

    const iconWrapper = document.createElement("div");
    iconWrapper.classList.add("gmh__iconWrapper");

    const icon = document.createElement("div");
    icon.classList.add("gmh__checkedIcon");

    icon.addEventListener("click", () => {
      window.gmhParticipants[pIndex] = !window.gmhParticipants[pIndex];
      console.log(window.gmhParticipants);
      renderIcons(participantsContainers);
    });

    iconWrapper.prepend(icon);
    participant.children[1].prepend(iconWrapper);

    // participant.children[0].insertBefore(
    //   icon,
    //   participant.children[0].children[1]
    // );
  });

  renderIcons(participantsContainers);
};

window.addEventListener("click", (event) => {
  setTimeout(createCheckboxes, 300);
});

window.addEventListener("animationstart", (event) => {
  if (event.animationName === "joinToastExpand") {
    setTimeout(createCheckboxes, 10);
  }
});
window.addEventListener("transitioncancel", (event) => {
  setTimeout(createCheckboxes, 10);
});
window.addEventListener("focus", (event) => {
  setTimeout(createCheckboxes, 10);
});

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
