document.addEventListener("DOMContentLoaded", () => {
    // Lấy các element DOM
    const countdownScreen = document.getElementById('countdown-screen');
    const timerElement = document.getElementById('timer');
    const introScreen = document.getElementById('intro-screen');
    const cupWrapper = document.getElementById('cup-wrapper');
    const flashOverlay = document.getElementById('flash-overlay');
    const trollText = document.getElementById('troll-text');
    const videoScreen = document.getElementById('video-screen');
    const mainVideo = document.getElementById('main-video');

    // Lấy Audio Element
    const sfxBeep = document.getElementById('sfx-beep');
    const bgmCute = document.getElementById('bgm-cute');
    const sfxClick = document.getElementById('sfx-click');

    // Cài đặt âm lượng (tùy chọn)
    bgmCute.volume = 0.5; // Nhạc nền vừa phải
    sfxBeep.volume = 0.8;

    // --- BƯỚC 1: LOGIC ĐẾM NGƯỢC ---
    let count = 5;
    
    const countdownInterval = setInterval(() => {
        // Cố gắng phát tiếng beep (có thể bị trình duyệt chặn nếu chưa tương tác)
        sfxBeep.currentTime = 0;
        sfxBeep.play().catch(e => console.log("Cần tương tác để phát âm thanh"));

        count--;
        if (count >= 0) {
            timerElement.textContent = count;
        } else {
            // Kết thúc đếm ngược
            clearInterval(countdownInterval);
            startIntro();
        }
    }, 1000);

    // --- BƯỚC 2: CHUYỂN SANG INTRO ---
    function startIntro() {
        countdownScreen.classList.add('hidden');
        introScreen.classList.remove('hidden');
        
        // Phát nhạc nền dễ thương
        bgmCute.play().catch(e => console.log("Autoplay blocked"));
    }

    // --- BƯỚC 3 & 4: TƯƠNG TÁC CÚP & TROLL & VIDEO ---
    cupWrapper.addEventListener('click', () => {
        // 1. Âm thanh click & Dừng nhạc nền
        sfxClick.play();
        fadeAudioOut(bgmCute); // Hiệu ứng nhỏ dần nhạc

        // 2. Hiện màn hình trắng (White Flash)
        flashOverlay.classList.add('active');

        // 3. Hiện dòng chữ Troll sau 0.8 giây (khi màn hình đã trắng hẳn)
        setTimeout(() => {
            trollText.classList.add('show');
        }, 800);

        // 4. Giữ màn hình troll khoảng 3 giây, sau đó chuyển Video
        setTimeout(() => {
            // Ẩn Intro và Flash
            introScreen.classList.add('hidden');
            flashOverlay.classList.remove('active'); // Mờ dần màn hình trắng
            
            // Hiện màn hình Video
            videoScreen.classList.remove('hidden');
            
            // Chơi video
            mainVideo.play();
        }, 3800); // 800ms (hiện chữ) + 3000ms (đọc chữ) = 3800ms
    });

    // Hàm phụ trợ: Giảm âm lượng từ từ
    function fadeAudioOut(audioElement) {
        const fadeAudio = setInterval(() => {
            if (audioElement.volume > 0.1) {
                audioElement.volume -= 0.1;
            } else {
                clearInterval(fadeAudio);
                audioElement.pause();
                audioElement.currentTime = 0;
            }
        }, 100); // Giảm mỗi 100ms
    }
});
