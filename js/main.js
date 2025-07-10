import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { setupMovementWithJoystick } from './movement.js';
import { createHumanModel } from './human_model/human_model.js';

// SCENE SETUP
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222244);

// KAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Kamera agak tinggi dan mundur, menghadap ke tengah lantai
camera.position.set(0, 5.5, 13);
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// ==========================
// LANTAI REALISTIK
// ==========================
const textureLoader = new THREE.TextureLoader();

const floorTexture = textureLoader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(8, 8);

const floorNormalMap = textureLoader.load('https://threejs.org/examples/textures/water/Water_1_M_Normal.jpg');
floorNormalMap.wrapS = floorNormalMap.wrapT = THREE.RepeatWrapping;
floorNormalMap.repeat.set(8, 8);

const floorMat = new THREE.MeshStandardMaterial({
  map: floorTexture,
  normalMap: floorNormalMap,
  roughness: 0.33,
  metalness: 0.14,
  color: 0xffffff,
});

const floorSize = 40;
const floorGeo = new THREE.PlaneGeometry(floorSize, floorSize);
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0; // lantai di y=0
floor.receiveShadow = true;
scene.add(floor);

const gridHelper = new THREE.GridHelper(floorSize, 16, 0xffffff, 0xcccccc);
gridHelper.position.y = 0.01;
scene.add(gridHelper);

const floorLight = new THREE.DirectionalLight(0xffffff, 0.4);
floorLight.position.set(0, 10, 0);
scene.add(floorLight);

scene.add(new THREE.AmbientLight(0xffffff, 0.35));

// ==========================
// MODEL MANUSIA - posisi di atas lantai
// ==========================
const human = createHumanModel();
human.position.set(0, 1, 0); // y=1 agar kaki pas di atas lantai
scene.add(human);

// ==========================
// RUMAH REALISTIK SEDERHANA
// ==========================
const rumah = new THREE.Group();

// Dinding depan
const tembokDepan = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 0.2),
  new THREE.MeshStandardMaterial({ color: 0xf6e3b4 })
);
tembokDepan.position.set(12, 1.25, 2);
rumah.add(tembokDepan);

// Dinding belakang
const tembokBelakang = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 0.2),
  new THREE.MeshStandardMaterial({ color: 0xf6e3b4 })
);
tembokBelakang.position.set(12, 1.25, -2);
rumah.add(tembokBelakang);

// Dinding kiri
const tembokKiri = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 2.5, 4),
  new THREE.MeshStandardMaterial({ color: 0xe4cb9c })
);
tembokKiri.position.set(10, 1.25, 0);
rumah.add(tembokKiri);

// Dinding kanan
const tembokKanan = new THREE.Mesh(
  new THREE.BoxGeometry(0.2, 2.5, 4),
  new THREE.MeshStandardMaterial({ color: 0xe4cb9c })
);
tembokKanan.position.set(14, 1.25, 0);
rumah.add(tembokKanan);

// LANTAI RUMAH
const lantaiRumah = new THREE.Mesh(
  new THREE.BoxGeometry(4.05, 0.1, 4.05),
  new THREE.MeshStandardMaterial({ color: 0xcbb893 })
);
lantaiRumah.position.set(12, 0.05, 0);
rumah.add(lantaiRumah);

// ATAP RUMAH (atap pelana sederhana)
const atapKiri = new THREE.Mesh(
  new THREE.BoxGeometry(4.2, 0.15, 2.3),
  new THREE.MeshStandardMaterial({ color: 0xa55722 })
);
atapKiri.position.set(12, 2.1, -1.15);
atapKiri.rotation.x = Math.PI / 10;
rumah.add(atapKiri);

const atapKanan = new THREE.Mesh(
  new THREE.BoxGeometry(4.2, 0.15, 2.3),
  new THREE.MeshStandardMaterial({ color: 0xa55722 })
);
atapKanan.position.set(12, 2.1, 1.15);
atapKanan.rotation.x = -Math.PI / 10;
rumah.add(atapKanan);

// PINTU
const pintu = new THREE.Mesh(
  new THREE.BoxGeometry(0.8, 1.4, 0.09),
  new THREE.MeshStandardMaterial({ color: 0x885533 })
);
pintu.position.set(12, 0.7, 2.15);
rumah.add(pintu);

// JENDELA KIRI DEPAN
const jendelaKiri = new THREE.Mesh(
  new THREE.BoxGeometry(0.6, 0.6, 0.08),
  new THREE.MeshStandardMaterial({ color: 0x99ccff, transparent: true, opacity: 0.7 })
);
jendelaKiri.position.set(10.9, 1.4, 2.15);
rumah.add(jendelaKiri);

// JENDELA KANAN DEPAN
const jendelaKanan = new THREE.Mesh(
  new THREE.BoxGeometry(0.6, 0.6, 0.08),
  new THREE.MeshStandardMaterial({ color: 0x99ccff, transparent: true, opacity: 0.7 })
);
jendelaKanan.position.set(13.1, 1.4, 2.15);
rumah.add(jendelaKanan);

scene.add(rumah);

// ==========================
// LAMPU UTAMA
// ==========================
scene.add(new THREE.AmbientLight(0xffffff, 0.7));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// ==========================
// JOYSTICK
// ==========================
const joystick = nipplejs.create({
  zone: document.getElementById('joystick-zone'),
  mode: 'static',
  position: { left: '50%', top: '50%' },
  color: 'blue'
});
setupMovementWithJoystick(human, joystick);

// ==========================
// RENDER LOOP
// ==========================
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