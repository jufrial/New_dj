import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

export function createTorso() {
  const group = new THREE.Group();

  // Leher
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, 0.1, 16),
    new THREE.MeshStandardMaterial({ color: 0xffccaa })
  );
  neck.position.y = 1.5;
  group.add(neck);

  // Dada
  const chest = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.25, 0.35, 24),
    new THREE.MeshStandardMaterial({ color: 0x3366cc }) // Baju biru
  );
  chest.position.y = 1.25;
  group.add(chest);

  // Perut
  const waist = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.25, 24),
    new THREE.MeshStandardMaterial({ color: 0x3366cc }) // Lanjutan baju
  );
  waist.position.y = 0.95;
  group.add(waist);

  return group;
}

