import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createHand } from './hand_model.js';

export function createArm(side = "left") {
  const arm = new THREE.Group();

  const upperArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.09, 0.5, 12),
    new THREE.MeshStandardMaterial({ color: 0xffaaaa })
  );
  upperArm.position.y = -0.25;

  const lowerArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, 0.45, 12),
    new THREE.MeshStandardMaterial({ color: 0xffaaaa })
  );
  lowerArm.position.y = -0.5;

  const elbow = new THREE.Object3D();
  elbow.position.y = -0.5;
  elbow.add(lowerArm);

  const hand = createHand();
  hand.position.y = -0.45;
  lowerArm.add(hand);

  arm.add(upperArm);
  arm.add(elbow);

  if (side === "right") {
    arm.scale.x *= -1;
  }

  return arm;
      }
