// js/joystick.js
import { movement } from './movement.js';

const joystick = nipplejs.create({
  zone: document.body,
  mode: 'static',
  position: { left: '60px', bottom: '60px' },
  color: 'blue',
  size: 100
});

joystick.on('move', (evt, data) => {
  if (data && data.vector) {
    movement.x = data.vector.x;
    movement.y = data.vector.y;
  }
});

joystick.on('end', () => {
  movement.x = 0;
  movement.y = 0;
});
