import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createHumanModel } from './human_model.js';
import { movement } from './movement.js';

// === SCENE ===
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaccff);

// === CAMERA ===
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// === RENDERER ===
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// === LIGHTING ===
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// === FLOOR ===
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0x888888 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0;
scene.add(floor);

// === PLAYER (Karakter utama) ===
let player;
try {
  player = createHumanModel();
  scene.add(player);
  camera.position.set(0, 1.6, 0);
  player.add(camera);
} catch (e) {
  console.error("Gagal membuat karakter:", e);
}

// === NPC sederhana (kloning dari player) ===
let npc;
try {
  npc = createHumanModel();
  npc.position.set(2, 0, -2);
  scene.add(npc);
} catch (e) {
  console.warn("NPC tidak bisa dimuat:", e);
}

// === NPC GERAK OTOMATIS ===
let npcDirection = 1;

// === LOOP ANIMASI ===
function animate() {
  requestAnimationFrame(animate);

  // Gerakkan pemain berdasarkan joystick
  if (player) {
    player.position.x += movement.x * 0.05;
    player.position.z -= movement.y * 0.05;
  }

  // Gerak NPC otomatis
  if (npc) {
    npc.position.z += 0.01 * npcDirection;
    if (npc.position.z > 2 || npc.position.z < -2) {
      npcDirection *= -1;
    }
  }

  renderer.render(scene, camera);
}
animate();

// === RESPONSIVE ===
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
