import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createHumanModel } from './human_model.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaccff);

// Kamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cahaya
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

// Lantai
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0x888888 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Tambahkan karakter dummy
try {
  const player = createHumanModel();
  scene.add(player);
} catch (e) {
  console.warn('Model gagal dimuat:', e);
}

// Animasi
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

