const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight+250;

// Update canvas dimensions on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-500;
    ground.width = canvas.width + 1000; // Update ground width to match new canvas width
    ground.y = canvas.height; // Update ground position to match new canvas height
});

const player = {
    x: 950,
    y: canvas.height / 2,
    x_v: 0,
    y_v: 0,
    jump: true,
    width: 40,
    height: 40
};

const backgroundMusic = document.getElementById("background-music");
backgroundMusic.volume = 0.5;
backgroundMusic.play();

const platforms = [
    { x: 1100, y: 400, width: 100, height: 10 },
    { x: 900, y: 500, width: 100, height: 10 }
];

const transportPlatform = { x: 1300, y: 500, width: 200, height: 20, url: 'index.html' };

platforms.push(transportPlatform);

const ground = {
    x: 0,
    y: 600, // Elevate slightly below the lower part of the screen
    width: canvas.width + 10000,   // Span the entire width of the canvas
    height: 500             // Adjust the height as needed
};

// Define the wall objec
const wall = {
    x: -600,
    y: -1000,
    width: 800, // Width of the wall
    height: 1000000,
    color: "green"};

const keys = {
    left: false,
    right: false,
    up: false
};

// Add collision detection for the wall
function checkWallCollision() {
    if (player.x < wall.x + wall.width && player.x + player.width > wall.x &&
        player.y < wall.y + wall.height && player.y + player.height > wall.y) {
        if (player.x_v < 0) {
            player.x = wall.x + wall.width;
        }
        player.x_v = 0;
    }
}

function renderWall() {
    ctx.fillStyle = wall.color;
    ctx.fillRect(wall.x - camera.x, wall.y - camera.y, wall.width, wall.height);
}

const image = new Image();
    image.src = 'Images/Fortune2_1280x720.jpeg'; // Replace with the path to your image

// const iframe = document.createElement('iframe');
// iframe.src = 'html/Hello_Word.html'; // Replace with the correct path to your local webpage
// iframe.style.position = 'absolute';
// iframe.style.width = '320px';
// iframe.style.height = '180px';
// iframe.style.top = '10px'; // Adjust the position as needed
// iframe.style.left = '10px'; // Adjust the position as needed
// iframe.style.border = '1px solid black';
// document.body.appendChild(iframe);

// const iframe = document.createElement('iframe');
// iframe.src = 'Brief 2 Codewords/index.html'; // Replace with the correct path to your local webpage
// iframe.style.position = 'absolute';
// iframe.style.width = '320px';
// iframe.style.height = '180px';
// iframe.style.top = '10px'; // Adjust the position as needed
// iframe.style.left = '10px'; // Adjust the position as needed
// iframe.style.border = '1px solid black';
// document.body.appendChild(iframe);

const gravity = 1;

const camera = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height
};

function keydown(e) {
    if (e.key === "a") keys.left = true;
    if (e.key === "d") keys.right = true;
    if (e.key === " ") keys.jump = true;
}

function keyup(e) {
    if (e.key === "a") keys.left = false;
    if (e.key === "d") keys.right = false;
    if (e.key === " ") keys.jump = false;
}

function isPlayerOnPlatform() {
    for (let platform of platforms) {
        if (player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height <= platform.y &&
            player.y + player.height + player.y_v >= platform.y) {
            return platform;
        }
    }
    return null;
}

function updateCamera() {
    camera.x = player.x - canvas.width / 2;
    camera.y = player.y - canvas.height / 2;

    // Ensure the player is not closer than 100 pixels from the edges
    if (player.x < camera.x + 100) {
        camera.x = player.x - 100;
    }
    if (player.x + player.width > camera.x + camera.width - 100) {
        camera.x = player.x + player.width - camera.width + 100;
    }
    if (player.y < camera.y + 100) {
        camera.y = player.y - 100;
    }
    if (player.y + player.height > camera.y + camera.height - 100) {
        camera.y = player.y + player.height - camera.height + 100;
    }
}

function loop() {
    player.y_v += gravity;
    player.y += player.y_v;

    if (player.y + player.height > ground.y) {
        player.jump = false;
        player.y = ground.y - player.height;
        player.y_v = 0;
    }

    if (keys.left) {
        player.x_v = -7.5;
    } else if (keys.right) {
        player.x_v = 7.5;
    } else {
        player.x_v = 0;
    }

    if (keys.jump && !player.jump) {
        player.y_v = -15;
        player.jump = true;
    }

    player.y += player.y_v;
    player.x += player.x_v;

    if (player.y + player.height > ground.y) {
        player.jump = false;
        player.y = ground.y - player.height;
        player.y_v = 0;
    }

    updateCamera();
    checkWallCollision();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    ctx.fillRect(ground.x - camera.x, ground.y - camera.y, ground.width, ground.height);

renderWall();   

    // ctx.drawImage(image, 50 - camera.x, 50 - camera.y, 640, 360); // Adjust the position and size as needed

    
    ctx.fillStyle = "white";
    ctx.fillRect(5, 5, 250, 80); 
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Use a and d keys to move", 10, 30);
    ctx.fillText("Press space to jump", 10, 60);

    ctx.fillText("Alvin Alexandro Codewords SKO", 820 - camera.x, 100 - camera.y);
    ctx.fillText("This website will be a simple platformer game that you can play to see my journey throughout Codewords 2024.", 535 - camera.x, 130 - camera.y);
    ctx.fillText("Alvin Alexandro Codewords SKO", 820 - camera.x, 100 - camera.y);
    ctx.fillText("Alvin Alexandro Codewords SKO", 820 - camera.x, 100 - camera.y);

    ctx.fillText("Press space to jump", 10 - camera.x, 60 - camera.y);
    ctx.fillText("Press space to jump", 10 - camera.x, 60 - camera.y);

    ctx.fillStyle = "white";
    ctx.fillRect(player.x - camera.x, player.y - camera.y, player.width, player.height);
    
    ctx.fillStyle = "green";
    for (let platform of platforms) {
        // Check for collision from the top
        if (player.y + player.height > platform.y && player.y < platform.y + platform.height &&
            player.x + player.width > platform.x && player.x < platform.x + platform.width) {
            player.jump = false;
            player.y = platform.y - player.height;
            player.y_v = 0;
    
            if (platform === transportPlatform) {
                setTimeout(() => {
                    window.location.href = transportPlatform.url;
                }, 1000); // 1 second delay
            }
        }

    
        // Check for collision from the bottom
        if (player.y < platform.y + platform.height && player.y + player.height > platform.y + platform.height &&
            player.x + player.width > platform.x && player.x < platform.x + platform.width) {
            player.y_v = 0;
            player.y = platform.y + platform.height;
        }
    
        if (platform === transportPlatform) {
            ctx.fillStyle = "red"; // Different color for transport platform
            ctx.fillRect(platform.x - camera.x, platform.y - camera.y, platform.width, platform.height);
            ctx.fillText("Go back to home", platform.x - camera.x + platform.width / 2, platform.y - camera.y - 10);
        } else {
            ctx.fillStyle = "green";
            ctx.fillRect(platform.x - camera.x, platform.y - camera.y, platform.width, platform.height);
            ctx.fillText("Platform", platform.x - camera.x + platform.width / 2, platform.y - camera.y - 10);
        }
    }

    requestAnimationFrame(loop);
}

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

loop();