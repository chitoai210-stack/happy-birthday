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

    // Nhịp đầu tiên (Số 5)
    countdownElement.textContent = count;
    playTick();

    const interval = setInterval(() => {
        count--;
        
        // Yêu cầu 2: Chỉ beep khi số > 0 (4, 3, 2, 1)
        if (count > 0) {
            countdownElement.textContent = count;
            playTick(); 
        } 
        // Khi về 0 thì chỉ hiện số, không beep
        else if (count === 0) {
            countdownElement.textContent = count;
            clearInterval(interval);
            
            // Chờ 1 giây ở số 0 rồi chuyển cảnh
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
    // Lấy các phần tử khung thoại
    const dialogueBox = document.querySelector('.dialogue-box');
    const dialogueText = document.getElementById('dialogue-text');

    countdownScreen.style.display = 'none';
    introScreen.style.display = 'flex';

    cuteMusic.volume = 0.5;
    cuteMusic.currentTime = 0;
    cuteMusic.play();

    // Kích hoạt animation nhân vật trượt vào
    setTimeout(() => {
        introScreen.classList.add('start-animations');
        
        // --- Yêu cầu 4: Kịch bản Lời thoại ---
        
        // Chờ 1.5s sau khi nhân vật bắt đầu xuất hiện thì hiện thoại 1
        setTimeout(() => {
            // Thoại 1
            dialogueText.innerHTML = "Chào Sandwich GM, mình là Gwen";
            dialogueBox.classList.add('show'); // Hiện khung thoại

            // Chờ 3s để đọc thoại 1, sau đó đổi sang thoại 2
            setTimeout(() => {
                dialogueBox.classList.remove('show'); // Ẩn tạm thời

                // Chờ 0.5s cho hiệu ứng ẩn chạy xong rồi đổi chữ và hiện lại
                setTimeout(() => {
                    // Thoại 2
                    dialogueText.innerHTML = "Hãy đến nhận lấy chiếc cúp của mình đi nào,<br>bạn <span class='highlight'>Sandwich GM</span> dễ thương ơi";
                    dialogueBox.classList.add('show'); // Hiện lại khung thoại
                }, 500);

            }, 3000); // Thời gian đọc thoại 1

        }, 1500); // Thời gian chờ nhân vật xuất hiện

    }, 100);
}

// Hàm mở quà (Giữ nguyên logic cũ)
function openGift() {
    const intro = document.getElementById('intro-screen');
    const content = document.getElementById('content-screen');
    const whiteOverlay = document.getElementById('white-overlay');
    const trollContainer = document.getElementById('troll-container');
    const video = document.getElementById('gojo-video');
    
    const clickSound = document.getElementById('sound-click');
    const cuteMusic = document.getElementById('sound-cute');

    clickSound.play();
    cuteMusic.pause();

    whiteOverlay.style.opacity = '1';

    setTimeout(() => {
        trollContainer.style.display = 'flex';
        
        setTimeout(() => {
            intro.style.display = 'none';
            trollContainer.style.display = 'none';
            content.style.display = 'flex';
            whiteOverlay.style.opacity = '0';
            video.play();

            setTimeout(() => {
                whiteOverlay.style.display = 'none';
            }, 500);

        }, 3500); 

    }, 500); 
}
