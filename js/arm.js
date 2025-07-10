// js/arm.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createHand } from './hand_model.js';

export function createArm(side = "left") {
  const arm = new THREE.Group();

  const upperArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.07, 0.5, 12),
    new THREE.MeshStandardMaterial({ color: 0xffbbbb })
  );
  upperArm.position.y = -0.25;

  const lowerArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.06, 0.4, 12),
    new THREE.MeshStandardMaterial({ color: 0xffbbbb })
  );
  lowerArm.position.y = -0.45;

  const elbow = new THREE.Object3D();
  elbow.position.y = -0.5;
  elbow.add(lowerArm);

  const hand = createHand();
  hand.position.y = -0.45;
  lowerArm.add(hand);

  const armGroup = new THREE.Object3D();
  armGroup.add(upperArm);
  armGroup.add(elbow);

  arm.add(armGroup);

  if (side === "right") {
    arm.scale.x *= -1;
  }

  return arm;
}
