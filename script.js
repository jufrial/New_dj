// Tambahkan gambar tangan ke layar
const tangan = document.createElement("img");
tangan.src = "Img/lengan_juf.png"; // pastikan path benar
tangan.alt = "Tangan Juf";
tangan.id = "tangan";
document.body.appendChild(tangan);

// Tambahkan class awal
tangan.classList.add("gaya-normal");

// Fungsi ubah gaya tangan sesuai tombol
function ubahGaya(gaya) {
  tangan.className = ""; // hapus class lama
  tangan.classList.add(gaya);
}

// Hubungkan tombol ke fungsi
document.getElementById("pelan").addEventListener("click", () => ubahGaya("gaya-pelan"));
document.getElementById("takut").addEventListener("click", () => ubahGaya("gaya-takut"));
document.getElementById("lari").addEventListener("click", () => ubahGaya("gaya-lari"));
document.getElementById("terbirit").addEventListener("click", () => ubahGaya("gaya-terbirit"));
