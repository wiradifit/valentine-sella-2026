document.addEventListener('DOMContentLoaded', () => {
    const balloonContainer = document.getElementById('balloon-container');
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const landingSection = document.getElementById('landing');
    const gallerySection = document.getElementById('gallery');

    // 1. Confetti on Load
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    // 2. Infinite Floating Balloons
    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.innerHTML = '❤️'; // Or use an SVG/Image

        // Random horizontal position
        balloon.style.left = Math.random() * 100 + 'vw';

        // Random animation duration/delay
        balloon.style.animationDuration = (Math.random() * 5 + 10) + 's'; // 10-15s
        balloon.style.animationDelay = Math.random() * 5 + 's';

        balloonContainer.appendChild(balloon);

        // Remove balloon after animation finishes to keep DOM clean
        setTimeout(() => {
            balloon.remove();
        }, 15000); // Max duration
    }

    // Start creating balloons periodically
    setInterval(createBalloon, 800);
    // Create some initial balloons
    for (let i = 0; i < 5; i++) createBalloon();


    // 3. "No" Button Evasion
    const moveNoButton = () => {
        // Calculate random position within viewport
        // Ensure it doesn't go off-screen
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

        noBtn.classList.add('moving');
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    };

    // Mobile: Touch start
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click
        moveNoButton();
    });

    // Desktop: Mouse over
    noBtn.addEventListener('mouseover', moveNoButton);
    // Also move on click just in case
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveNoButton();
    });

    // 4. "Yes" Button Interaction
    yesBtn.addEventListener('click', () => {
        // More confetti!
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // diverse confetti
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);

        // Transition to Gallery
        setTimeout(() => {
            landingSection.style.display = 'none'; // Optional: remove landing to focus on gallery

            gallerySection.classList.remove('hidden');
            // Force reflow
            void gallerySection.offsetWidth;
            gallerySection.classList.add('visible');

            // Scroll to gallery
            gallerySection.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    });
});
