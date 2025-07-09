import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

export function createFullHandWithArm() {
  const group = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xffcc99 });

  // Telapak tangan
  const palm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.2), skin);
  palm.position.set(0, -0.1, -0.5);
  group.add(palm);

  // Fungsi membuat jari
  function createFinger(xOffset, zOffset, jointCount = 3) {
    const fingerGroup = new THREE.Group();
    for (let i = 0; i < jointCount; i++) {
      const segment = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.07), skin);
      segment.rotation.z = Math.PI / 2;
      segment.position.set(xOffset, -0.05, zOffset - i * 0.07);
      fingerGroup.add(segment);
    }
    return fingerGroup;
  }

  // Jari-jari
  group.add(createFinger(0.1, -0.6));    // Telunjuk
  group.add(createFinger(0.05, -0.6));   // Tengah
  group.add(createFinger(0.0, -0.6));    // Manis
  group.add(createFinger(-0.05, -0.6));  // Kelingking
  group.add(createFinger(0.15, -0.5, 2)); // Ibu jari

  // Lengan bawah
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.4), skin);
  arm.rotation.x = Math.PI / 2;
  arm.position.set(0, -0.3, -0.35);
  group.add(arm);

  return group;
}
