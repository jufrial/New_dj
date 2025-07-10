import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createHumanModel } from './human_model/human_model.js';

// Membuat scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaccff);

// Kamera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Pencahayaan
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// Lantai
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0x888888 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Model manusia
const player = createHumanModel();
scene.add(player);

// Atur posisi kamera agar tidak berada di dalam player
camera.position.set(0, 1.6, 3);

// Fungsi animasi
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Respon perubahan ukuran window
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
