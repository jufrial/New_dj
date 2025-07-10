// js/human_model.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createHead } from './head.js';
import { createArm } from './arm.js';
import { createLeg } from './leg.js';
import { createTorso } from './torso.js';


export function createHumanModel() {
  const model = new THREE.Group();

  const torso = createTorso();
  const head = createHead();
  const leftArm = createArm('left');
  const rightArm = createArm('right');
  const leftLeg = createLeg('left');
  const rightLeg = createLeg('right');

  leftArm.name = 'leftArm';
  rightArm.name = 'rightArm';

  torso.add(head);
  head.position.y = 0.9;

  leftArm.position.set(-0.35, 0.5, 0);
  rightArm.position.set(0.35, 0.5, 0);

  leftLeg.position.set(-0.18, -0.9, 0);
  rightLeg.position.set(0.18, -0.9, 0);

  torso.add(leftArm);
  torso.add(rightArm);
  torso.add(leftLeg);
  torso.add(rightLeg);

  model.add(torso);
  return model;
}
