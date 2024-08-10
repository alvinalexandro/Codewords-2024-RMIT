const fonts = [
    'Inter_Tiget',
    'magicalnotes',
    'Devant_Medium',
    'Amatic',
    'Bangers',
    'Fredericka',
    'Kirang',
    'ryeregular',
    'Indie_F'
  ];
  
  const letters = document.querySelectorAll('.letter');
  
  let count=0;
  
  const rollIntro = () => {
    letters.forEach(letter => {
      let randomFontIndex = Math.floor(Math.random() * fonts.length);
      let randomFont = fonts[randomFontIndex]; 
      letter.style.fontFamily=randomFont;
      }
    );
  }
  
  let introAnimation = setInterval(function() {
    rollIntro();
    if(count>500)
      clearInterval(introAnimation);
    count++;
  },350);


  document.addEventListener("DOMContentLoaded", function() {
    const myAudio = document.getElementById('myAudio');
    myAudio.volume = 0.5; // Set volume to 50%

    myAudio.play().catch(error => {
      console.log("Autoplay prevented. User interaction required.");
  });
})

// Example JavaScript to change brightness level dynamically
function setBrightness(level) {
  document.documentElement.style.setProperty('--brightness-level', level + '%');
}

// Example usage: Set brightness to 30%
setBrightness(100);

document.addEventListener("mousemove", parallax);

function parallax(event) {
    const cutout = document.querySelector(".cutout");
    const foreground = document.querySelector(".foreground");

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const mouseX = (event.pageX - centerX) / centerX;
    const mouseY = Math.min(Math.max((event.pageY - centerY) / centerY, -0.5), 0.5); // Increased Y movement limit

    const depth = 20; // Increased movement depth for more pronounced effect

    const transformValue = `translate(${mouseX * depth}px, ${mouseY * depth}px)`;

    if (cutout) {
        cutout.style.transform = transformValue;
    }
    
    if (foreground) {
        foreground.style.transform = transformValue;
    }
}