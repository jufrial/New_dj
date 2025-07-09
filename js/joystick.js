export const movement = { x: 0, y: 0 };

const joystick = document.getElementById("joystick");

let startX, startY;

joystick.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

joystick.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  const deltaX = touch.clientX - startX;
  const deltaY = touch.clientY - startY;

  movement.x = deltaX / 50;
  movement.y = deltaY / 50;
});

joystick.addEventListener("touchend", () => {
  movement.x = 0;
  movement.y = 0;
});
