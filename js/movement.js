export function setupMovement(human, camera) {
  let move = { forward: 0, backward: 0, left: 0, right: 0 };
  let rotate = { left: 0, right: 0 };

  window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW') move.forward = 1;
    if (e.code === 'KeyS') move.backward = 1;
    if (e.code === 'KeyA') move.left = 1;
    if (e.code === 'KeyD') move.right = 1;
    if (e.code === 'ArrowLeft') rotate.left = 1;
    if (e.code === 'ArrowRight') rotate.right = 1;
  });

  window.addEventListener('keyup', (e) => {
    if (e.code === 'KeyW') move.forward = 0;
    if (e.code === 'KeyS') move.backward = 0;
    if (e.code === 'KeyA') move.left = 0;
    if (e.code === 'KeyD') move.right = 0;
    if (e.code === 'ArrowLeft') rotate.left = 0;
    if (e.code === 'ArrowRight') rotate.right = 0;
  });

  function update() {
    let speed = 0.05;
    let rotSpeed = 0.04;
    // Gunakan rotasi untuk arah gerak relatif
    let direction = new THREE.Vector3();
    if (move.forward) direction.z -= 1;
    if (move.backward) direction.z += 1;
    if (move.left) direction.x -= 1;
    if (move.right) direction.x += 1;
    direction.normalize();

    // Rotasi tubuh
    if (rotate.left) human.rotation.y += rotSpeed;
    if (rotate.right) human.rotation.y -= rotSpeed;

    // Transformasi arah sesuai rotasi
    if (direction.length() > 0) {
      direction.applyAxisAngle(new THREE.Vector3(0,1,0), human.rotation.y);
      human.position.addScaledVector(direction, speed);
    }

    requestAnimationFrame(update);
  }
  update();
      }
