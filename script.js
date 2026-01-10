function openGift() {
    // 1. Ẩn hộp quà
    const giftBox = document.getElementById('gift-box');
    giftBox.style.display = 'none';

    // 2. Hiện nội dung
    const content = document.getElementById('content');
    content.classList.remove('hidden');
    content.style.display = 'block';

    // 3. Bắn pháo hoa (Confetti)
    fireConfetti();
    
    // 4. Có thể thêm nhạc tự động phát ở đây (tuỳ chọn)
}

function fireConfetti() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, { spread: 26, startVelocity: 55, });
    fire(0.2, { spread: 60, });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45, });
}