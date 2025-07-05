// First-Person View - Kamera sebagai kepala karakter
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let karakter = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 0, // Tidak ditampilkan karena sudut pandang orang pertama
  speed: 2,
  dx: 0,
  dy: 0,
};

let joystick = {
  active: false,
  startX: 0,
  startY: 0,
  dx: 0,
  dy: 0,
};

function updateView() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gambar latar belakang sebagai pandangan first-person
  ctx.fillStyle = "#aee"; // langit
  ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
  ctx.fillStyle = "#3c3"; // tanah
  ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

  requestAnimationFrame(updateView);
}

updateView();

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
  karakter.x += karakter.dx * karakter.speed;
  karakter.y += karakter.dy * karakter.speed;
});

joystickEl.addEventListener("touchend", () => {
  joystick.active = false;
  karakter.dx = 0;
  karakter.dy = 0;
});
