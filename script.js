// First-Person View dengan Mood
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let karakter = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  speed: 2,
  dx: 0,
  dy: 0,
  mood: 0, // 0: normal, 1: pelan, 2: takut, 3: lari, 4: panik
};

let moodList = ["Normal", "Pelan", "Takut", "Lari", "Panik"];

let joystick = {
  active: false,
  startX: 0,
  startY: 0,
};

function updateView() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar pandangan first-person
  ctx.fillStyle = "#aee"; // langit
  ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
  ctx.fillStyle = "#3c3"; // tanah
  ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

  // Efek kamera sesuai mood (misalnya gemetar saat panik)
  if (karakter.mood === 2 || karakter.mood === 4) {
    let shake = karakter.mood === 4 ? 5 : 2;
    canvas.style.transform = `translate(${Math.random() * shake}px, ${Math.random() * shake}px)`;
  } else {
    canvas.style.transform = "translate(0px, 0px)";
  }

  requestAnimationFrame(updateView);
}

updateView();

function getSpeedByMood() {
  switch (karakter.mood) {
    case 0: return 2; // normal
    case 1: return 1; // pelan
    case 2: return 1.5; // takut
    case 3: return 4; // lari
    case 4: return 6; // panik
  }
}

// Joystick
const joystickEl = document.getElementById("joystick");
const stick = document.createElement("div");
stick.id = "joystick-inner";
joystickEl.appendChild(stick);

joystickEl.addEventListener("touchstart", (e) => {
  joystick.active = true;
  joystick.startX = e.touches[0].clientX;
  joystick.startY = e.touches[0].clientY;
});

joystickEl.addEventListener("touchmove", (e) => {
  if (!joystick.active) return;
  let moveX = e.touches[0].clientX - joystick.startX;
  let moveY = e.touches[0].clientY - joystick.startY;
  karakter.dx = moveX * 0.05;
  karakter.dy = moveY * 0.05;
  let speed = getSpeedByMood();
  karakter.x += karakter.dx * speed;
  karakter.y += karakter.dy * speed;
});

joystickEl.addEventListener("touchend", () => {
  joystick.active = false;
  karakter.dx = 0;
  karakter.dy = 0;
});

// Mood Control Button
const btnMood = document.getElementById("btnMood");
btnMood.addEventListener("click", () => {
  karakter.mood = (karakter.mood + 1) % moodList.length;
  btnMood.innerText = `😊 ${moodList[karakter.mood]}`;
});
