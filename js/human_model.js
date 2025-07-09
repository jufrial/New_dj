
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

export function createHumanModel() {
  const group = new THREE.Group();

  const geometry = new THREE.CapsuleGeometry(0.3, 1.0, 4, 8);
  const material = new THREE.MeshStandardMaterial({ color: 0xffcccc });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 1;

  group.add(mesh);
  return group;
}
