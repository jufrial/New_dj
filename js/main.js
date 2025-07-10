// ... kode sebelumnya (scene, camera, renderer, dsb) ...

// Tambahkan model manusia
const human = createHumanModel();
scene.add(human);

// ==========================
// LANTAI REALISTIK MULAI DI SINI
// ==========================
const textureLoader = new THREE.TextureLoader();

// Gunakan tekstur grid default Three.js (bisa diganti tekstur sendiri)
const floorTexture = textureLoader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(8, 8); // 8x8 ubin besar

const floorNormalMap = textureLoader.load('https://threejs.org/examples/textures/water/Water_1_M_Normal.jpg');
floorNormalMap.wrapS = floorNormalMap.wrapT = THREE.RepeatWrapping;
floorNormalMap.repeat.set(8, 8);

const floorMat = new THREE.MeshStandardMaterial({
  map: floorTexture,
  normalMap: floorNormalMap,
  roughness: 0.33,     // agak mengkilap
  metalness: 0.14,     // sedikit refleksi
  color: 0xffffff,
});

const floorSize = 40;
const floorGeo = new THREE.PlaneGeometry(floorSize, floorSize);
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Grid garis ubin
const gridHelper = new THREE.GridHelper(floorSize, 16, 0xffffff, 0xcccccc);
gridHelper.position.y = 0.02;
scene.add(gridHelper);

// Extra pencahayaan ke bawah agar lantai lebih hidup
const floorLight = new THREE.DirectionalLight(0xffffff, 0.4);
floorLight.position.set(0, 10, 0);
scene.add(floorLight);

// Ambient light lembut
scene.add(new THREE.AmbientLight(0xffffff, 0.35));

// ==========================
// LANTAI SELESAI, lanjut rumah seperti biasa
// ==========================

// RUMAH SEDERHANA
const rumah = new THREE.Group();

// Tembok rumah (kotak)
const dinding = new THREE.Mesh(
  new THREE.BoxGeometry(3, 2, 3),
  new THREE.MeshStandardMaterial({ color: 0xd2b48c })
);
dinding.position.set(7, 1, 0);
rumah.add(dinding);

// Atap rumah (kerucut)
const atap = new THREE.Mesh(
  new THREE.ConeGeometry(2.1, 1.2, 4),
  new THREE.MeshStandardMaterial({ color: 0x884422 })
);
atap.position.set(7, 2.6, 0);
atap.rotation.y = Math.PI / 4;
rumah.add(atap);

scene.add(rumah);

// ...lanjut kode joystick, render loop, dsb...
