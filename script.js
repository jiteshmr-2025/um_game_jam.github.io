// 1. Countdown Logic
const countDownDate = new Date().getTime() + (7 * 24 * 60 * 60 * 1000); // 7 Days from now

const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Add leading zeros
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("mins").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("secs").innerText = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "<h3>SERVER IS LIVE!</h3>";
    }
}, 1000);

// 2. Random Splash Text (Minecraft Style)
const splashes = [
    "Theme: [REDACTED]",
    "Now with 50% more pixels!",
    "Bring your own coffee!",
    "Don't dig straight down!",
    "Sleep is for the weak!",
    "Creeper? Aww man.",
    "Java or Bedrock?",
    "Build The Future!",
    "Wait, is that a bug or a feature?"
];

const splashElement = document.getElementById("splashText");

function setRandomSplash() {
    const randomIndex = Math.floor(Math.random() * splashes.length);
    splashElement.innerText = splashes[randomIndex];
}

// Set initial splash
setRandomSplash();

// Optional: Click splash to change it
splashElement.addEventListener('click', setRandomSplash);

// --- 3. MINECRAFT TOOLTIP LOGIC ---
const tooltip = document.getElementById('mc-tooltip');
const interactiveBoxes = document.querySelectorAll('.interactive');

// Move tooltip with mouse
document.addEventListener('mousemove', (e) => {
    // Offset by 15px so cursor doesn't cover text
    const x = e.clientX + 15;
    const y = e.clientY + 15;
    
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
});

interactiveBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        const title = box.getAttribute('data-title');
        const desc = box.getAttribute('data-desc');
        
        if(title) {
            tooltip.querySelector('.tooltip-title').innerText = title;
            tooltip.querySelector('.tooltip-desc').innerText = desc;
            tooltip.style.display = 'block';
        }
    });

    box.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });
});