// --- QUẢN LÝ TRẠNG THÁI (STATE MANAGEMENT) ---
let currentPhase = 'idle'; // idle, intro, video, final, done
let activeTimer = null;    // Dùng để lưu timer đang chạy, giúp clear khi click

document.addEventListener('DOMContentLoaded', () => {
    // Xử lý Input mật khẩu
    const passInput = document.getElementById('pass-input');
    if (passInput) {
        passInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                checkPass();
            }
        });
    }

    // Xử lý Overlay bắt đầu
    const startOverlay = document.getElementById('start-overlay');
    if (startOverlay) {
        startOverlay.addEventListener('click', () => {
            startOverlay.style.display = 'none';
            warmUpVideos(); 
        });
    }

    // --- TÍNH NĂNG MỚI: CLICK ĐỂ CHUYỂN TIẾP (SKIP/NEXT) ---
    document.addEventListener('click', (e) => {
        // Không xử lý click nếu đang click vào ô input hoặc nút login
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.closest('.login-box')) return;

        handleGlobalClick();
    });

    document.addEventListener('touchstart', (e) => {
        // Tương tự cho cảm ứng
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.closest('.login-box')) return;
        handleGlobalClick();
    }, {passive: true});


    // --- XỬ LÝ FEEDBACK & LƯU TRỮ ---
    const feedbackInput = document.getElementById('user-feedback-input');
    if (feedbackInput) {
        const savedFeedback = localStorage.getItem('gwen_gift_feedback_content');
        if (savedFeedback) {
            feedbackInput.value = savedFeedback;
            feedbackInput.classList.add('saved-mode');
        }

        feedbackInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.classList.add('saved-mode');
                this.blur(); 
                localStorage.setItem('gwen_gift_feedback_content', this.value);
            }
        });

        feedbackInput.addEventListener('click', function() {
            if (this.classList.contains('saved-mode')) {
                this.classList.remove('saved-mode');
            }
        });
    }
});

// --- LOGIC XỬ LÝ CLICK TOÀN CỤC ---
function handleGlobalClick() {
    // 1. Giai đoạn INTRO (Gwen nói chuyện)
    if (currentPhase === 'intro') {
        if (activeTimer) clearTimeout(activeTimer); // Hủy chờ
        playNextDialogue(); // Chạy câu thoại tiếp theo ngay
    }
    
    // 2. Giai đoạn VIDEO (Gojo)
    else if (currentPhase === 'video') {
        const v1 = document.getElementById('gojo-video');
        if (v1 && !v1.paused && v1.currentTime < v1.duration - 0.5) {
            v1.currentTime = v1.duration - 0.1; // Nhảy đến cuối video ngay lập tức
        }
    }

    // 3. Giai đoạn FINAL MESSAGES (Lời chúc)
    else if (currentPhase === 'final') {
        if (activeTimer) clearTimeout(activeTimer); // Hủy chờ
        renderNextMessage(); // Hiện tin nhắn tiếp theo ngay
    }
}


// --- CẤU HÌNH ÂM THANH ---
const CONFIG = {
    explosionDelay: 100, 
    bgVolumeNormal: 0.8, 
    bgVolumeLow: 0.1     
};

// --- CHỨC NĂNG LOGIN ---
function checkPass() {
    const input = document.getElementById('pass-input');
    const msg = document.getElementById('login-message');
    const loginScreen = document.getElementById('login-screen');
    const loginBox = document.querySelector('.login-box');
    const bgMusic = document.getElementById('sound-cute'); 

    if (input.value === "KP020203") {
        msg.style.color = "#00e5ff";
        msg.textContent = "ACCESS GRANTED";
        
        bgMusic.volume = CONFIG.bgVolumeNormal;
        bgMusic.play().catch(e => console.log("Lỗi phát nhạc nền:", e));

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
    const warningText = document.getElementById('warning-text');
    const startOverlay = document.getElementById('start-overlay');
    
    deviceWarning.style.display = 'flex';
    
    setTimeout(() => {
        if(warningText) warningText.innerHTML = "Để lại feedback ở cuối nhá =)))";
    }, 8000);

    setTimeout(() => {
        deviceWarning.style.display = 'none';
        startOverlay.style.display = 'flex';
    }, 14000); 
}

// --- CÁC HÀM XỬ LÝ VIDEO & COUNTDOWN ---
function warmUpVideos() {
    const v1 = document.getElementById('gojo-video');
    const v2 = document.getElementById('notung-video');

    if(v1) { v1.muted = true; v1.play().then(() => v1.pause()).catch(e => console.log("Warmup v1 skip")); }
    if(v2) { v2.muted = true; v2.play().then(() => v2.pause()).catch(e => console.log("Warmup v2 skip")); }
    
    setTimeout(() => {
        if(v1) { v1.muted = false; v1.currentTime = 0; }
        if(v2) { v2.muted = false; v2.currentTime = 0; }
        runCountdownSequence();
    }, 300);
}

function runCountdownSequence() {
    const countdownScreen = document.getElementById('countdown-screen');
    const countdownElement = document.getElementById('countdown-number');
    
    countdownScreen.style.display = 'flex';
    let count = 5;
    countdownElement.textContent = count;

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownElement.textContent = count;
        } else {
            countdownElement.textContent = count; 
            clearInterval(interval);
            setTimeout(() => { transitionToIntro(); }, 1000);
        }
    }, 1000);
}

// --- LOGIC MỚI CHO PHẦN INTRO (GWEN) ---
const dialogueSequence = [
    { text: "Chào Sandwich GM, mình là Gwen!", delay: 3000 },
    { text: "Dẫu cho có nhiều chuyện vui buồn", delay: 3000 },
    { text: "thì hôm nay vẫn là ngày tuyệt vời của bạn", delay: 3000 },
    { text: "Hãy đến nhận lấy chiếc cúp của mình đi nào!", delay: 3500 }
];
let dialogueIndex = 0;

function transitionToIntro() {
    const countdownScreen = document.getElementById('countdown-screen');
    const introScreen = document.getElementById('intro-screen');
    
    countdownScreen.style.display = 'none';
    introScreen.style.display = 'flex';
    
    setTimeout(() => {
        introScreen.classList.add('start-animations');
        currentPhase = 'intro'; // Kích hoạt chế độ click cho intro
        playNextDialogue();
    }, 100);
}

function playNextDialogue() {
    const dialogueBox = document.querySelector('.dialogue-box');
    const dialogueText = document.getElementById('dialogue-text');
    const gwenWrapper = document.querySelector('.gwen-wrapper');
    const cupWrapper = document.querySelector('.cup-wrapper');

    if (dialogueIndex >= dialogueSequence.length) {
        // Hết thoại, hiện Cúp
        dialogueBox.classList.remove('show');
        gwenWrapper.classList.add('move-left');
        cupWrapper.classList.add('show-cup');
        currentPhase = 'intro-wait-click'; // Chuyển trạng thái chờ click cúp
        return;
    }

    const item = dialogueSequence[dialogueIndex];
    dialogueText.innerHTML = item.text;
    dialogueBox.classList.add('show');
    
    dialogueIndex++; // Tăng index cho lần sau

    // Lên lịch tự động ẩn và chuyển câu tiếp theo nếu không click
    // 1. Sau (delay - 500) thì ẩn box
    activeTimer = setTimeout(() => {
        dialogueBox.classList.remove('show');
        
        // 2. Sau thêm 500ms thì hiện câu tiếp
        activeTimer = setTimeout(() => {
            playNextDialogue();
        }, 500);

    }, item.delay - 500);
}


function openGift() {
    // Chỉ cho phép click cúp khi đã hết thoại
    if (currentPhase !== 'intro-wait-click') return;

    const bgMusic = document.getElementById('sound-cute'); 
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

    currentPhase = 'transition'; // Khóa click lung tung
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
            
            bgMusic.volume = CONFIG.bgVolumeLow;
            
            video.currentTime = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => { video.muted = true; video.play(); });
            }
            
            handleVideoSubtitles(video);
            currentPhase = 'video'; // Kích hoạt chế độ click skip video

            video.onended = () => {
                content.style.display = 'none'; 
                explosionScreen.style.display = 'block'; 
                currentPhase = 'explosion'; // Nổ thì ko cần skip
                
                notungVideo.currentTime = 0; 
                explosionSound.currentTime = 0; 
                notungVideo.play();
                
                setTimeout(() => { explosionSound.play().catch(e => console.log("Lỗi sound")); }, CONFIG.explosionDelay);

                notungVideo.onended = () => {
                    explosionScreen.style.display = 'none'; 
                    finalScreen.style.display = 'block'; 
                    bgMusic.volume = CONFIG.bgVolumeNormal;

                    setTimeout(() => { fadeOverlay.style.opacity = '0'; }, 50);
                    setTimeout(() => { 
                        kpImg.classList.add('move-left');
                        
                        // Bắt đầu chuỗi tin nhắn cuối
                        currentPhase = 'final'; 
                        setTimeout(renderNextMessage, 1000); 

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
        { start: 3.5, end: 4.5, text: "Hư Thức, TỬ !" },
        { start: 7.5, end: 9.0, text: "Bắn dô cái mỏ mày <span class='sub-small'>*just kidding*</span>" }
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

// --- LOGIC MỚI CHO PHẦN MESSAGES (LỜI CHÚC) ---
const finalMessages = [
    { text: "- 02/02/2026 -", time: 0 },
    { text: "Mong là có người giữ lời, đến ngày mới mở ra xem, nhưng nếu có mở trước thì thoai z biết sao giờ =)))). Oke thì là, hãy xem đây là 1 món quà tinh thần, của 1 ai đó trên thế giới này, not me !", time: 1000 },
    { text: "Không biết ngày hôm nay của bạn như thế nào, sẽ có chuyện vui, chuyện buồn, tức dzận, hay chỉ là 1 ngày bình thường như bao ngày ? Có nhận được những lời chúc mừng từ những người mình yêu thương và trân trọng ?", time: 12000 },
    { text: "Dù có chuyện gì đi nữa, sau tất cả, đến thời điểm hiện tại, bạn hãy thật vui vẻ và hạnh phúc nhé ! Vì những điều đã trải qua, vì khi đọc những dòng này, bạn vẫn có thể mỉm cười, có thể khóc, có thể ở bên những người mình yêu quý và chia sẻ những cảm xúc ấy !", time: 12000 },
    { text: "Có thể là ngày mai, 1 tháng, 1 năm, 10 năm hay 20 năm nữa, tất cả chúng ta sẽ còn ở bên nhau, có thể không, có thể sẽ quên đi nhau theo dòng thời gian, nhưng với mình, những điều chúng ta đã từng, những kỷ niệm đó sẽ không bị lãng quên và sẽ mãi ở 1 góc của não bộ. (gì chứ tui say đắm trong quá khứ lắm, vui buồn gì cũng nhớ)", time: 15000 },
    { text: "Nếu sau này không ai chúc mừng sinh nhật bạn nữa, thề với bạn là sẽ luôn có 1 người ghi nhớ điều đó, chỉ cần . 1 cái là sẽ có lời chúc tới ngay và luôn ! (thặc ra là nhớ hết, tại tùy hoàn cảnh có chúc được hay ko thoai)", time: 12000 },
    { text: "Nãy giờ nói cũng hơi nhiều, nhưng chúc thì cũng như mọi lần. Cầu mong cho bạn luôn được bình an và khỏe mạnh (à thì sức khỏe thôi chứ tiền tài học hành tự thân lo nhóe, ngắn gọn cho nó linh)", time: 10000 },
    { text: "Bonus: thật ra tụi mình ko có hình nào đẹp hết, nên mò trên trang cá nhân mới có hình", time: 8000 },
    { text: "Hết rồi đó. SINH NHỰT ZUI ZẺ NHE <3", time: 5000 },
    { text: "CHỊ PHƯƠNG GỈ MŨI cuti cuti =))))", time: 4000 }
];

let msgIndex = 0;

function renderNextMessage() {
    const container = document.getElementById('message-container');

    if (msgIndex >= finalMessages.length) {
        // Hết tin nhắn, kích hoạt Finale
        currentPhase = 'done';
        setTimeout(triggerConfetti, 500);
        setTimeout(triggerGrandFinale, 2000);
        return;
    }

    const msgObj = finalMessages[msgIndex];

    // Tạo element tin nhắn
    const p = document.createElement('div');
    if (msgIndex === 0) {
        p.classList.add('msg-title');
    } else {
        p.classList.add('msg-line');
        if (msgIndex === finalMessages.length - 1) p.classList.add('msg-highlight');
    }
    
    p.innerHTML = msgObj.text; 
    container.appendChild(p);
    
    // Hiển thị (reflow để kích hoạt transition)
    void p.offsetWidth; 
    if (msgIndex === 0) {
        // Title hiện luôn
    } else {
        p.classList.add('msg-show');
    }
    
    container.scrollTop = container.scrollHeight;

    // Chuẩn bị cho tin nhắn tiếp theo
    msgIndex++; 

    // Nếu còn tin nhắn, đặt lịch chạy tiếp theo
    if (msgIndex < finalMessages.length) {
        // Lấy thời gian chờ của tin nhắn KẾ TIẾP để set timeout
        const nextDelay = finalMessages[msgIndex].time; 
        activeTimer = setTimeout(renderNextMessage, nextDelay);
    } else {
        // Nếu vừa in xong dòng cuối, đợi xíu rồi chốt
        activeTimer = setTimeout(renderNextMessage, 5000);
    }
}

function triggerGrandFinale() {
    const container = document.getElementById('message-container');
    const kpImg = document.getElementById('kp-img');
    const sidebar = document.getElementById('right-sidebar'); 
    const feedbackLabel = document.querySelector('.feedback-label');
    const feedbackWrapper = document.getElementById('feedback-wrapper');

    container.classList.add('fade-out-text');

    setTimeout(() => {
        kpImg.classList.add('final-center-stage');
        
        setTimeout(() => {
            kpImg.classList.add('shake-animation');
            
            if(sidebar) sidebar.style.pointerEvents = 'auto';
            if(feedbackLabel) feedbackLabel.classList.add('show');

            setTimeout(() => {
                if(feedbackWrapper) {
                    feedbackWrapper.style.transition = "opacity 2s ease";
                    feedbackWrapper.style.opacity = "1";
                }
            }, 1500);

        }, 5000);

    }, 3500); 

    setInterval(() => {
        confetti({
            particleCount: 40, spread: 80, origin: { x: Math.random(), y: 0.6 }
        });
    }, 500); 
}

function triggerConfetti() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;
    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}
