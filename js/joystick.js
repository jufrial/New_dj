// File: js/joystick.js
// Dummy joystick virtual, bisa diganti dengan UI sebenarnya
export function setupJoystick(human) {
  // Contoh: setiap detik, goyangkan badan kiri-kanan
  let t = 0;
  function wiggle() {
    t += 0.05;
    human.rotation.z = Math.sin(t) * 0.1;
    requestAnimationFrame(wiggle);
  }
  wiggle();
}
