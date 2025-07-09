import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

function createFinger(lengths = [0.06, 0.05, 0.04], rotation = 0, offsetY = 0.03) {
  const finger = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xffcc99 });

  let x = 0;
  for (let i = 0; i < lengths.length; i++) {
    const segment = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.01, lengths[i], 8),
      skin
    );
    segment.rotation.z = Math.PI / 2;
    segment.position.set(x + lengths[i] / 2, offsetY, 0);
    finger.add(segment);
    x += lengths[i];
  }

  finger.rotation.y = rotation;
  return finger;
}

function createHandWithFingers(isLeft = false) {
  const hand = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xffcc99 });

  // Palm
  const palm = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.1, 0.2),
    skin
  );
  palm.position.set(0, 0, 0);
  hand.add(palm);

  // Jari-jari (5 jari)
  const fingerData = [
    { rot: 0.3, x: 0.03, y: 0.03 },  // Thumb (2 ruas)
    { rot: 0, x: 0.05, y: 0.05 },   // Index
    { rot: 0, x: 0.0, y: 0.06 },    // Middle
    { rot: 0, x: -0.05, y: 0.05 },  // Ring
    { rot: -0.2, x: -0.08, y: 0.04 } // Pinky
  ];

  for (let i = 0; i < fingerData.length; i++) {
    const data = fingerData[i];
    const finger = createFinger(i === 0 ? [0.06, 0.05] : [0.06, 0.05, 0.04], data.rot, 0);
    finger.position.set(data.x, 0.05, data.y);
    hand.add(finger);
  }

  // Flip untuk tangan kiri
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

  // Upper Arm
  const upper = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.1, 0.35, 12),
    skin
  );
  upper.rotation.z = Math.PI / 2;
  upper.position.set(0, 0, 0);
  group.add(upper);

  // Elbow
  const elbow = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 12, 12),
    skin
  );
  elbow.position.set(0.18, 0, 0);
  group.add(elbow);

  // Forearm
  const forearm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.08, 0.35, 12),
    skin
  );
  forearm.rotation.z = Math.PI / 2;
  forearm.position.set(0.36, 0, 0);
  group.add(forearm);

  // Hand with fingers
  const hand = createHandWithFingers(isLeft);
  hand.position.set(0.5, 0, 0);
  group.add(hand);

  // Posisi untuk kiri/kanan
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
  arms.add(createArm(false)); // Right arm
  arms.add(createArm(true));  // Left arm
  return arms;
}
