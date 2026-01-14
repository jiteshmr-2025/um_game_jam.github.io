// --- 1. COUNTDOWN LOGIC ---
// Target Date: April 15, 2026, 9:45 PM
const countDownDate = new Date("Apr 15, 2026 21:45:00").getTime();

// Update the count down every 1 second
const timerInterval = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // GET ALL ELEMENTS SAFELY
    const dayEl = document.getElementById("days");
    const hourEl = document.getElementById("hours");
    const minEl = document.getElementById("minutes");
    const secEl = document.getElementById("seconds");

    // SAFETY CHECK: Only update if ALL elements exist
    if (dayEl && hourEl && minEl && secEl) {
        dayEl.innerText = days;
        hourEl.innerText = hours;
        minEl.innerText = minutes;
        secEl.innerText = seconds;
    }

    // If countdown is over
    if (distance < 0) {
        clearInterval(timerInterval);
        const countdownContainer = document.querySelector(".countdown-container");
        if (countdownContainer) {
            countdownContainer.innerHTML = "<h2>EVENT STARTED</h2>";
        }
    }
}, 1000);


// --- 2. SPLASH TEXT LOGIC ---
const splashes = [
    "Also try Terraria!",
    "Creeper? Aww man!",
    "Don't dig straight down!",
    "Spline Reticulated!",
    "Remove Herobrine!",
    "Technoblade Never Dies!",
    "Sleep in a bed to set spawn!",
    "Punching wood!",
    "Diamonds!",
    "1.21 Gigawatts!",
    "Keyboard compatible!",
    "UM Game Jam!",
    "Made with Java!",
    "Gluten Free!"
];

function setRandomSplash() {
    const splashEl = document.getElementById("splash-text");
    if (splashEl) {
        const randomIndex = Math.floor(Math.random() * splashes.length);
        splashEl.innerText = splashes[randomIndex];
    }
}

// Run immediately on load
setRandomSplash();


// --- 3. MINECRAFT TOOLTIP LOGIC ---
const tooltip = document.getElementById('mc-tooltip');
const interactiveBoxes = document.querySelectorAll('.interactive');

if (tooltip) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX + 15;
        const y = e.clientY + 15;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    });

    interactiveBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            const title = box.getAttribute('data-title');
            const desc = box.getAttribute('data-desc');

            if (title) {
                tooltip.querySelector('.tooltip-title').innerText = title;
                tooltip.querySelector('.tooltip-desc').innerText = desc;
                tooltip.style.display = 'block';
            }
        });

        box.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });
}


// --- 4. FAQ ACCORDION LOGIC ---
const accordions = document.getElementsByClassName("accordion");

if (accordions.length > 0) {
    for (let i = 0; i < accordions.length; i++) {
        accordions[i].addEventListener("click", function () {
            this.classList.toggle("active");
            const panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                if (i === accordions.length - 1) this.style.borderBottom = "1px solid #444";
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
                if (i === accordions.length - 1) this.style.borderBottom = "none";
            }
        });
    }
}