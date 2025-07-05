const player = document.getElementById('player');
let moveSpeed = 2;
let mood = "normal"; // normal, pelan, takut, lari, terbirit

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

document.addEventListener('keydown', (e) => {
  if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
  if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
});

function updateMood(m) {
  switch (m) {
    case '1': mood = "pelan"; break;
    case '2': mood = "takut"; break;
    case '3': mood = "lari"; break;
    case '4': mood = "terbirit"; break;
    default: mood = "normal";
  }
}

function movePlayer() {
  let x = parseInt(player.style.left || '100');
  let y = parseInt(player.style.top || '100');

  switch (mood) {
    case "pelan": moveSpeed = 1; break;
    case "takut": moveSpeed = 1.5; break;
    case "lari": moveSpeed = 3; break;
    case "terbirit": moveSpeed = 4; break;
    default: moveSpeed = 2;
  }

  if (keys.ArrowUp) y -= moveSpeed;
  if (keys.ArrowDown) y += moveSpeed;
  if (keys.ArrowLeft) x -= moveSpeed;
  if (keys.ArrowRight) x += moveSpeed;

  player.style.left = x + 'px';
  player.style.top = y + 'px';

  requestAnimationFrame(movePlayer);
}

movePlayer();
