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
            content.style.display = '1000 
    }
];

function showFinalMessages() {
    const container = document.getElementById('message-container');
    container.innerHTML = ''; 

    // Render dòng đầu tiên (Ngày tháng) riêng biệt để nó luôn nằm trên cùng
    const dateMsg = finalMessages[0];
    const dateP = document.createElement('div');
    dateP.classList.add('msg-title'); 
    dateP.textContent = dateMsg.text;
    container.appendChild(dateP);

    // Biến tính tổng thời gian chờ
    let totalWaitTime = 0;

    // Duyệt qua các dòng còn lại (bỏ qua dòng ngày tháng đầu tiên)
    finalMessages.slice(1).forEach((msgObj, index, array) => {
        // Cộng dồn thời gian của từng dòng
        totalWaitTime += msgObj.time;

        setTimeout(() => {
            const p = document.createElement('div');
            p.classList.add('msg-line');
            
            // Nếu là dòng cuối cùng thì thêm class highlight
            if (index === array.length - 1) p.classList.add('msg-highlight');
            
            p.innerHTML = msgObj.text; 
            container.appendChild(p);
            
            void p.offsetWidth; // Force reflow
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

