function openGift() {
    const intro = document.getElementById('intro-screen');
    const content = document.getElementById('content-screen');

    intro.style.opacity = '0';

    setTimeout(() => {
        intro.style.display = 'none';
        content.style.display = 'flex';
        shootConfetti();
    }, 1000);
}

function shootConfetti() {
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        var colors = ['#00008b', '#00e5ff', '#ffd700']; 

        confetti({
            particleCount: 4,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 4,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
