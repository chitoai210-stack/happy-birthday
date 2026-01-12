document.addEventListener('DOMContentLoaded', () => {
    // Bắt sự kiện click vào màn hình đen ban đầu để mở khóa âm thanh
    const startOverlay = document.getElementById('start-overlay');
    
    startOverlay.addEventListener('click', () => {
        // Ẩn màn hình Start
        startOverlay.style.display = 'none';
        // Bắt đầu đếm ngược
        runCountdownSequence();
    });
});

function runCountdownSequence() {
    const countdownScreen = document.getElementById('countdown-screen');
    const countdownElement = document.getElementById('countdown-number');
    const beepSound = document.getElementById('sound-beep');

    // Hiển thị màn hình đếm ngược
    countdownScreen.style.display = 'flex';

    // Hàm phát tiếng beep (Cắt âm thanh để chỉ lấy tiếng "bíp" đầu tiên)
    const playTick = () => {
        beepSound.pause();
        beepSound.currentTime = 0; // Tua lại từ đầu
        beepSound.play().catch(e => console.log("Lỗi âm thanh:", e));
    };

    let count = 5;

    // --- NHỊP ĐẦU TIÊN (SỐ 5) ---
    countdownElement.textContent = count;
    playTick(); // Bíp số 5 ngay lập tức

    // --- VÒNG LẶP CHO CÁC SỐ CÒN LẠI (4,3,2,1,0) ---
    const interval = setInterval(() => {
        count--;
        
        if (count >= 0) {
            // Cập nhật số và kêu Bíp
            countdownElement.textContent = count;
            playTick(); 
        }

        if (count === 0) {
            // Dừng đếm ngược
            clearInterval(interval);
            
            // Chờ 1 giây ở số 0 rồi chuyển cảnh
            setTimeout(() => {
                transitionToIntro();
            }, 1000);
        }
    }, 1000); // Mỗi 1 giây (1000ms)
}

function transitionToIntro() {
    const countdownScreen = document.getElementById('countdown-screen');
    const introScreen = document.getElementById('intro-screen');
    const cuteMusic = document.getElementById('sound-cute');

    // Ẩn đếm ngược, hiện Intro
    countdownScreen.style.display = 'none';
    introScreen.style.display = 'flex';

    // Phát nhạc nền Gwen
    cuteMusic.volume = 0.5;
    cuteMusic.currentTime = 0;
    cuteMusic.play();

    // Kích hoạt animation trượt vào
    setTimeout(() => {
        introScreen.classList.add('start-animations');
    }, 100);
}

function openGift() {
    const intro = document.getElementById('intro-screen');
    const content = document.getElementById('content-screen');
    const whiteOverlay = document.getElementById('white-overlay');
    const trollContainer = document.getElementById('troll-container');
    const video = document.getElementById('gojo-video');
    
    const clickSound = document.getElementById('sound-click');
    const cuteMusic = document.getElementById('sound-cute');

    // 1. Âm thanh Click & Tắt nhạc nền
    clickSound.play();
    cuteMusic.pause();

    // 2. Bật màn trắng (Flash)
    whiteOverlay.style.opacity = '1';

    // 3. LOGIC HIỂN THỊ TROLL -> VIDEO
    // Đợi 0.5s cho màn trắng hiện hẳn
    setTimeout(() => {
        // Hiện chữ Troll
        trollContainer.style.display = 'flex';
        
        // Đợi 3.5s để người xem đọc chữ "Muốn lấy à..."
        setTimeout(() => {
            // Ẩn Intro và Troll đi
            intro.style.display = 'none';
            trollContainer.style.display = 'none';
            
            // Hiện Video
            content.style.display = 'flex';
            
            // Tắt màn trắng từ từ
            whiteOverlay.style.opacity = '0';
            
            // Phát Video
            video.play();

            // Dọn dẹp overlay
            setTimeout(() => {
                whiteOverlay.style.display = 'none';
            }, 500);

        }, 3500); // Thời gian đọc chữ troll

    }, 500); // Thời gian chờ flash trắng
}
