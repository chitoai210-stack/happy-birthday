document.addEventListener('DOMContentLoaded', () => {
    const startOverlay = document.getElementById('start-overlay');
    // (Đã bỏ đoạn preload clickSound)

    startOverlay.addEventListener('click', () => {
        startOverlay.style.display = 'none';
        runCountdownSequence();
    });
});

function runCountdownSequence() {
    const countdownScreen = document.getElementById('countdown-screen');
    const countdownElement = document.getElementById('countdown-number');
    const beepSound = document.getElementById('sound-beep');

    countdownScreen.style.display = 'flex';

    const playTick = () => {
        beepSound.pause();
        beepSound.currentTime = 0;
        beepSound.play().catch(e => console.log("Lỗi âm thanh:", e));
    };

    let count = 5;

    // Nhịp đầu tiên (Số 5)
    countdownElement.textContent = count;
    playTick();

    const interval = setInterval(() => {
        count--;
        
        if (count > 0) {
            countdownElement.textContent = count;
            playTick(); 
        } 
        else if (count === 0) {
            countdownElement.textContent = count;
            
            // Ngắt tiếng beep ngay lập tức
            beepSound.pause(); 
            beepSound.currentTime = 0;
            
            clearInterval(interval);
            
            setTimeout(() => {
                transitionToIntro();
            }, 1000);
        }
    }, 1000);
}

function transitionToIntro() {
    const countdownScreen = document.getElementById('countdown-screen');
    const introScreen = document.getElementById('intro-screen');
    const cuteMusic = document.getElementById('sound-cute');
    const dialogueBox = document.querySelector('.dialogue-box');
    const dialogueText = document.getElementById('dialogue-text');

    countdownScreen.style.display = 'none';
    introScreen.style.display = 'flex';

    cuteMusic.volume = 0.5;
    cuteMusic.currentTime = 0;
    cuteMusic.play();

    setTimeout(() => {
        introScreen.classList.add('start-animations');
        
        // Kịch bản Lời thoại
        setTimeout(() => {
            dialogueText.innerHTML = "Chào Sandwich GM, mình là Gwen!";
            dialogueBox.classList.add('show'); 

            setTimeout(() => {
                dialogueBox.classList.remove('show'); 

                setTimeout(() => {
                    dialogueText.innerHTML = "Hãy đến nhận lấy chiếc cúp của mình đi nào,<br>bạn <span class='highlight'>Sandwich GM</span> dễ thương ơi!";
                    dialogueBox.classList.add('show'); 
                }, 500);

            }, 3000); 

        }, 1500); 

    }, 100);
}

function openGift() {
    const cuteMusic = document.getElementById('sound-cute');
    
    // (Đã bỏ logic phát tiếng click ở đây)
    
    // Giảm nhạc nền
    cuteMusic.pause();

    const intro = document.getElementById('intro-screen');
    const content = document.getElementById('content-screen');
    const whiteOverlay = document.getElementById('white-overlay');
    const trollContainer = document.getElementById('troll-container');
    const video = document.getElementById('gojo-video');
    const endScreen = document.getElementById('end-screen');

    whiteOverlay.style.opacity = '1';

    setTimeout(() => {
        trollContainer.style.display = 'flex';
        
        setTimeout(() => {
            intro.style.display = 'none';
            trollContainer.style.display = 'none';
            content.style.display = 'flex';
            whiteOverlay.style.opacity = '0';
            
            video.play();
            handleVideoSubtitles(video);

            // --- LOGIC MỚI: XỬ LÝ KHI VIDEO KẾT THÚC ---
            video.addEventListener('ended', () => {
                // Ẩn màn hình video
                content.style.display = 'none';
                // Hiện màn hình kết thúc
                endScreen.style.display = 'flex';
                // Kích hoạt animation bùng nổ
                // Sử dụng setTimeout nhỏ để đảm bảo trình duyệt nhận style display:flex trước khi thêm class animation
                setTimeout(() => {
                    endScreen.classList.add('trigger-explosion');
                }, 50);
            }, { once: true }); // { once: true } để đảm bảo sự kiện chỉ chạy 1 lần

            setTimeout(() => {
                whiteOverlay.style.display = 'none';
            }, 500);

        }, 3500); 

    }, 500); 
}

// --- HÀM XỬ LÝ PHỤ ĐỀ VIDEO ---
function handleVideoSubtitles(video) {
    const subtitleDiv = document.getElementById('video-subtitles');
    
    // LƯU Ý: Bạn hãy kiểm tra lại file gojo3.mp4 và chỉnh lại số giây (start/end) ở đây cho khớp nhé!
    const subtitles = [
        { 
            start: 3.5, 
            end: 4.5,   
            text: "Hư Thức, TỬ !" 
        },
        { 
            start: 7.5, 
            end: 10.0,   
            text: "Bắn dô cái mỏ mày <span class='sub-small'>*just kidding*</span>" 
        }
    ];

    video.addEventListener('timeupdate', () => {
        const currentTime = video.currentTime;
        let activeSubtitle = "";

        subtitles.forEach(sub => {
            if (currentTime >= sub.start && currentTime <= sub.end) {
                activeSubtitle = sub.text;
            }
        });

        subtitleDiv.innerHTML = activeSubtitle;
    });
}

