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

  const fingerPositions = [
    { x: 0.07, z: 0.0, rotY: 0.5, isThumb: true },    // Jempol
    { x: 0.035, z: 0.05, rotY: 0.2 },                 // Telunjuk
    { x: 0.0, z: 0.055, rotY: 0.0 },                  // Tengah
    { x: -0.035, z: 0.05, rotY: -0.2 },               // Manis
    { x: -0.07, z: 0.03, rotY: -0.4 }                 // Kelingking
  ];

  for (const data of fingerPositions) {
    const finger = createFinger(
      data.isThumb ? [0.055, 0.04] : [0.06, 0.045, 0.035],
      data.rotY,
      0,
      data.isThumb
    );
    finger.position.set(data.x, 0.09, data.z);
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
    new THREE.CylinderGeometry(0.11, 0.09, 0.35, 14),
    skin
  );
  upper.rotation.z = Math.PI / 2;
  upper.position.set(0, 0, 0);
  group.add(upper);

  const elbow = new THREE.Mesh(
    new THREE.SphereGeometry(0.085, 14, 14, 0, Math.PI * 2, 0, Math.PI / 1.5),
    new THREE.MeshStandardMaterial({ color: 0xffbb88 })
  );
  elbow.rotation.z = Math.PI / 2;
  elbow.position.set(0.19, 0, 0);
  group.add(elbow);

  const forearm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.085, 0.065, 0.35, 14),
    skin
  );
  forearm.rotation.z = Math.PI / 2;
  forearm.position.set(0.36, 0, 0);
  group.add(forearm);

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
  arms.add(createArm(false)); // Tangan kanan
  arms.add(createArm(true));  // Tangan kiri
  return arms;
}
