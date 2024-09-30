const player = document.getElementById('player');
const game = document.getElementById('game');
const platforms = document.querySelectorAll('.platform');

let playerSpeed = 5;
let gravity = 0.5;
let isJumping = false;
let velocityY = 0;
let keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function gameLoop() {
    // Horizontal movement
    if (keys['ArrowRight'] || keys['d']) {
        player.style.left = player.offsetLeft + playerSpeed + 'px';
    } else if (keys['ArrowLeft'] || keys['a']) {
        player.style.left = player.offsetLeft - playerSpeed + 'px';
    }

    // Jumping
    if ((keys['ArrowUp'] || keys['w']) && !isJumping) {
        isJumping = true;
        velocityY = -10;
    }

    // Apply gravity
    if (isJumping) {
        velocityY += gravity;
        player.style.top = player.offsetTop + velocityY + 'px';
    }

    // Collision detection with platforms
    platforms.forEach(platform => {
        if (player.offsetLeft < platform.offsetLeft + platform.offsetWidth &&
            player.offsetLeft + player.offsetWidth > platform.offsetLeft &&
            player.offsetTop < platform.offsetTop + platform.offsetHeight &&
            player.offsetTop + player.offsetHeight > platform.offsetTop) {
            isJumping = false;
            velocityY = 0;
            player.style.top = platform.offsetTop - player.offsetHeight + 'px';
        }
    });

    // Prevent player from falling out of the game area
    if (player.offsetTop + player.offsetHeight > game.offsetHeight) {
        isJumping = false;
        velocityY = 0;
        player.style.top = game.offsetHeight - player.offsetHeight + 'px';
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();