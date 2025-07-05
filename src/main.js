import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 3);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Cahaya
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
scene.add(light);

// Kontrol
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.4, 0);
controls.update();

// Load Karakter
const loader = new GLTFLoader();
loader.load('/model/karakter.glb', function (gltf) {
  const model = gltf.scene;
  model.scale.set(1.2, 1.2, 1.2);
  model.position.set(0, 0, 0);
  scene.add(model);
}, undefined, function (error) {
  console.error('Error loading model:', error);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
