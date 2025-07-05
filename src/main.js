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

// Lighting
scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.4, 0);
controls.update();

// Safe Debug function
function logDebug(msg) {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const debugBox = document.getElementById('debug') || (() => {
      const d = document.createElement('div');
      d.id = 'debug';
      d.style.position = 'absolute';
      d.style.bottom = '10px';
      d.style.left = '10px';
      d.style.padding = '10px';
      d.style.backgroundColor = 'rgba(0,0,0,0.5)';
      d.style.color = 'white';
      d.style.fontSize = '12px';
      d.style.zIndex = '9999';
      document.body.appendChild(d);
      return d;
    })();
    debugBox.innerText += msg + "\\n";
  }
  console.log(msg);
}

// Load karakter
logDebug("🚀 Memuat model: /model/karakter.glb");
const loader = new GLTFLoader();
loader.load('/model/karakter.glb', (gltf) => {
  const model = gltf.scene || gltf.scenes[0];
  model.scale.set(1.5, 1.5, 1.5);
  model.position.set(0, 0, 0);
  scene.add(model);
  logDebug("✅ Karakter berhasil dimuat.");
}, undefined, (err) => {
  logDebug("❌ Gagal memuat karakter:");
  logDebug(err.message || err);
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
