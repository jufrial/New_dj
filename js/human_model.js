import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { createHead } from './head.js';
import { createTorso } from './torso.js';
import { createArms } from './arm.js';
import { createLegs } from './leg.js';

export function createHumanModel() {
  const human = new THREE.Group();

  // Tambahkan semua bagian tubuh
  const head = createHead();
  const torso = createTorso();
  const arms = createArms();
  const legs = createLegs();

  // Gabungkan posisi agar menyatu secara vertikal
  head.position.y = 0;
  torso.position.y = 0;
  arms.position.y = 0;
  legs.position.y = 0;

  // Tambah ke tubuh utama
  human.add(head);
  human.add(torso);
  human.add(arms);
  human.add(legs);

  // Optional: Skala jika tubuh terlalu besar/kecil
  human.scale.set(1, 1, 1);

  // Optional: Posisikan karakter di tengah dunia
  human.position.set(0, 0, 0);

  return human;
}
