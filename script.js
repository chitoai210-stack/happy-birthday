function openGift() {
    const intro = document.getElementById('intro-screen');
    const content = document.getElementById('content-screen');

    // 1. Làm mờ màn hình Intro
    intro.style.opacity = '0';

    setTimeout(() => {
        // 2. Ẩn Intro và hiện Thiệp
        intro.style.display = 'none';
        content.style.display = 'block';

        // 3. Bắn pháo hoa (Màu Gwen: Xanh lơ, Trắng, Vàng)
        shootConfetti();
    }, 1000);
}

function shootConfetti() {
    // Hiệu ứng pháo hoa bắn từ 2 bên
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        // Màu sắc đặc trưng của Gwen
        var colors = ['#00ffe5', '#ffffff', '#ffd700']; 

        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 3,
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
