import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createHead } from './head.js';
import { createTorso } from './torso.js';
import { createArms } from './arm.js';
import { createLegs } from './leg.js';

export function createHumanModel() {
  const human = new THREE.Group();

  human.add(createHead());
  human.add(createTorso());
  human.add(createArms());
  human.add(createLegs());

  return human;
}
