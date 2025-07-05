
const char = document.getElementById("character");
const dialogBox = document.getElementById("dialog-box");
const dialogText = document.getElementById("dialog-text");
let dialogIndex = 0;

const dialogs = [
  "Shira: Hai Juf... kamu datang juga.",
  "Shira: Aku sudah menunggu di taman ini.",
  "Shira: Hari ini... aku ingin bicara dari hati ke hati."
];

function move(direction) {
  const step = 10;
  const top = parseInt(window.getComputedStyle(char).top);
  const left = parseInt(window.getComputedStyle(char).left);

  switch (direction) {
    case "up": char.style.top = `${top - step}px`; break;
    case "down": char.style.top = `${top + step}px`; break;
    case "left": char.style.left = `${left - step}px`; break;
    case "right": char.style.left = `${left + step}px`; break;
  }
}

function interactWithShira() {
  dialogBox.classList.remove("hidden");
  dialogIndex = 0;
  dialogText.innerText = dialogs[dialogIndex];
}

function nextDialog() {
  dialogIndex++;
  if (dialogIndex < dialogs.length) {
    dialogText.innerText = dialogs[dialogIndex];
  } else {
    dialogBox.classList.add("hidden");
  }
}
