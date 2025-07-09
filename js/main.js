import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createHumanModel } from './human_model.js';
import { movement } from './movement.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaccff);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: 0x888888 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0;
scene.add(floor);

let player = createHumanModel();
scene.add(player);
camera.position.set(0, 1.6, 0);
player.add(camera);

const leftArm = player.getObjectByName('leftArm');
const rightArm = player.getObjectByName('rightArm');
let armSwing = 0;

let npc = createHumanModel();
npc.position.set(2, 0, -2);
scene.add(npc);

let npcDirection = 1;

function animate() {
  requestAnimationFrame(animate);

  const speed = Math.abs(movement.x) + Math.abs(movement.y);

  if (leftArm && rightArm) {
    if (speed > 0.01) {
      armSwing += 0.1;
      leftArm.rotation.z = Math.sin(armSwing) * 0.3;
      rightArm.rotation.z = -Math.sin(armSwing) * 0.3;
    } else {
      leftArm.rotation.z *= 0.9;
      rightArm.rotation.z *= 0.9;
    }
  }

  if (player) {
    player.position.x += movement.x * 0.05;
    player.position.z -= movement.y * 0.05;
  }

  if (npc) {
    npc.position.z += 0.01 * npcDirection;
    if (npc.position.z > 2 || npc.position.z < -2) npcDirection *= -1;
  }

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
