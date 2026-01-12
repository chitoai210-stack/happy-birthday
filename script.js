document.addEventListener('DOMContentLoaded', () => {
    const startOverlay = document.getElementById('start-overlay');
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
        
        // --- CHUỖI HỘI THOẠI 4 BƯỚC ---
        setTimeout(() => {
            // Câu 1
            dialogueText.innerHTML = "Chào Sandwich GM, mình là Gwen!";
            dialogueBox.classList.add('show'); 

            setTimeout(() => {
                dialogueBox.classList.remove('show'); 

                setTimeout(() => {
                    // Câu 2 (MỚI)
                    dialogueText.innerHTML = "Dẫu cho có nhiều chuyện vui buồn";
                    dialogueBox.classList.add('show'); 

                    setTimeout(() => {
                        dialogueBox.classList.remove('show'); 

                        setTimeout(() => {
                            // Câu 3 (MỚI)
                            dialogueText.innerHTML = "thì hôm nay vẫn là ngày tuyệt vời của bạn";
                            dialogueBox.classList.add('show'); 

                            setTimeout(() => {
                                dialogueBox.classList.remove('show'); 

                                setTimeout(() => {
                                    // Câu 4 (CUỐI)
                                    dialogueText.innerHTML = "Hãy đến nhận lấy chiếc cúp của mình đi nào,<br>bạn <span class='highlight'>Sandwich GM</span> dễ thương ơi!";
                                    dialogueBox.classList.add('show'); 
                                }, 500); // Chờ hiện câu 4

                            }, 3000); // Đọc câu 3

                        }, 500); // Chờ hiện câu 3

                    }, 3000); // Đọc câu 2

                }, 500); // Chờ hiện câu 2

            }, 3000); // Đọc câu 1

        }, 1500); // Chờ Gwen xuất hiện

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

            // KHI VIDEO KẾT THÚC
            video.addEventListener('ended', () => {
                content.style.display = 'none';
                endScreen.style.display = 'block'; // Dùng block để chứa các phần tử con
                
                // Kích hoạt hiệu ứng nổ tung
                triggerPurpleBoom(endScreen);

            }, { once: true });

            setTimeout(() => {
                whiteOverlay.style.display = 'none';
            }, 500);

        }, 3500); 

    }, 500); 
}

// --- HÀM TẠO HIỆU ỨNG NỔ TUNG (STARBURST) ---
function triggerPurpleBoom(container) {
    // 1. Tạo các tia năng lượng (Spikes)
    const spikeCount = 40;
    for (let i = 0; i < spikeCount; i++) {
        const spike = document.createElement('div');
        spike.classList.add('boom-spike');
        
        // Random góc xoay
        const angle = Math.random() * 360;
        // Random độ dài
        const height = 100 + Math.random() * 300; // 100px -> 400px
        const width = 2 + Math.random() * 4; // 2px -> 6px
        
        spike.style.setProperty('--angle', `${angle}deg`);
        spike.style.height = `${height}px`;
        spike.style.width = `${width}px`;
        
        // Animation
        spike.style.animation = `spikeExplode 0.8s ease-out forwards`;
        
        container.appendChild(spike);
    }

    // 2. Tạo các hạt bụi nổ (Particles)
    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.classList.add('boom-particle');
        
        // Random vị trí bay đến
        const angle = Math.random() * 360 * (Math.PI / 180); // Radian
        const distance = 200 + Math.random() * 500; // Bay xa từ 200px đến 700px
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        // Random kích thước hạt
        const size = 5 + Math.random() * 10;
        
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.setProperty('--tx', `${tx}px`);
        p.style.setProperty('--ty', `${ty}px`);
        
        // Animation ngẫu nhiên tốc độ
        const duration = 0.5 + Math.random() * 0.5;
        p.style.animation = `particleFly ${duration}s ease-out forwards`;
        
        container.appendChild(p);
    }
}

// --- SUBTITLES ---
function handleVideoSubtitles(video) {
    const subtitleDiv = document.getElementById('video-subtitles');
    
    // Bạn nhớ chỉnh lại số giây cho khớp file video nhé
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
