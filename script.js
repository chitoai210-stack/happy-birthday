document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
});

function startCountdown() {
    let timeLeft = 5;
    const countdownElement = document.getElementById('countdown-number');
    const countdownScreen = document.getElementById('countdown-screen');
    const introScreen = document.getElementById('intro-screen');

    const timerId = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            countdownElement.textContent = timeLeft;
        } else {
            clearInterval(timerId);
            countdownElement.textContent = "0";

            setTimeout(() => {
                countdownScreen.style.display = 'none';
                introScreen.style.display = 'flex';
                setTimeout(() => {
                     introScreen.classList.add('start-animations');
                }, 100);
            }, 500);
        }
    }, 1000);
}

function openGift() {
    const intro = document.getElementById('intro-screen');
    const content = document.getElementById('content-screen');
    const whiteOverlay = document.getElementById('white-overlay');
    const video = document.getElementById('gojo-video');

    whiteOverlay.style.opacity = '1';

    setTimeout(() => {
        intro.style.display = 'none';
        content.style.display = 'flex'; // Video container sẽ hiện ra full màn hình
        whiteOverlay.style.opacity = '0';

        video.play().catch(error => {
            console.log("Autoplay prevented:", error);
        });

        setTimeout(() => {
            whiteOverlay.style.display = 'none';
        }, 500);
    }, 2000);
}
