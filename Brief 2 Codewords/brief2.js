document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('virusContainer');
    const playButton = document.getElementById('playButton');
    const numberOfViruses = 50;
    const words = ["corona"]
    let virusCount = 0;
    const maxViruses = 300; // Set the maximum number of viruses before reset

    playButton.addEventListener('click', function() {
        playButton.style.display = 'none';

        function createVirus() {
            if (virusCount >= maxViruses) {
                location.reload(); // Reload the page to reset
                return;
            }

            const virus = document.createElement('div');
            virus.classList.add('virus');
            virus.textContent = words[Math.floor(Math.random() * words.length)]; // Random word from array
            const fonts = ['Helvetica', 'Arial', 'Courier New', 'Georgia', 'Times New Roman'];
            const colors = ['red', 'yellow', 'green', 'purple', 'orange'];
            const sizes = ['20px', '25px', '30px', '35px', '40px'];
            virus.style.position = 'absolute';
            virus.style.color = colors[Math.floor(Math.random() * colors.length)];
            virus.style.fontSize = sizes[Math.floor(Math.random() * sizes.length)];
            virus.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
            virus.style.cursor = 'pointer'; // Change cursor to hand on hover
            virus.style.top = Math.random() * window.innerHeight + 'px';
            virus.style.left = Math.random() * window.innerWidth + 'px';

            container.appendChild(virus);
            virusCount++;

            const duration = Math.random() * 5 + 2;
            virus.style.animationDuration = duration + 's';
            virus.style.animationDirection = Math.random() < 0.5 ? 'normal' : 'reverse';

            moveVirus(virus);
            virus.addEventListener('mousedown', startDrag);

            setTimeout(createVirus, 200); // Create a new virus every 200ms

            // Adjust shake intensity based on virus count
            adjustShakeIntensity(virusCount);
        }

        createVirus();
    });

    function moveVirus(virus) {
        const speed = 1.5; 
        let dx = Math.random() * speed;
        let dy = Math.random() * speed;

        function updatePosition() {
            if (virus.isHovered || virus.isDragging) {
                requestAnimationFrame(updatePosition);
                return;
            }
            let x = parseFloat(virus.style.left);
            let y = parseFloat(virus.style.top);
            x += dx;
            y += dy;
            if (x < 0 || x > window.innerWidth) dx *= -1;
            if (y < 0 || y > window.innerHeight) dy *= -1;

            virus.style.left = x + 'px';
            virus.style.top = y + 'px';

            requestAnimationFrame(updatePosition);
        }
        virus.addEventListener('mouseover', () => virus.isHovered = true);
        virus.addEventListener('mouseout', () => virus.isHovered = false);
        updatePosition();
    }

    function startDrag(event) {
        const virus = event.target;
        virus.isDragging = true;
        let offsetX = event.clientX - parseFloat(virus.style.left);
        let offsetY = event.clientY - parseFloat(virus.style.top);

        function drag(event) {
            virus.style.left = event.clientX - offsetX + 'px';
            virus.style.top = event.clientY - offsetY + 'px';
        }

        function stopDrag() {
            virus.isDragging = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
        }

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
    }

    function adjustShakeIntensity(count) {
        const intensity = Math.min(count / 10, 10); // Cap intensity at 10
        document.body.style.animation = `shake 0.5s infinite`;
        document.body.style.animationDuration = `${1 / intensity}s`;
    }

    // Generate stars
    function createStars() {
        const starCount = 100; // Number of stars
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.top = Math.random() * window.innerHeight + 'px';
            star.style.left = Math.random() * window.innerWidth + 'px';
            star.style.width = Math.random() * 3 + 1 + 'px'; // Random width between 1px and 4px
            star.style.height = star.style.width; // Make height equal to width for a perfect circle
            document.body.appendChild(star);
        }
    }

    createStars();
});
