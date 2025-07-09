import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

export function createArms() {
  const group = new THREE.Group();

  // Fungsi pembuat lengan (kiri/kanan)
  function createArm(side = 'left') {
    const armGroup = new THREE.Group();
    const isLeft = side === 'left';
    const xDir = isLeft ? -1 : 1;

    // Bahu
    const shoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xffccaa })
    );
    shoulder.position.set(0.3 * xDir, 1.4, 0);
    armGroup.add(shoulder);

    // Lengan atas
    const upperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.35, 16),
      new THREE.MeshStandardMaterial({ color: 0xffccaa })
    );
    upperArm.position.set(0.3 * xDir, 1.2, 0);
    upperArm.rotation.z = Math.PI / 12 * xDir;
    armGroup.add(upperArm);

    // Siku (sendi)
    const elbow = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xffccaa })
    );
    elbow.position.set(0.28 * xDir, 1.0, 0);
    armGroup.add(elbow);

    // Lengan bawah
    const lowerArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.065, 0.3, 16),
      new THREE.MeshStandardMaterial({ color: 0xffccaa })
    );
    lowerArm.position.set(0.26 * xDir, 0.83, 0);
    lowerArm.rotation.z = Math.PI / 18 * xDir;
    armGroup.add(lowerArm);

    // Tangan bulat
    const hand = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xffccaa })
    );
    hand.position.set(0.25 * xDir, 0.67, 0);
    armGroup.add(hand);

    return armGroup;
  }

  // Tambahkan kedua lengan
  group.add(createArm('left'));
  group.add(createArm('right'));

  return group;
}

