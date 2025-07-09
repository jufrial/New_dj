import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

export function createHand() {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color: 0xffcc99 });

  // Telapak tangan
  const palm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.2), material);
  palm.position.set(0, -0.1, -0.5);
  group.add(palm);

  // Jari telunjuk
  const finger = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.2), material);
  finger.rotation.z = Math.PI / 2;
  finger.position.set(0.1, -0.05, -0.65);
  group.add(finger);

  return group;
}