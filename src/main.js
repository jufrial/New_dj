import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 3);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('scene'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.4, 0);
controls.update();

const loader = new GLTFLoader();
loader.load('/model/casual.glb', (gltf) => {
  const model = gltf.scene || gltf.scenes[0];
  model.scale.set(1.5, 1.5, 1.5);
  model.position.set(0, 0, 0);
  scene.add(model);
}, undefined, (error) => {
  console.error("❌ Gagal memuat karakter:", error);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let character;

loader.load('/model/casual.glb', (gltf) => {
  character = gltf.scene || gltf.scenes[0];
  character.scale.set(1.5, 1.5, 1.5);
  character.position.set(0, 0, 0);
  scene.add(character);
}, undefined, (error) => {
  console.error("❌ Gagal memuat karakter:", error);
});

const joystick = nipplejs.create({
  zone: document.getElementById('joystick-zone'),
  mode: 'static',
  position: { left: '60px', bottom: '60px' },
  color: 'white',
  size: 100
});

joystick.on('move', (evt, data) => {
  const angle = data.angle.degree;
  if (angle >= 45 && angle < 135) {
    moveForward = true;
  } else if (angle >= 225 && angle < 315) {
    moveBackward = true;
  } else if (angle >= 135 && angle < 225) {
    moveLeft = true;
  } else {
    moveRight = true;
  }
});

joystick.on('end', () => {
  moveForward = moveBackward = moveLeft = moveRight = false;
});

// Gerakkan karakter di animasi
function animate() {
  requestAnimationFrame(animate);

  if (character) {
    if (moveForward) character.position.z -= 0.05;
    if (moveBackward) character.position.z += 0.05;
    if (moveLeft) character.position.x -= 0.05;
    if (moveRight) character.position.x += 0.05;
  }

  renderer.render(scene, camera);
}
animate();
