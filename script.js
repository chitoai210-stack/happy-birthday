document.addEventListener('DOMContentLoaded', () => {
    const deviceWarning = document.getElementById('device-warning');
    const startOverlay = document.getElementById('start-overlay');
    
    // Đợi 12 giây đọc thông báo
    setTimeout(() => {
        deviceWarning.style.display = 'none';
        startOverlay.style.display = 'flex';
    }, 12000); 

    startOverlay.addEventListener('click', () => {
        startOverlay.style.display = 'none';
        runCountdownSequence();
    });
});

function runCountdownSequence() {
    const countdownScreen = document.getElementById('countdown-screen');
    const countdownElement = document.getElementById('countdown-number');
    const beepSound = document.getElementById('sound-beep');
    
    // Đảm bảo âm lượng tối đa
    beepSound.volume = 1.0;

    countdownScreen.style.display = 'flex';

    // Hàm phát tiếng beep an toàn
    const playTick = () => {
        beepSound.pause();
        beepSound.currentTime = 0;
        // Bắt lỗi nếu trình duyệt chặn (dù đã click rồi thì thường không sao)
        beepSound.play().catch(e => console.error("Lỗi âm thanh:", e));
    };

    let count = 5;
    
    // Phát ngay lập tức cho số 5
    countdownElement.textContent = count;
    playTick();

    const interval = setInterval(() => {
        count--;
        
        if (count > 0) {
            countdownElement.textContent = count;
            playTick(); 
        } else if (count === 0) {
            countdownElement.textContent = count;
            // Ở số 0: Im lặng
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
        
        // Chuỗi hội thoại
        setTimeout(() => {
            dialogueText.innerHTML = "Chào Sandwich GM, mình là Gwen!";
            dialogueBox.classList.add('show'); 
            setTimeout(() => {
                dialogueBox.classList.remove('show'); 
                setTimeout(() => {
                    dialogueText.innerHTML = "Dẫu cho có nhiều chuyện vui buồn";
                    dialogueBox.classList.add('show'); 
                    setTimeout(() => {
                        dialogueBox.classList.remove('show'); 
                        setTimeout(() => {
                            dialogueText.innerHTML = "thì hôm nay vẫn là ngày tuyệt vời của bạn";
                            dialogueBox.classList.add('show'); 
                            setTimeout(() => {
                                dialogueBox.classList.remove('show'); 
                                setTimeout(() => {
                                    dialogueText.innerHTML = "Hãy đến nhận lấy chiếc cúp của mình đi nào,<br>bạn <span class='highlight'>Sandwich GM</span> dễ thương ơi!";
                                    dialogueBox.classList.add('show'); 
                                    
                                    // Gwen trượt, Cúp hiện
                                    setTimeout(() => {
                                        gwenWrapper.classList.add('move-left');
                                        cupWrapper.classList.add('show-cup');
                                    }, 1000); 

                                }, 500); 
                            }, 3000); 
                        }, 500); 
                    }, 3000); 
                }, 500); 
            }, 3000); 
        }, 1500); 
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
        setTimeout(() => {
            intro.style.display = 'none';
            trollContainer.style.display = 'none';
            content.style.display = 'flex';
            whiteOverlay.style.opacity = '0';
            
            video.play();
            handleVideoSubtitles(video);

            video.addEventListener('ended', () => {
                content.style.display = 'none'; 
                explosionScreen.style.display = 'block'; 
                notungVideo.currentTime = 0; notungVideo.play();
                explosionSound.currentTime = 0; explosionSound.play();

                notungVideo.addEventListener('ended', () => {
                    explosionScreen.style.display = 'none'; 
                    finalScreen.style.display = 'block'; 
                    setTimeout(() => { fadeOverlay.style.opacity = '0'; }, 50);
                    setTimeout(() => { kpImg.classList.add('move-left'); }, 500);
                }, { once: true });
            }, { once: true });

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
