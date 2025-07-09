import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createFullHandWithArm } from './hand_model.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 0); // posisi kamera: tinggi kepala manusia

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Cahaya
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 5, 5);
scene.add(light);

// Tambahkan tangan dan lengan
const handGroup = createFullHandWithArm();
scene.add(handGroup);

// Animasi
function animate() {
  requestAnimationFrame(animate);
  handGroup.rotation.y += 0.005; // rotasi idle
  renderer.render(scene, camera);
}
animate();
