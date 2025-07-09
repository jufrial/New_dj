document.addEventListener("DOMContentLoaded", () => {
  const enterBtn = document.getElementById("enter-btn");
  const loadingScreen = document.getElementById("loading-screen");
  const gameContainer = document.getElementById("game-container");
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  let juf = {
    x: 100,
    y: 100,
    size: 30,
    color: "#ffffff",
    speed: 3
  };

  let keys = {};

  enterBtn.addEventListener("click", () => {
    loadingScreen.style.display = "none";
    gameContainer.style.display = "block";
    resizeCanvas();
    startGame();
  });

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function startGame() {
    drawLoop();
    window.addEventListener("keydown", (e) => keys[e.key] = true);
    window.addEventListener("keyup", (e) => keys[e.key] = false);
  }

  function update() {
    if (keys["ArrowUp"] || keys["w"]) juf.y -= juf.speed;
    if (keys["ArrowDown"] || keys["s"]) juf.y += juf.speed;
    if (keys["ArrowLeft"] || keys["a"]) juf.x -= juf.speed;
    if (keys["ArrowRight"] || keys["d"]) juf.x += juf.speed;
  }

  function drawJuf() {
    ctx.beginPath();
    ctx.arc(juf.x, juf.y, juf.size, 0, Math.PI * 2);
    ctx.fillStyle = juf.color;
    ctx.fill();
  }

  function drawBackground() {
    ctx.fillStyle = "#204040";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.font = "20px sans-serif";
    ctx.fillText("Taman Kota Sore — Dunia Juf Dimulai", 40, 40);
  }

  function drawLoop() {
    update();
    drawBackground();
    drawJuf();
    requestAnimationFrame(drawLoop);
  }

  window.addEventListener("resize", resizeCanvas);
});
