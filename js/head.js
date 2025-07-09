import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

export function createHead() {
  const group = new THREE.Group();

  // Kepala (warna kulit peach)
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xffccaa })
  );
  head.position.y = 1.6;
  group.add(head);

  // Rambut hitam sederhana (setengah bola)
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.21, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  hair.position.y = 1.6;
  group.add(hair);

  return group;
}

