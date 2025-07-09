// js/arm.js
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

  // Sendi siku
  const elbow = new THREE.Object3D();
  elbow.position.y = -0.4;
  elbow.add(lowerArm);

  // Tangan
  const hand = createHand();
  hand.position.y = -0.25;
  elbow.add(hand);

  // Gabungkan semua ke grup
  arm.add(upperArm);
  arm.add(elbow);

  if (side === 'right') {
    arm.scale.x *= -1; // cerminkan sisi kanan
  }

  return arm;
}
