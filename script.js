function openGift() {
    const intro = document.getElementById('intro-screen');
    const content = document.getElementById('content-screen');

    // 1. Mờ dần màn hình Intro
    intro.style.opacity = '0';

    setTimeout(() => {
        // 2. Ẩn Intro, Hiện Card
        intro.style.display = 'none';
        content.style.display = 'flex'; // Sử dụng flex để căn giữa card

        // 3. Bắn pháo hoa (Màu: Xanh dương, Xanh lơ, Vàng)
        shootConfetti();
    }, 1000);
}

function shootConfetti() {
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        // Màu sắc: Xanh đậm, Xanh sáng, Vàng kim
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
