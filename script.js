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
            countdownContainer.innerHTML = "<h2>SET THEME HERE</h2>";
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

// --- 5. MOBILE MENU LOGIC ---
// Updated to match CSS classes (.hamburger and .nav-links)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-link');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        // Toggle the navigation menu slide-in
        navLinks.classList.toggle('active');

        // Toggle the hamburger animation (turn to X)
        hamburger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked (UX improvement)
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });
}

// --- 6. PERCENTAGE-BASED MUTATOR CHEST LOGIC ---
// Define when each chest starts opening, and when it fully opens.
// --- 6. PERCENTAGE-BASED ITEM DROP LOGIC ---
const mutatorDates = {
    "mutator-1": {
        start: new Date("Feb 25, 2026 12:00:00").getTime(), // Spawns in the sky
        end: new Date("Mar 01, 2026 12:00:00").getTime()    // Lands and reveals
    },
    "mutator-2": {
        start: new Date("Mar 05, 2026 12:00:00").getTime(),
        end: new Date("Mar 10, 2026 18:00:00").getTime()
    },
    "mutator-3": {
        start: new Date("Mar 15, 2026 09:00:00").getTime(),
        end: new Date("Mar 20, 2026 09:00:00").getTime()
    }
};

function updateItemDrops() {
    const now = new Date().getTime();
    
    for (const [dropId, dates] of Object.entries(mutatorDates)) {
        const dropContainer = document.getElementById(dropId);
        if (!dropContainer) continue;

        let progress = 0;
        
        // Calculate progress (0 to 1)
        if (now >= dates.end) {
            progress = 1;
        } else if (now > dates.start) {
            progress = (now - dates.start) / (dates.end - dates.start);
        }

        const mysteryItem = dropContainer.querySelector('.mystery-item');
        const shadow = dropContainer.querySelector('.item-shadow');
        
        if (progress < 1) {
            // Item is falling: maps 0% to 80% down the container
            if (mysteryItem) mysteryItem.style.top = `${progress * 80}%`;
            
            // Shadow gets darker and wider as the item gets closer to the ground
            if (shadow) {
                shadow.style.opacity = progress * 0.6;
                shadow.style.width = `${10 + (progress * 20)}px`;
            }
            dropContainer.classList.remove('unlocked');
        } else {
            // Item has landed
            if (mysteryItem) mysteryItem.style.top = `80%`;
            dropContainer.classList.add('unlocked');
        }
    }
}

// Check immediately, then hook into your existing 1-second interval!
updateItemDrops();
/* Add updateItemDrops(); inside your setInterval */


let currentBookPage = 1;

function changePage(direction) {
    // 1. Hide the current page
    document.getElementById(`book-${currentBookPage}`).style.display = 'none';
    
    // 2. Update the page number (+1 for next, -1 for prev)
    currentBookPage += direction;
    
    // 3. Show the new page
    document.getElementById(`book-${currentBookPage}`).style.display = 'block';
}