document.addEventListener('DOMContentLoaded', () => {
    // Chỉ lắng nghe sự kiện Enter ở ô nhập pass
    const passInput = document.getElementById('pass-input');
    passInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            checkPass();
        }
    });

    const startOverlay = document.getElementById('start-overlay');
    startOverlay.addEventListener('click', () => {
        startOverlay.style.display = 'none';
        warmUpVideos(); 
        runCountdownSequence();
    });
});

// --- CHỨC NĂNG LOGIN MỚI ---
function checkPass() {
    const input = document.getElementById('pass-input');
    const msg = document.getElementById('login-message');
    const loginScreen = document.getElementById('login-screen');
    const loginBox = document.querySelector('.login-box');

    if (input.value === "CT011002") {
        msg.style.color = "#00e5ff";
        msg.textContent = "ACCESS GRANTED";
        
        // Ẩn màn hình login sau 0.5s
        setTimeout(() => {
            loginScreen.style.display = 'none';
            startMainSequence(); // Bắt đầu chạy phần Cảnh báo thiết bị
        }, 500);
    } else {
        msg.style.color = "red";
        msg.textContent = "WRONG PASSWORD!";
        input.value = "";
        
        // Hiệu ứng rung
        loginBox.classList.add('shake');
        setTimeout(() => { loginBox.classList.remove('shake'); }, 500);
    }
}

// Hàm này chứa logic cũ: Hiện cảnh báo 12s rồi hiện nút Start
function startMainSequence() {
    const deviceWarning = document.getElementById('device-warning');
    const startOverlay = document.getElementById('start-overlay');
    
    // Hiện cảnh báo
    deviceWarning.style.display = 'flex';

    // Đợi 12 giây đọc thông báo
    setTimeout(() => {
        deviceWarning.style.display = 'none';
        startOverlay.style.display = 'flex';
    }, 12000); 
}

// --- CÁC HÀM CŨ GIỮ NGUYÊN ---
function warmUpVideos() {
    const v1 = document.getElementById('gojo-video');
    const v2 = document.getElementById('notung-video');
    
    v1.muted = true;
    v2.muted = true;
    
    v1.play().then(() => v1.pause()).catch(e => console.log("Warmup v1 skip"));
    v2.play().then(() => v2.pause()).catch(e => console.log("Warmup v2 skip"));
    
    setTimeout(() => {
        v1.muted = false;
        v2.muted = false;
        v1.currentTime = 0;
        v2.currentTime = 0;
    }, 100);
}

function runCountdownSequence() {
    const countdownScreen = document.getElementById('countdown-screen');
    const countdownElement = document.getElementById('countdown-number');
    const beepSound = document.getElementById('sound-beep');
    
    beepSound.volume = 1.0;
    countdownScreen.style.display = 'flex';

    const playTick = () => {
        beepSound.pause();
        beepSound.currentTime = 0;
        beepSound.play().catch(e => console.error("Lỗi âm thanh:", e));
    };

    let count = 5;
    countdownElement.textContent = count;
    playTick();

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownElement.textContent = count;
            playTick(); 
        } else if (count === 0) {
            countdownElement.textContent = count;
            beepSound.pause(); 
            beepSound.currentTime = 0;
            clearInterval(interval);
            setTimeout(() => { transitionToIntro(); }, 1000);
        }
    }, 1000);
}

function transitionToIntro() {
    const countdownScreen = document.getElementById('countdown-screen');
    const introScreen = document.getElementById('intro-screen');
    const cuteMusic = document.getElementById('sound-cute');
    const dialogueBox = document.querySelector('.dialogue-box');
    const dialogueText = document.getElementById('dialogue-text');
    
    const gwenWrapper = document.querySelector('.gwen-wrapper');
    const cupWrapper = document.querySelector('.cup-wrapper');

    countdownScreen.style.display = 'none';
    introScreen.style.display = 'flex';
    cuteMusic.volume = 0.5; cuteMusic.currentTime = 0; cuteMusic.play();

    setTimeout(() => {
        introScreen.classList.add('start-animations');
        
        const dialogueSequence = [
            { text: "Chào Sandwich GM, mình là Gwen!", delay: 3000 },
            { text: "Dẫu cho có nhiều chuyện vui buồn", delay: 3000 },
            { text: "thì hôm nay vẫn là ngày tuyệt vời của bạn", delay: 3000 },
            { text: "Hãy đến nhận lấy chiếc cúp của mình đi nào,<br>bạn <span class='highlight'>Sandwich GM</span> dễ thương ơi!", delay: 3500 }
        ];

        let currentDelay = 0;
        dialogueSequence.forEach((item, index) => {
            setTimeout(() => {
                dialogueText.innerHTML = item.text;
                dialogueBox.classList.add('show');
                
                if (index < dialogueSequence.length - 1) {
                    setTimeout(() => {
                        dialogueBox.classList.remove('show');
                    }, item.delay - 500);
                } else {
                    setTimeout(() => {
                        gwenWrapper.classList.add('move-left');
                        cupWrapper.classList.add('show-cup');
                    }, 1000);
                }
            }, currentDelay);
            currentDelay += item.delay;
        });

    }, 100);
}

function openGift() {
    const cuteMusic = document.getElementById('sound-cute');
    cuteMusic.pause();

    const intro = document.getElementById('intro-screen');
    const content = document.getElementById('content-screen');
    const whiteOverlay = document.getElementById('white-overlay');
    const trollContainer = document.getElementById('troll-container');
    const video = document.getElementById('gojo-video');
    const explosionScreen = document.getElementById('explosion-screen');
    const notungVideo = document.getElementById('notung-video');
    const explosionSound = document.getElementById('sound-explosion');
    const finalScreen = document.getElementById('final-screen');
    const kpImg = document.getElementById('kp-img');
    const fadeOverlay = document.getElementById('final-fade-overlay');

    whiteOverlay.style.opacity = '1';

    setTimeout(() => {
        trollContainer.style.display = 'flex';
        
        video.load(); 
        notungVideo.load();

        setTimeout(() => {
            intro.style.display = 'none';
            trollContainer.style.display = 'none';
            content.style.display = 'flex'; 
            whiteOverlay.style.opacity = '0';
            
            video.currentTime = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Auto-play bị chặn, thử lại:", error);
                    video.muted = true; 
                    video.play();
                });
            }
            
            handleVideoSubtitles(video);

            video.onended = () => {
                content.style.display = 'none'; 
                explosionScreen.style.display = 'block'; 
                
                notungVideo.currentTime = 0; 
                notungVideo.play();
                explosionSound.currentTime = 0; explosionSound.play();

                notungVideo.onended = () => {
                    explosionScreen.style.display = 'none'; 
                    finalScreen.style.display = 'block'; 
                    setTimeout(() => { fadeOverlay.style.opacity = '0'; }, 50);
                    setTimeout(() => { kpImg.classList.add('move-left'); }, 500);
                };
            };

            setTimeout(() => { whiteOverlay.style.display = 'none'; }, 500);
        }, 3500); 
    }, 500); 
}

function handleVideoSubtitles(video) {
    const subtitleDiv = document.getElementById('video-subtitles');
    const subtitles = [
        { start: 2.0, end: 4.5, text: "Hư Thức, TỬ !" },
        { start: 5.0, end: 8.0, text: "Bắn dô cái mỏ mày <span class='sub-small'>*just kidding*</span>" }
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
