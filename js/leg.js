import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';

export function createLegs() {
  const group = new THREE.Group();

  // Fungsi pembuat kaki (kiri/kanan)
  function createLeg(side = 'left') {
    const legGroup = new THREE.Group();
    const isLeft = side === 'left';
    const xDir = isLeft ? -1 : 1;

    // Paha
    const thigh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.1, 0.4, 16),
      new THREE.MeshStandardMaterial({ color: 0xffccaa })
    );
    thigh.position.set(0.15 * xDir, 0.65, 0);
    legGroup.add(thigh);

    // Lutut
    const knee = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xffccaa })
    );
    knee.position.set(0.15 * xDir, 0.45, 0);
    legGroup.add(knee);

    // Betis
    const shin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.07, 0.4, 16),
      new THREE.MeshStandardMaterial({ color: 0xffccaa })
    );
    shin.position.set(0.15 * xDir, 0.25, 0);
    legGroup.add(shin);

    // Pergelangan kaki
    const ankle = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xffccaa })
    );
    ankle.position.set(0.15 * xDir, 0.05, 0);
    legGroup.add(ankle);

    // Kaki (ujung)
    const foot = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.05, 0.25),
      new THREE.MeshStandardMaterial({ color: 0x333333 }) // Sepatu hitam
    );
    foot.position.set(0.15 * xDir, 0, 0.1);
    legGroup.add(foot);

    return legGroup;
  }

  // Tambahkan kedua kaki
  group.add(createLeg('left'));
  group.add(createLeg('right'));

  return group;
                       }
  
