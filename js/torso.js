import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

export function createTorso() {
  const torsoGeometry = new THREE.CylinderGeometry(0.3, 0.4, 1.2, 16);
  const torsoMaterial = new THREE.MeshStandardMaterial({ color: 0xffaaaa });
  const torso = new THREE.Mesh(torsoGeometry, torsoMaterial);
  torso.position.y = 0.9;
  return torso;
}
