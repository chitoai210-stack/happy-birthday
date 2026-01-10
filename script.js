function openGift() {
    // 1. Ẩn màn hình Intro (gồm tướng và cúp)
    const intro = document.getElementById('intro-screen');
    intro.style.transition = "opacity 0.5s";
    intro.style.opacity = "0";
    
    setTimeout(() => {
        intro.style.display = 'none';
        
        // 2. Hiện nội dung lời chúc
        const content = document.getElementById('content');
        content.classList.remove('hidden');
        
        // 3. Bắn pháo hoa
        fireConfetti();
    }, 500); // Đợi 0.5s cho mờ dần rồi mới tắt
}

function fireConfetti() {
    var count = 200;
    var defaults = { origin: { y: 0.7 } };
    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }
    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#a200ff', '#ffd700'] }); // Pháo hoa màu tím + vàng
    fire(0.2, { spread: 60, colors: ['#a200ff', '#ffffff'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#d68eff'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45, });
}
