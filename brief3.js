const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight+100;

// Update canvas dimensions on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight-500;
    ground.width = canvas.width + 500; // Update ground width to match new canvas width
    ground.y = canvas.height; // Update ground position to match new canvas height
});

const player = {
    x: 950,
    y: canvas.height / 2,
    x_v: 0,
    y_v: 0,
    jump: true,
    width: 40,
    height: 40,
    color: "grey",
};

const backgroundMusic = document.getElementById("background-music");
backgroundMusic.volume = 0.5;
backgroundMusic.play();

const platforms = [
    { x: 1100, y: 400, width: 100, height: 10 },
    { x: 900, y: 500, width: 100, height: 10 }
];

const transportPlatform = { 
    x: 7325, 
    y: 450, 
    width: 500, 
    height: 20, 
    url: 'Brief 2 Codewords/index.html',
    openUrl: function() {
        window.open(this.url, '_blank');
    }
};

const blueTransportPlatform = {
    x: 3000,
    y: 450,
    width: 500,
    height: 20,
    url: 'html/Hello_World.html',
    openUrl: function() {
        window.open(this.url, '_blank');
    }
};

platforms.push(transportPlatform);
platforms.push(blueTransportPlatform);

const ground = {
    x: 0,
    y: 600, // Elevate slightly below the lower part of the screen
    width: canvas.width + 13000,   // Span the entire width of the canvas
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

const gravity = 1;

const camera = {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height
};

function keydown(e) {
    if (e.key === 'a') keys.left = true;
    if (e.key === 'd') keys.right = true;
    if (e.key === ' ') keys.jump = true;
}

function keyup(e) {
    if (e.key === 'a') keys.left = false;
    if (e.key === 'd') keys.right = false;
    if (e.key === ' ') keys.jump = false;
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
    camera.y = player.y - canvas.height / 2-200;

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
        player.x_v = -15;
    } else if (keys.right) {
        player.x_v = 15;
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
    ctx.fillStyle = "black";
    ctx.fillText("Alvin Alexandro Codewords SKO", 820 - camera.x, 150 - camera.y);
    ctx.fillText("This website will be a simple platformer game that you can play to see my journey throughout Codewords 2024.", 535 - camera.x, 180 - camera.y);
    ctx.fillText("Go explore (just go to the left)", 830 - camera.x, 210 - camera.y);
    ctx.fillText("The first few sessions of the semester was my most ambitious weeks.", 1920 - camera.x, 150 - camera.y);
    ctx.fillText("Mostly because I got to just do whatever I want and experiment with stuff I want to experiment with.", 1920 - camera.x, 230 - camera.y);
    ctx.fillText("This was my first website design for the semester. (Move On)", 1920 - camera.x, 250 - camera.y);
    ctx.fillText("Jump on that blue platform to see the end result.", 1920 - camera.x, 270 - camera.y);
    ctx.fillText("For this website, the only interesting thing was that I managed", 3600 - camera.x, 90 - camera.y);
    ctx.fillText("to create a font randomizer, which was helped by Copilot.", 3600 - camera.x, 110 - camera.y);
    ctx.fillText("First Attempt at the first website.", 3600 - camera.x, 400 - camera.y);
    ctx.fillText("Crazy 8s Picture.", 4100 - camera.x, 400 - camera.y);
    ctx.fillText("And then I was able to create the parallax effect, which was also helped by Copilot.", 4500 - camera.x, 90 - camera.y);
    ctx.fillText("As for the rest, I was fond with basic code enough to do the rest myself.", 4500 - camera.x, 110 - camera.y);
    ctx.fillText("On to the first assignment which was to design the paper prototype for our major project. >>>.", 4500 - camera.x, 270 - camera.y);
    ctx.fillText("The first step for our assignment was to have a thorough analyzation at a", 5500 - camera.x, 300 - camera.y);
    ctx.fillText("body of text given by our profs.", 5500 - camera.x, 320 - camera.y);
    ctx.fillText("We we're then tasked to create an ideation list (much like the Crazy 8s).", 6100 - camera.x, 300 - camera.y);
    ctx.fillText("However, I never took a picture of it, so here is the storyboard made.", 6100 - camera.x, 320 - camera.y);
    ctx.fillText("Here is the hero image, or I'll say the first thing that people will see", 6700 - camera.x, 300 - camera.y);
    ctx.fillText("the first time they open the website.", 6700 - camera.x, 320 - camera.y);
    ctx.fillText("Which finally lead to the second major project's website.", 7300 - camera.x, 300 - camera.y);
    ctx.fillText("Though I never remembered to document the proses itself.", 7300 - camera.x, 320 - camera.y);
    ctx.fillText("This was the last image of the website before I added", 7900 - camera.x, 300 - camera.y);
    ctx.fillText("a myriad of hues for the fonts.", 7900 - camera.x, 320 - camera.y);
    ctx.fillText("The version before this one had images of viruses replaced from", 7900 - camera.x, 340 - camera.y);
    ctx.fillText("the word 'corona'.", 7900 - camera.x, 360 - camera.y);
    ctx.fillText("Which leads us to the last part of the website.", 9300 - camera.x, 90 - camera.y);
    ctx.fillText("The part that had my most amount of effort and time into.", 9300 - camera.x, 110 - camera.y);
    ctx.fillText("Creating and fine-tuning the website you are interacting with right now.", 9300 - camera.x, 150 - camera.y);
    ctx.fillText("And to be honest, it was harder than I thought.", 9300 - camera.x, 170 - camera.y);
    ctx.fillText("A little spoiler for the process.", 9900 - camera.x, 300 - camera.y);
    ctx.fillText("This was one of the many errors that had me banging my head with limited", 9900 - camera.x, 320 - camera.y);
    ctx.fillText("amount of time left for the semester.", 9900 - camera.x, 340 - camera.y);
    ctx.fillText("This is the final storyboard for the website. ", 8500 - camera.x, 300 - camera.y);
    ctx.fillText("As you can see there are a myriad of emotions I brought when working with Copilot.", 12600 - camera.x, 280 - camera.y);
    ctx.fillText("I am glad that is over, hence this website is done.                                                                            >", 12600 - camera.x, 320 - camera.y);
    ctx.fillText("These are just one of the few conversations with Copilot (I had fun).", 10500 - camera.x, 320 - camera.y);
    ctx.fillText("Thankyou for playing this website, I hope you had fun with the website itself.", 13800 - camera.x, 200 - camera.y);

    ctx.fillText("This is the void.", 15000 - camera.x, 200 - camera.y);

    
    const gameImage = new Image();
    gameImage.src = 'Images/Screenshot 2024-10-18 at 17.54.26.png'; 
    ctx.drawImage(gameImage, 3050 - camera.x, 130 - camera.y, 378.5, 239); // Resize to 200x100

    const crazy8sImage = new Image();
    crazy8sImage.src = 'Week 1/Codewords Crazy 8s Attempt.png'; 
    ctx.drawImage(crazy8sImage, 3600 - camera.x, 130 - camera.y, 450, 239);  
    
    const firstwebsitetryImage = new Image();
    firstwebsitetryImage.src = 'Week 1/IMG_1513.JPG'; 
    ctx.drawImage(firstwebsitetryImage, 4100 - camera.x, -80 - camera.y, 300, 450);  

    const Brief1StoryImage = new Image();
    Brief1StoryImage.src = 'Images/Screenshot 2024-10-19 at 02.26.44.png'; 
    ctx.drawImage(Brief1StoryImage, 6100 - camera.x, -80 - camera.y, 567.75, 358.5);  
    
    const Brief1HeroImage = new Image();
    Brief1HeroImage.src = 'Images/Screenshot 2024-10-19 at 02.26.52.png'; 
    ctx.drawImage(Brief1HeroImage, 6700 - camera.x, -80 - camera.y, 567.75, 358.5); // Resize to 200x100
    
    const VirusTextImage = new Image();
    VirusTextImage.src = 'Images/Screenshot 2024-10-19 at 16.35.29.png'; 
    ctx.drawImage(VirusTextImage, 5500 - camera.x, -80 - camera.y, 567.75, 358.5);  
    
    const Brief2Image = new Image();
    Brief2Image.src = 'Images/Screenshot 2024-10-16 at 18.53.46.png'; 
    ctx.drawImage(Brief2Image, 7300 - camera.x, -80 - camera.y, 567.75, 358.5);  

    const Brief2BeforeImage = new Image();
    Brief2BeforeImage.src = 'Images/Screenshot 2024-10-14 at 21.16.06.png'; 
    ctx.drawImage(Brief2BeforeImage, 7900 - camera.x, -80 - camera.y, 567.75, 358.5);  
    
    const Bried2StoryImage = new Image();
    Bried2StoryImage.src = 'Images/IMG_2232.jpg'; 
    ctx.drawImage(Bried2StoryImage, 8500 - camera.x, -80 - camera.y, 567.75, 358.5);  

    const Brief3SpoilerImage = new Image();
    Brief3SpoilerImage.src = 'Images/Screenshot 2024-10-18 at 14.03.26.png'; 
    ctx.drawImage(Brief3SpoilerImage, 9900 - camera.x, -80 - camera.y, 567.75, 358.5); 
    
    const Brief3Chat1Image = new Image();
    Brief3Chat1Image.src = 'Images/Screenshot 2024-10-20 at 14.53.08.png'; 
    ctx.drawImage(Brief3Chat1Image, 10500 - camera.x, -80 - camera.y, 650.75, 180.5); 

    const Brief3Chat2Image = new Image();
    Brief3Chat2Image.src = 'Images/Screenshot 2024-10-20 at 14.53.13.png'; 
    ctx.drawImage(Brief3Chat2Image, 10500 - camera.x, 120 - camera.y, 650.75, 180.5); 

    const Brief3Chat3Image = new Image();
    Brief3Chat3Image.src = 'Images/Screenshot 2024-10-20 at 14.53.19.png'; 
    ctx.drawImage(Brief3Chat3Image, 11200 - camera.x, -80 - camera.y, 650.75, 180.5); 

    const Brief3Chat4Image = new Image();
    Brief3Chat4Image.src = 'Images/Screenshot 2024-10-20 at 14.54.28.png'; 
    ctx.drawImage(Brief3Chat4Image, 11200 - camera.x, 120 - camera.y, 650.75, 180.5); 

    const Brief3Chat5Image = new Image();
    Brief3Chat5Image.src = 'Images/Screenshot 2024-10-20 at 14.56.34.png'; 
    ctx.drawImage(Brief3Chat5Image, 11900 - camera.x, -80 - camera.y, 650.75, 180.5); 

    const Brief3Chat6Image = new Image();
    Brief3Chat6Image.src = 'Images/Screenshot 2024-10-20 at 14.56.46.png'; 
    ctx.drawImage(Brief3Chat6Image, 11900 - camera.x, 120 - camera.y, 650.75, 180.5);     

    ctx.fillStyle = "black";
    ctx.fillRect(-5, -5, 235, 75); 
    ctx.fillStyle = "white";
    ctx.fillRect(5, 5, 220, 60); 
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Use a and d keys to move", 10, 30);
    ctx.fillText("Press space to jump", 10, 50);
    ctx.fillText("Music: Pico Park (Theme Song)", 1400, 30);

    ctx.fillStyle = "black";
    ctx.fillRect(player.x - camera.x - 2, player.y - camera.y - 2, player.width + 4, player.height + 4); // Border
    ctx.fillStyle = "white";
    ctx.fillRect(player.x - camera.x, player.y - camera.y, player.width, player.height);
    
    let transportTriggered = localStorage.getItem('transportTriggered') === 'true';
    let blueTransportTriggered = localStorage.getItem('blueTransportTriggered') === 'true';
    let onTransportPlatform = false;
    let onBlueTransportPlatform = false;
    
    ctx.fillStyle = "green";
    for (let platform of platforms) {
        // Check for collision from the top
        if (player.y + player.height > platform.y && player.y < platform.y + platform.height &&
            player.x + player.width > platform.x && player.x < platform.x + platform.width) {
            player.jump = false;
            player.y = platform.y - player.height;
            player.y_v = 0;
    
            if (platform === transportPlatform) {
                onTransportPlatform = true;
                if (!transportTriggered) {
                    transportTriggered = true;
                    localStorage.setItem('transportTriggered', 'true');
                    setTimeout(() => {
                        window.open(transportPlatform.url, '_blank');
                    }, 1000); // 1 second delay
                }
            }
    
            if (platform === blueTransportPlatform) {
                onBlueTransportPlatform = true;
                if (!blueTransportTriggered) {
                    blueTransportTriggered = true;
                    localStorage.setItem('blueTransportTriggered', 'true');
                    setTimeout(() => {
                        window.open(blueTransportPlatform.url, '_blank');
                    }, 1000); // 1 second delay
                }
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
            ctx.fillText("Visit Codewords Major Project Website (New Tab)", platform.x - 170 - camera.x + platform.width / 2, platform.y - camera.y - 10);
        } else if (platform === blueTransportPlatform) {
            ctx.fillStyle = "blue"; // Different color for blue transport platform
            ctx.fillRect(platform.x - camera.x, platform.y - camera.y, platform.width, platform.height);
            ctx.fillText("Visit HelloWorld Page (New Tab)", platform.x - 110 - camera.x + platform.width / 2, platform.y - camera.y - 10);
        } else {
            ctx.fillStyle = "green";
            ctx.fillRect(platform.x - camera.x, platform.y - camera.y, platform.width, platform.height);
        }
    }

    // Reset transportTriggered if the player is not on the transport platform
if (!onTransportPlatform) {
    transportTriggered = false;
    localStorage.setItem('transportTriggered', 'false');
}

if (!onBlueTransportPlatform) {
    blueTransportTriggered = false;
    localStorage.setItem('blueTransportTriggered', 'false');
}
    requestAnimationFrame(loop);
}

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

loop();