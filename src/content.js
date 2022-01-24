const iconSize = 19;

const diceIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" fill="currentColor" class="bi bi-dice-5" viewBox="0 0 16 16">
  <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/>
  <path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-8 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm4-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
</svg>`;

const uncheckedIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
</svg>`;

const checkedIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="${iconSize}" height="${iconSize}" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
<path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
</svg>`;

function getRandomInt() {
  const min = 0;
  const max = 65535;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const participantIndex = (participant) => {
  const pName = participant.querySelector("span").innerHTML;
  const pProfUrl = participant.querySelector("img").getAttribute("src");
  return `id:${pName + pProfUrl}`;
};

const getAllParticipants = () => {
  return document.querySelectorAll('div[role="listitem"]');
};

const getRandomParticipant = () => {
  const participants = getAllParticipants();

  const winner = participants[getRandomInt() % participants.length];
  const winnerName = winner.querySelector("span").innerHTML;

  window.alert(winnerName);
};

const createIcon = (className, event, iconHTML = "") => {
  const iconWrapper = document.createElement("div");
  iconWrapper.classList.add(`${className}__wrapper`);

  const icon = document.createElement("div");
  icon.classList.add(`${className}__icon`);

  icon.innerHTML = iconHTML;
  iconWrapper.prepend(icon);

  iconWrapper.addEventListener("click", event);

  return iconWrapper;
};

const renderDiceIcon = () => {
  const panel = document.querySelector('div[role="list"]');
  if (!panel) return;

  const titleContainer = panel.parentNode.children[0];
  if (titleContainer.querySelector(".dice__wrapper")) return;

  const icon = createIcon("dice", getRandomParticipant, diceIcon);
  titleContainer.append(icon);
};

const renderIcons = (participantsContainers) => {
  participantsContainers.forEach((participant) => {
    const pIndex = participantIndex(participant);
    let iconWrapper = participant.querySelector(".checkbox__wrapper");

    if (!iconWrapper) {
      const createdIcon = createIcon("checkbox", () => {
        window.gmhParticipants[pIndex] = !window.gmhParticipants[pIndex];
        renderIcons(participantsContainers);
      });

      participant.children[0].prepend(createdIcon);
    }

    const icon = participant.querySelector(".checkbox__icon");

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
  const participantsContainers = getAllParticipants();

  if (!window.gmhParticipants) {
    window.gmhParticipants = {};
  }

  participantsContainers.forEach((participant) => {
    if (participant.querySelector(".checkbox__wrapper")) {
      return;
    }

    const pIndex = participantIndex(participant);
    if (window.gmhParticipants[pIndex] === undefined) {
      window.gmhParticipants[pIndex] = false;
    }
  });

  renderDiceIcon();
  renderIcons(participantsContainers);
};

window.addEventListener("click", () => {
  setTimeout(createCheckboxes, 10);
});

window.addEventListener("animationstart", (event) => {
  if (event.animationName === "joinToastExpand") {
    setTimeout(createCheckboxes, 10);
  }
});
window.addEventListener("transitioncancel", () => {
  setTimeout(createCheckboxes, 10);
});
window.addEventListener("focus", () => {
  setTimeout(createCheckboxes, 10);
});
