import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createHand } from './hand_model.js';

export function createArm(side = "left") {
  const arm = new THREE.Group();

  // Bahan & warna
  const upperArmMaterial = new THREE.MeshStandardMaterial({ color: 0xffcccc });
  const lowerArmMaterial = new THREE.MeshStandardMaterial({ color: 0xffbbbb });

  // Lengan atas (dari bahu ke siku)
  const upperArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.08, 0.5, 12),
    upperArmMaterial
  );
  upperArm.position.y = -0.25;

  // Lengan bawah (dari siku ke pergelangan)
  const lowerArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.07, 0.4, 12),
    lowerArmMaterial
  );
  lowerArm.position.y = -0.2;

  // Objek siku (pivot)
  const elbow = new THREE.Object3D();
  elbow.position.y = -0.5;
  elbow.add(lowerArm);

  // Tambahkan tangan dari hand_model.js
  const hand = createHand();
  hand.position.y = -0.25;
  lowerArm.add(hand);

  // Satukan semua ke dalam grup
  arm.add(upperArm);
  arm.add(elbow);

  // Jika sisi kanan, balik sumbu X
  if (side === "right") {
    arm.scale.x *= -1;
  }

  return arm;
}
