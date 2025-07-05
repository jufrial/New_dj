// Karakter dan joystick
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const karakter = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 30,
  color: "black",
};

let joystick = {
  active: false,
  startX: 0,
  startY: 0,
  dx: 0,
  dy: 0,
};

function drawKarakter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(karakter.x, karakter.y, karakter.size, 0, Math.PI * 2);
  ctx.fillStyle = karakter.color;
  ctx.fill();
}

function updateKarakter() {
  karakter.x += joystick.dx;
  karakter.y += joystick.dy;
  drawKarakter();
  requestAnimationFrame(updateKarakter);
}

updateKarakter();

// Joystick handling
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
  joystick.dx = moveX * 0.05;
  joystick.dy = moveY * 0.05;
});

joystickEl.addEventListener("touchend", () => {
  joystick.active = false;
  joystick.dx = 0;
  joystick.dy = 0;
});
