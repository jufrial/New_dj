// js/hand_model.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

export function createHand() {
  const hand = new THREE.Group();

  // Telapak tangan
  const palm = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.08, 0.15),
    new THREE.MeshStandardMaterial({ color: 0xffbbbb })
  );
  palm.position.set(0, 0, 0);
  hand.add(palm);

  // Jari-jari
  const fingerGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.08, 8);
  const fingerMaterial = new THREE.MeshStandardMaterial({ color: 0xffcccc });

  for (let i = 0; i < 4; i++) {
    const finger = new THREE.Mesh(fingerGeometry, fingerMaterial);
    finger.rotation.z = Math.PI / 2;
    finger.position.set(-0.06 + i * 0.04, 0, 0.1);
    hand.add(finger);
  }

  // Jempol
  const thumb = new THREE.Mesh(fingerGeometry, fingerMaterial);
  thumb.rotation.x = Math.PI / 4;
  thumb.position.set(-0.07, -0.02, 0.05);
  hand.add(thumb);

  return hand;
}
