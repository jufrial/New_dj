// File: js/arm.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createHand } from './hand_model.js';

export function createArm(side = 'left') {
  const arm = new THREE.Group();

  // Lengan atas
  const upperArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.09, 0.4, 12),
    new THREE.MeshStandardMaterial({ color: 0xffbb99 })
  );
  upperArm.position.y = -0.2;

  // Lengan bawah
  const lowerArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, 0.4, 12),
    new THREE.MeshStandardMaterial({ color: 0xffaa88 })
  );
  lowerArm.position.y = -0.25;

  // Elbow (sambungan)
  const elbow = new THREE.Object3D();
  elbow.position.y = -0.4;
  elbow.add(lowerArm);

  // Tangan (hand)
  const hand = createHand();
  hand.position.y = -0.25;
  elbow.add(hand);

  // Gabung semua ke grup utama arm
  arm.add(upperArm);
  arm.add(elbow);

  // Jika sisi kanan, balik skalanya agar simetris
  if (side === 'right') {
    arm.scale.x *= -1;
  }

  return arm;
}
