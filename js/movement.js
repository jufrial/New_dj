// File: js/movement.js
// Kontrol sederhana: WASD untuk gerak, panah untuk rotasi
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
    if (move.forward) human.position.z -= speed;
    if (move.backward) human.position.z += speed;
    if (move.left) human.position.x -= speed;
    if (move.right) human.position.x += speed;
    if (rotate.left) human.rotation.y += rotSpeed;
    if (rotate.right) human.rotation.y -= rotSpeed;

    requestAnimationFrame(update);
  }
  update();
      }
