import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createFullHandWithArm } from './hand_model.js';
import { setupAnalogControl } from './hand_control.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 5, 5);
scene.add(light);

const handGroup = createFullHandWithArm();
handGroup.position.set(0.15, 1.3, -0.5);
scene.add(handGroup);

setupAnalogControl(handGroup);

const helper = new THREE.GridHelper(10, 10);
scene.add(helper);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.1), new THREE.MeshStandardMaterial({ color: 0xff0000 }));
sphere.position.set(0, 1.6, -2);
scene.add(sphere);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
