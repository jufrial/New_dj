let knowledge = {};
let mood = "netral";

fetch('memory/knowledge.json')
  .then(res => res.json())
  .then(data => knowledge = data);

function sendMessage() {
  const input = document.getElementById("user-input").value;
  const output = document.getElementById("npc-output");
  const respon = interpret(input);
  output.innerText = respon;
}

function interpret(teks) {
  teks = teks.toLowerCase();
  if (teks.includes("nama") && teks.includes("kamu")) return "Namaku Shira. Aku NPC yang menyimpan perasaan.";
  if (teks.includes("sedih")) return "Kamu sedang sedih ya? Aku di sini untuk menemani.";
  if (teks.includes("taman")) return "Taman adalah tempat favoritku, tenang dan damai.";
  return "Aku mengerti. Ceritakan lebih banyak.";
}