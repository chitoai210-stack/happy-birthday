document.addEventListener('DOMContentLoaded', () => {
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

// --- CÁC BIẾN CẤU HÌNH ÂM THANH (CHỈNH Ở ĐÂY NÈ) ---
const CONFIG = {
    // Độ trễ của tiếng nổ so với video nổ (đơn vị mili-giây)
    // Nếu tiếng nổ sớm hơn hình -> Tăng số này lên (ví dụ 200, 500)
    // Nếu tiếng nổ trễ hơn hình -> Để số 0 hoặc số nhỏ
    explosionDelay: 50, 

    // Âm lượng nhạc nền (nhackp.mp3)
    bgVolumeNormal: 0.8, // Mức bình thường (0.0 đến 1.0)
    bgVolumeLow: 0.2     // Mức nhỏ khi xem video Gojo (nhỏ đi 80%)
};

// --- CHỨC NĂNG LOGIN ---
function checkPass() {
    const input = document.getElementById('pass-input');
    const msg = document.getElementById('login-message');
    const loginScreen = document.getElementById('login-screen');
    const loginBox = document.querySelector('.login-box');

    if (input.value === "CT011002") {
        msg.style.color = "#00e5ff";
        msg.textContent = "ACCESS GRANTED";
        setTimeout(() => {
            loginScreen.style.display = 'none';
            startMainSequence(); 
        }, 500);
    } else {
        msg.style.color = "red";
        msg.textContent = "WRONG PASSWORD!";
        input.value = "";
        loginBox.classList.add('shake');
        setTimeout(() => { loginBox.classList.remove('shake'); }, 500);
    }
}

function startMainSequence() {
    const deviceWarning = document.getElementById('device-warning');
    const startOverlay = document.getElementById('start-overlay');
    deviceWarning.style.display = 'flex';
    setTimeout(() => {
        deviceWarning.style.display = 'none';
        startOverlay.style.display = 'flex';
    }, 12000); 
}

// --- CÁC HÀM XỬ LÝ VIDEO & COUNTDOWN ---
function warmUpVideos() {
    const v1 = document.getElementById('gojo-video');
    const v2 = document.getElementById('notung-video');
    v1.muted = true; v2.muted = true;
    v1.play().then(() => v1.pause()).catch(e => console.log("Warmup v1 skip"));
    v2.play().then(() => v2.pause()).catch(e => console.log("Warmup v2 skip"));
    setTimeout(() => {
        v1.muted = false; v2.muted = false;
        v1.currentTime = 0; v2.currentTime = 0;
    }, 100);
}

function runCountdownSequence() {
    const countdownScreen = document.getElementById('countdown-screen');
    const countdownElement = document.getElementById('countdown-number');
    const beepSound = document.getElementById('sound-beep');
    
    beepSound.volume = 1.0;
    countdownScreen.style.display = 'flex';

    const playTick = () => {
        beepSound.pause(); beepSound.currentTime = 0;
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
            beepSound.pause(); beepSound.currentTime = 0;
            clearInterval(interval);
            setTimeout(() => { transitionToIntro(); }, 1000);
        }
    }, 1000);
}

function transitionToIntro() {
    const countdownScreen = document.getElementById('countdown-screen');
    const introScreen = document.getElementById('intro-screen');
    const bgMusic = document.getElementById('sound-cute'); // Đây là file nhackp.mp3
    const dialogueBox = document.querySelector('.dialogue-box');
    const dialogueText = document.getElementById('dialogue-text');
    const gwenWrapper = document.querySelector('.gwen-wrapper');
    const cupWrapper = document.querySelector('.cup-wrapper');

    countdownScreen.style.display = 'none';
    introScreen.style.display = 'flex';
    
    // Bắt đầu phát nhạc nền (Nhạc KP)
    bgMusic.volume = CONFIG.bgVolumeNormal; 
    bgMusic.currentTime = 0; 
    bgMusic.play();

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
                    setTimeout(() => { dialogueBox.classList.remove('show'); }, item.delay - 500);
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
    const bgMusic = document.getElementById('sound-cute'); // Nhạc nền
    // KHÔNG PAUSE NHẠC NỮA

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
            
            // --- BẮT ĐẦU VIDEO GOJO: GIẢM VOLUME NHẠC NỀN ---
            bgMusic.volume = CONFIG.bgVolumeLow;
            
            video.currentTime = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    video.muted = true; video.play();
                });
            }
            
            handleVideoSubtitles(video);

            video.onended = () => {
                content.style.display = 'none'; 
                explosionScreen.style.display = 'block'; 
                
                // Reset
                notungVideo.currentTime = 0; 
                explosionSound.currentTime = 0; 

                // 1. Chạy Video Nổ
                notungVideo.play();
                
                // 2. Chạy Tiếng Nổ (có chỉnh delay)
                setTimeout(() => {
                    explosionSound.play().catch(e => console.log("Lỗi play sound nổ"));
                }, CONFIG.explosionDelay);

                notungVideo.onended = () => {
                    explosionScreen.style.display = 'none'; 
                    finalScreen.style.display = 'block'; 
                    
                    // --- KẾT THÚC NỔ: TRẢ LẠI VOLUME NHẠC NỀN ---
                    bgMusic.volume = CONFIG.bgVolumeNormal;

                    setTimeout(() => { fadeOverlay.style.opacity = '0'; }, 50);
                    setTimeout(() => { 
                        kpImg.classList.add('move-left');
                        setTimeout(showFinalMessages, 1000); 
                    }, 500);
                };
            };
            setTimeout(() => { whiteOverlay.style.display = 'none'; }, 500);
        }, 3500); 
    }, 500); 
}

function handleVideoSubtitles(video) {
    const subtitleDiv = document.getElementById('video-subtitles');
    const subtitles = [
        { start: 3.5, end: 5.0, text: "Hư Thức, TỬ !" },
        { start: 7.7, end: 9.5, text: "Bắn dô cái mỏ mày <span class='sub-small'>*just kidding*</span>" }
    ];
    video.addEventListener('timeupdate', () => {
        const currentTime = video.currentTime;
        let activeSubtitle = "";
        subtitles.forEach(sub => {
            if (currentTime >= sub.start && currentTime <= sub.end) activeSubtitle = sub.text;
        });
        subtitleDiv.innerHTML = activeSubtitle;
    });
}

// --- CẤU HÌNH NỘI DUNG TIN NHẮN CUỐI ---
const finalMessages = [
    { text: "- 02/02/2026 -", time: 0 },
    { text: "Mong là có người giữ lời, đến ngày mới mở ra xem, nhưng nếu có mở trước thì thoai z biết sao giờ =)))). Oke thì là, hãy xem đây là 1 món quà tinh thần, của 1 ai đó trên thế giới này, not me !", time: 1000 },
    { text: "Không biết ngày hôm nay của bạn như thế nào, sẽ có chuyện vui, chuyện buồn, tức dzận, hay chỉ là 1 ngày bình thường như bao ngày ? Có nhận được những lời chúc mừng từ những người mình yêu thương và trân trọng ?", time: 14000 },
    { text: "Dù có chuyện gì đi nữa, sau tất cả, đến thời điểm hiện tại, bạn hãy thật vui vẻ và hạnh phúc nhé ! Vì những điều đã trải qua, vì khi đọc những dòng này, bạn vẫn có thể mỉm cười, có thể khóc, có thể ở bên những người mình yêu quý và chia sẻ những cảm xúc ấy !", time: 16000 },
    { text: "Có thể là ngày mai, 1 tháng, 1 năm, 10 năm hay 20 năm nữa, tất cả chúng ta sẽ còn ở bên nhau, có thể không, có thể sẽ quên đi nhau theo dòng thời gian, nhưng với mình, những điều chúng ta đã từng, những kỷ niệm đó sẽ không bị lãng quên và sẽ mãi ở 1 góc của não bộ. (gì chứ tui say đắm trong quá khứ lắm, vui buồn gì cũng nhớ)", time: 20000 },
    { text: "Nếu sau này không ai chúc mừng sinh nhật bạn nữa, thề với bạn là sẽ luôn có 1 người ghi nhớ điều đó, chỉ cần . 1 cái là sẽ có lời chúc tới ngay và luôn ! (thặc ra là nhớ hết, tại tùy hoàn cảnh có chúc được hay ko thoai)", time: 14000 },
    { text: "Nãy giờ nói cũng hơi nhiều, nhưng chúc thì cũng như mọi lần. Cầu mong cho bạn luôn được bình an và khỏe mạnh (à thì sức khỏe thôi chứ tiền tài học hành tự thân lo nhóe, ngắn gọn cho nó linh)", time: 12000 },
    { text: "Bonus: thật ra tụi mình ko có hình nào đẹp hết, nên mò trên trang cá nhân mới có hình", time: 5000 },
    { text: "Hết rồi đó. SINH NHỰT ZUI ZẺ NHE <3", time: 4000 },
    { text: "CHỊ PHƯƠNG GỈ MŨI", time: 3000 }
];

function showFinalMessages() {
    const container = document.getElementById('message-container');
    container.innerHTML = ''; 

    const dateMsg = finalMessages[0];
    const dateP = document.createElement('div');
    dateP.classList.add('msg-title'); 
    dateP.textContent = dateMsg.text;
    container.appendChild(dateP);

    let totalWaitTime = 0;

    finalMessages.slice(1).forEach((msgObj, index, array) => {
        totalWaitTime += msgObj.time;

        setTimeout(() => {
            const p = document.createElement('div');
            p.classList.add('msg-line');
            if (index === array.length - 1) p.classList.add('msg-highlight');
            
            p.innerHTML = msgObj.text; 
            container.appendChild(p);
            
            void p.offsetWidth; 
            p.classList.add('msg-show');

            container.scrollTop = container.scrollHeight;

            if (index === array.length - 1) {
                setTimeout(triggerConfetti, 1000);
            }
        }, totalWaitTime);
    });
}

function triggerConfetti() {
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }
        });
        confetti({
            particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}


