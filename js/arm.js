// File: js/arm.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createHand } from './hand_model.js';

export function createArm(side = 'left') {
  const arm = new THREE.Group();

  // Upper arm
  const upperArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 0.4, 12),
    new THREE.MeshStandardMaterial({ color: 0xffbb99 })
  );
  upperArm.position.y = -0.2;

  // Lower arm
  const lowerArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.4, 12),
    new THREE.MeshStandardMaterial({ color: 0xffaa88 })
  );
  lowerArm.position.y = -0.5;

  // Sambung tangan ke bawah lengan
  const hand = createHand();
  hand.position.y = -0.25;

  // Gabung ke objek elbow
  const elbow = new THREE.Group();
  elbow.position.y = -0.4;
  elbow.add(lowerArm);
  elbow.add(hand);

  // Gabungkan ke lengan utama
  arm.add(upperArm);
  arm.add(elbow);

  // Posisi dan orientasi untuk sisi kanan
  if (side === 'right') {
    arm.scale.x *= -1;
  }

  return arm;
}
