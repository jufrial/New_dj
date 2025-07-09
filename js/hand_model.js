import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

function createFinger(lengths = [0.06, 0.05, 0.04], rotation = 0, offsetY = 0.03, isThumb = false) {
  const finger = new THREE.Group();

  const colorRuas = [
    0xffd1a1, // dasar jari (coklat muda)
    0xffc19e, // tengah
    0xffb08b  // ujung (lebih kemerahan)
  ];

  let x = 0;
  for (let i = 0; i < lengths.length; i++) {
    const segment = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012 - i * 0.002, 0.014 - i * 0.002, lengths[i], 8),
      new THREE.MeshStandardMaterial({ color: colorRuas[i] || 0xffb08b })
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
  const palmColor = 0xffcc99;
  const palm = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.1, 0.2),
    new THREE.MeshStandardMaterial({ color: palmColor })
  );
  palm.position.set(0, 0, 0);
  hand.add(palm);

  // Posisi & rotasi jari
  const fingerData = [
    { rot: 0.3, x: 0.04, y: 0.03, isThumb: true },  // Thumb
    { rot: 0, x: 0.06, y: 0.05 },   // Index
    { rot: 0, x: 0.0, y: 0.06 },    // Middle
    { rot: 0, x: -0.05, y: 0.05 },  // Ring
    { rot: -0.2, x: -0.08, y: 0.04 } // Pinky
  ];

  for (let i = 0; i < fingerData.length; i++) {
    const d = fingerData[i];
    const finger = createFinger(
      d.isThumb ? [0.06, 0.045] : [0.06, 0.045, 0.035],
      d.rot,
      0,
      d.isThumb
    );
    finger.position.set(d.x, 0.05, d.y);
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
  const skin = new THREE.MeshStandardMaterial({ color: 0xffcc99 });

  const upper = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.1, 0.35, 12),
    skin
  );
  upper.rotation.z = Math.PI / 2;
  upper.position.set(0, 0, 0);
  group.add(upper);

  const elbow = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 12, 12),
    skin
  );
  elbow.position.set(0.18, 0, 0);
  group.add(elbow);

  const forearm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.08, 0.35, 12),
    skin
  );
  forearm.rotation.z = Math.PI / 2;
  forearm.position.set(0.36, 0, 0);
  group.add(forearm);

  const hand = createHandWithFingers(isLeft);
  hand.position.set(0.5, 0, 0);
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
