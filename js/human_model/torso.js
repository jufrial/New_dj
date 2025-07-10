import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

export function createTorso() {
  const torso = new THREE.Group();

  // Bagian dada (lebih lebar)
  const upperTorso = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.4, 0.6, 16),
    new THREE.MeshStandardMaterial({ color: 0xffaaaa })
  );
  upperTorso.position.y = 0.6;
  torso.add(upperTorso);

  // Bagian perut (lebih ramping)
  const lowerTorso = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.35, 0.6, 16),
    new THREE.MeshStandardMaterial({ color: 0xff9999 })
  );
  lowerTorso.position.y = 0.3;
  torso.add(lowerTorso);

  return torso;
}
