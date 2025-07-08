let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let juf = { x: 50, y: 150, w: 20, h: 20, color: "blue" };
let shira = { x: 300, y: 150, w: 20, h: 20, color: "pink" };

document.addEventListener("keydown", moveJuf);
function moveJuf(e) {
  switch (e.key) {
    case "ArrowUp": juf.y -= 10; break;
    case "ArrowDown": juf.y += 10; break;
    case "ArrowLeft": juf.x -= 10; break;
    case "ArrowRight": juf.x += 10; break;
  }
  draw();
  checkInteraction();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = juf.color;
  ctx.fillRect(juf.x, juf.y, juf.w, juf.h);
  ctx.fillStyle = shira.color;
  ctx.fillRect(shira.x, shira.y, shira.w, shira.h);
}

function checkInteraction() {
  let dx = juf.x - shira.x;
  let dy = juf.y - shira.y;
  let dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 30) {
    document.getElementById("npc-dialogue").innerText = "Shira: Hai Juf, kamu dekat sekali.";
  }
}

function sendToNPC() {
  const input = document.getElementById("inputText").value.toLowerCase();
  const dialogue = document.getElementById("npc-dialogue");
  let respon = "Shira: Hmmm...";

  if (input.includes("nama")) respon = "Shira: Namaku Shira, ingat kan?";
  else if (input.includes("taman")) respon = "Shira: Aku suka taman, tempat kita bertemu.";
  else if (input.includes("sedih")) respon = "Shira: Kalau kamu sedih, aku bisa mendengarkan.";
  else if (input.includes("senang")) respon = "Shira: Aku ikut bahagia dengar itu!";

  dialogue.innerText = respon;
  document.getElementById("inputText").value = "";
}

draw();