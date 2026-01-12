// Chạy chức năng đếm ngược ngay khi trang web tải xong
document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
});

function startCountdown() {
    let timeLeft = 5;
    const countdownElement = document.getElementById('countdown-number');
    const countdownScreen = document.getElementById('countdown-screen');
    const introScreen = document.getElementById('intro-screen');

    const timerId = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            countdownElement.textContent = timeLeft;
        } else {
            // Khi đếm về 0
            clearInterval(timerId);
            countdownElement.textContent = "0"; // Hoặc "START!" tùy bạn

            setTimeout(() => {
                // 1. Ẩn màn hình đếm ngược
                countdownScreen.style.display = 'none';
                
                // 2. Hiện màn hình Intro
                introScreen.style.display = 'flex';
                
                // 3. Kích hoạt animation (trượt vào) cho Gwen và Cúp
                // Bằng cách thêm class 'start-animations' vào cha của chúng
                setTimeout(() => {
                     introScreen.classList.add('start-animations');
                }, 100); // Delay nhẹ để đảm bảo display:flex đã ăn

            }, 500); // Đợi 0.5s ở số 0 rồi mới chuyển
        }
    }, 1000); // Đếm mỗi giây
}


function openGift() {
    const intro = document.getElementById('intro-screen');
    const content = document.getElementById('content-screen');
    const whiteOverlay = document.getElementById('white-overlay');
    const video = document.getElementById('gojo-video');

    // 1. Kích hoạt màn trắng xóa (Flashbang!)
    whiteOverlay.style.opacity = '1';

    // 2. Đợi 2 giây (2000ms) trong trạng thái trắng xóa
    setTimeout(() => {
        // Ẩn màn hình intro đi
        intro.style.display = 'none';
        
        // Hiện màn hình chứa video
        content.style.display = 'flex';
        
        // Tắt màn trắng từ từ
        whiteOverlay.style.opacity = '0';

        // 3. Phát video (Trình duyệt cho phép vì người dùng đã click)
        video.play().catch(error => {
            console.log("Tự động phát video bị chặn, cần người dùng bấm play trên video:", error);
            // Một số trình duyệt khó tính vẫn có thể chặn, nhưng thường click là đủ.
        });

        // Sau khi màn trắng tắt hẳn thì ẩn nó đi để không che video
        setTimeout(() => {
            whiteOverlay.style.display = 'none';
        }, 500);

    }, 2000); // Thời gian chờ trắng xóa
}
