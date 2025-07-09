import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

export function createArm(side = "left") {
  const arm = new THREE.Group();

  const upperArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 0.6, 12),
    new THREE.MeshStandardMaterial({ color: 0xffbbbb })
  );
  upperArm.position.y = -0.3;

  const lowerArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 0.5, 12),
    new THREE.MeshStandardMaterial({ color: 0xffbbbb })
  );
  lowerArm.position.y = -0.55;

  const elbow = new THREE.Object3D();
  elbow.position.y = -0.6;
  elbow.add(lowerArm);

  const armGroup = new THREE.Object3D();
  armGroup.add(upperArm);
  armGroup.add(elbow);

  arm.add(armGroup);

  if (side === "right") {
    arm.scale.x *= -1;
  }

  return arm;
}
