import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

console.log("hand_model.js loaded");

export function createFullHandWithArm() {
  const group = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xffcc99 });

  // Telapak tangan
  const palm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.2), skin);
  palm.position.set(0, 0, 0);
  group.add(palm);

  // Fungsi membuat jari
  function createFinger(xOffset, zOffset, jointCount = 3) {
    const fingerGroup = new THREE.Group();
    for (let i = 0; i < jointCount; i++) {
      const segment = new THREE.Mesh(
        new THREE.CylinderGeometry(0.015, 0.015, 0.07, 8),
        skin
      );
      segment.rotation.z = Math.PI / 2;
      segment.position.set(xOffset, 0.05 + i * 0.07, zOffset);
      fingerGroup.add(segment);
    }
    return fingerGroup;
  }

  // Jari-jari biasa (3 ruas)
  group.add(createFinger(0.1, -0.1));     // Telunjuk
  group.add(createFinger(0.05, -0.15));   // Tengah
  group.add(createFinger(0.0, -0.15));    // Manis
  group.add(createFinger(-0.05, -0.1));   // Kelingking

  // Ibu jari (2 ruas, miring ke samping)
  const thumb = createFinger(0.15, 0.05, 2);
  thumb.rotation.z = -0.5;
  group.add(thumb);

  // Lengan bawah
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.4, 12), skin);
  arm.rotation.x = Math.PI / 2;
  arm.position.set(0, -0.25, 0);
  group.add(arm);

  return group;
}
