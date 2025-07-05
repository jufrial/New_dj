import * as THREE from 'https://cdn.skypack.dev/three@0.152.2';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.152.2/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 3);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('scene'),
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Buat overlay teks debug
const debugDiv = document.createElement('div');
debugDiv.style.position = 'absolute';
debugDiv.style.bottom = '10px';
debugDiv.style.left = '10px';
debugDiv.style.padding = '10px';
debugDiv.style.backgroundColor = 'rgba(0,0,0,0.6)';
debugDiv.style.color = 'white';
debugDiv.style.fontSize = '12px';
debugDiv.style.zIndex = '9999';
debugDiv.innerText = "🔍 Debug aktif...\n";
document.body.appendChild(debugDiv);

function log(msg) {
  console.log(msg);
  debugDiv.innerText += msg + "\n";
}

// Lighting
scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.4, 0);
controls.update();

// Load karakter
log("🚀 Memuat model: /model/karakter.glb");
const loader = new GLTFLoader();
loader.load('/model/karakter.glb', (gltf) => {
  const model = gltf.scene || gltf.scenes[0];
  model.scale.set(1.5, 1.5, 1.5);
  model.position.set(0, 0, 0);
  scene.add(model);
  log("✅ Karakter berhasil dimuat.");
}, undefined, (err) => {
  log("❌ Gagal memuat karakter:");
  log(err.message || err);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
