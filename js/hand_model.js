import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

function createFinger(lengths = [0.06, 0.05, 0.04], rotation = 0, offsetY = 0.03, isThumb = false) {
  const finger = new THREE.Group();
  const skinColors = [0xffd1a1, 0xffc19e, 0xffb08b];

  let x = 0;
  for (let i = 0; i < lengths.length; i++) {
    const segment = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012 - i * 0.002, 0.014 - i * 0.002, lengths[i], 12),
      new THREE.MeshStandardMaterial({ color: skinColors[i] || skinColors[2] })
    );
    segment.rotation.z = Math.PI / 2;
    segment.position.set(x + lengths[i] / 2, offsetY, 0);
    finger.add(segment);
    x += lengths[i];
  }

  finger.rotation.y = rotation;
  if (isThumb) finger.rotation.z = -0.4;
  return finger;
}

function createHandWithFingers(isLeft = false) {
  const hand = new THREE.Group();

  const palm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.12, 16),
    new THREE.MeshStandardMaterial({ color: 0xffcc99 })
  );
  palm.rotation.x = Math.PI / 2;
  palm.position.set(0, 0.03, 0);
  hand.add(palm);

  const wrist = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.075, 0.08, 12),
    new THREE.MeshStandardMaterial({ color: 0xffcc99 })
  );
  wrist.rotation.x = Math.PI / 2;
  wrist.position.set(0, -0.025, 0);
  hand.add(wrist);

  const fingerData = [
    { rot: 0.3, x: 0.04, y: 0.03, isThumb: true },
    { rot: 0, x: 0.06, y: 0.05 },
    { rot: 0, x: 0.0, y: 0.06 },
    { rot: 0, x: -0.05, y: 0.05 },
    { rot: -0.2, x: -0.08, y: 0.04 }
  ];

  for (let i = 0; i < fingerData.length; i++) {
    const d = fingerData[i];
    const finger = createFinger(
      d.isThumb ? [0.055, 0.04] : [0.06, 0.045, 0.035],
      d.rot,
      0,
      d.isThumb
    );
    finger.position.set(d.x, 0.09, d.y);
    hand.add(finger);
  }

  if (isLeft) {
    hand.scale.x *= -1;
    hand.position.x = -0.75;
  } else {
    hand.position.x = 0.75;
  }

  return hand;
}

function createArm(isLeft = false) {
  const group = new THREE.Group();

  // Upper arm: agak besar, menyempit
  const upper = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.09, 0.35, 14),
    new THREE.MeshStandardMaterial({ color: 0xffcc99 })
  );
  upper.rotation.z = Math.PI / 2;
  upper.position.set(0, 0, 0);
  group.add(upper);

  // Siku: bentuk bulat alami, bukan bola penuh
  const elbow = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 14, 14, 0, Math.PI * 2, 0, Math.PI / 1.5),
    new THREE.MeshStandardMaterial({ color: 0xffbb88 })
  );
  elbow.rotation.z = Math.PI / 2;
  elbow.position.set(0.19, 0, 0);
  group.add(elbow);

  // Forearm: lebih ramping, menyempit ke pergelangan
  const forearm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.085, 0.065, 0.35, 14),
    new THREE.MeshStandardMaterial({ color: 0xffcc99 })
  );
  forearm.rotation.z = Math.PI / 2;
  forearm.position.set(0.36, 0, 0);
  group.add(forearm);

  // Hand
  const hand = createHandWithFingers(isLeft);
  hand.position.set(0.52, 0, 0);
  group.add(hand);

  if (isLeft) {
    group.scale.x *= -1;
    group.position.x = -0.25;
  } else {
    group.position.x = 0.25;
  }

  return group;
}

export function createDualArms() {
  const arms = new THREE.Group();
  arms.add(createArm(false)); // kanan
  arms.add(createArm(true));  // kiri
  return arms;
}
