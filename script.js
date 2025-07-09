// Tunggu sampai semua halaman siap
document.addEventListener("DOMContentLoaded", () => {
  const enterBtn = document.getElementById("enter-btn");
  const loadingScreen = document.getElementById("loading-screen");
  const gameContainer = document.getElementById("game-container");
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");

  // Saat tombol "Masuk ke Dunia" ditekan
  enterBtn.addEventListener("click", () => {
    loadingScreen.style.display = "none";
    gameContainer.style.display = "block";
    startGame();
  });

  // Fungsi awal memulai dunia
  function startGame() {
    resizeCanvas();
    drawInitialWorld();
    // Di sini nanti kita aktifkan kontrol, NPC, dll
  }

  // Ubah ukuran canvas agar sesuai layar
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Gambar dunia awal (nanti akan diganti dengan lebih realistis)
  function drawInitialWorld() {
    ctx.fillStyle = "#204040"; // Warna rumput sore
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.font = "24px sans-serif";
    ctx.fillText("Taman Kota Sore — Dunia Juf Dimulai", 40, 60);
  }

  // Resize
