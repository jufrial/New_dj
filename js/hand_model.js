import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

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

  // Elbow Joint
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

  // Simple Hand
  const hand = new THREE.Mesh(
    new THREE.BoxGeometry(0.15, 0.1, 0.2),
    skin
  );
  hand.position.set(0.5, 0, 0);
  group.add(hand);

  // Rotasi dan posisi untuk kiri/kanan
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
