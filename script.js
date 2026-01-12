document.addEventListener('DOMContentLoaded', () => {
    // Lưu ý: Một số trình duyệt chặn tự phát âm thanh nếu người dùng chưa tương tác.
    // Nếu beep không kêu ngay lập tức, hãy click chuột vào màn hình 1 cái.
    startCountdown();
});

function startCountdown() {
    let timeLeft = 5;
    const countdownElement = document.getElementById('countdown-number');
    const countdownScreen = document.getElementById('countdown-screen');
    const introScreen = document.getElementById('intro-screen');
    
    // Âm thanh
    const beepSound = document.getElementById('sound-beep');
    const cuteMusic = document.getElementById('sound-cute');
    cuteMusic.volume = 0.5; // Chỉnh nhạc nền vừa phải

    // Hàm phát tiếng beep ngắn gọn
    const playBeep = () => {
        beepSound.currentTime = 0; // Tua về đầu để phát ngay lập tức
        beepSound.play().catch(e => console.log("Cần tương tác để phát beep"));
    };

    // Phát beep đầu tiên ngay khi vào (số 5)
    playBeep();

    const timerId = setInterval(() => {
        timeLeft--;
        
        if (timeLeft > 0) {
            countdownElement.textContent = timeLeft;
            playBeep(); // Phát tiếng beep mỗi khi nhảy số
        } else {
            // Khi về 0
            playBeep();
            clearInterval(timerId);
            countdownElement.textContent = "0";

            setTimeout(() => {
                // 1. Ẩn màn đếm ngược
                countdownScreen.style.display = 'none';
                
                // 2. Hiện màn Intro
                introScreen.style.display = 'flex';
                
                // 3. Phát nhạc nền Cute
                cuteMusic.play().catch(e => console.log("Cần tương tác để phát nhạc"));
                
                // 4. Kích hoạt Animation
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
    const trollContainer = document.getElementById('troll-container');
    const video = document.getElementById('gojo-video');
    
    // Âm thanh
    const clickSound = document.getElementById('sound-click');
    const cuteMusic = document.getElementById('sound-cute');

    // 1. Hiệu ứng Click & Tắt nhạc nền
    clickSound.play();
    
    // Fade out nhạc nền từ từ cho mượt
    let fadeAudio = setInterval(() => {
        if (cuteMusic.volume > 0.05) {
            cuteMusic.volume -= 0.05;
        } else {
            clearInterval(fadeAudio);
            cuteMusic.pause();
        }
    }, 50);

    // 2. Màn hình trắng xóa
    whiteOverlay.style.opacity = '1';

    // 3. Logic hiển thị Troll -> Video
    setTimeout(() => {
        // Hiện dòng chữ Troll trên nền trắng
        trollContainer.style.display = 'flex';
        
        // Giữ dòng chữ Troll trong khoảng 3 giây để đọc
        setTimeout(() => {
            // Ẩn tất cả Intro và Troll
            intro.style.display = 'none';
            trollContainer.style.display = 'none';
            
            // Hiện màn hình Video
            content.style.display = 'flex';
            
            // Tắt màn trắng từ từ
            whiteOverlay.style.opacity = '0';
            
            // Chơi Video
            video.play();

            // Dọn dẹp màn trắng
            setTimeout(() => {
                whiteOverlay.style.display = 'none';
            }, 500);

        }, 3000); // Thời gian đọc chữ Troll (3s)

    }, 800); // Thời gian chờ màn hình trắng hiện lên hẳn (0.8s)
}
