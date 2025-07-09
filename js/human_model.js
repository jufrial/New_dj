import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

export function createHumanModel() {
  const human = new THREE.Group();

  // Kepala
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xffccaa })
  );
  head.position.y = 1.6;
  human.add(head);

  // Leher
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, 0.1, 16),
    new THREE.MeshStandardMaterial({ color: 0xffccaa })
  );
  neck.position.y = 1.5;
  human.add(neck);

  // Dada
  const chest = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.25, 0.35, 24),
    new THREE.MeshStandardMaterial({ color: 0x3366cc })
  );
  chest.position.y = 1.25;
  human.add(chest);

  // Pinggang
  const waist = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 0.25, 24),
    new THREE.MeshStandardMaterial({ color: 0x3366cc })
  );
  waist.position.y = 0.95;
  human.add(waist);

  // Lengan Kiri
  const upperArmLeft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, 0.35, 16),
    new THREE.MeshStandardMaterial({ color: 0xffccaa })
  );
  upperArmLeft.position.set(-0.3, 1.2, 0);
  upperArmLeft.rotation.z = Math.PI / 12;
  human.add(upperArmLeft);

  const lowerArmLeft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.065, 0.3, 16),
    new THREE.MeshStandardMaterial({ color: 0xffccaa })
  );
  lowerArmLeft.position.set(-0.4, 0.9, 0);
  lowerArmLeft.rotation.z = Math.PI / 12;
  human.add(lowerArmLeft);

  const handLeft = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xffccaa })
  );
  handLeft.position.set(-0.4, 0.7, 0);
  human.add(handLeft);

  // Lengan Kanan
  const upperArmRight = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, 0.35, 16),
    new THREE.MeshStandardMaterial({ color: 0xffccaa })
  );
  upperArmRight.position.set(0.3, 1.2, 0);
  upperArmRight.rotation.z = -Math.PI / 12;
  human.add(upperArmRight);

  const lowerArmRight = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.065, 0.3, 16),
    new THREE.MeshStandardMaterial({ color: 0xffccaa })
  );
  lowerArmRight.position.set(0.4, 0.9, 0);
  lowerArmRight.rotation.z = -Math.PI / 12;
  human.add(lowerArmRight);

  const handRight = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xffccaa })
  );
  handRight.position.set(0.4, 0.7, 0);
  human.add(handRight);

  // Kaki Kiri
  const legLeft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.1, 0.4, 16),
    new THREE.MeshStandardMaterial({ color: 0xffccaa })
  );
  legLeft.position.set(-0.15, 0.5, 0);
  human.add(legLeft);

  // Kaki Kanan
  const legRight = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.1, 0.4, 16),
    new THREE.MeshStandardMaterial({ color: 0xffccaa })
  );
  legRight.position.set(0.15, 0.5, 0);
  human.add(legRight);

  return human;
}
