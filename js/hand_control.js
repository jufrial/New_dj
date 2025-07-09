export function setupAnalogControl(armsGroup) {
  const joystick = document.getElementById('joystick');
  let dragging = false;
  let startX, startY;

  joystick.addEventListener('touchstart', (e) => {
    dragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  joystick.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    armsGroup.rotation.y = dx * 0.005;
    armsGroup.rotation.x = dy * 0.005;
  });

  joystick.addEventListener('touchend', () => {
    dragging = false;
  });
}
