// tailwind-config.js
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#0da6f2",
                "background-light": "#f5f7f8",
                "background-dark": "#101c22",
                "surface-dark": "#1a262d",
                "surface-light": "#ffffff",
            },
            fontFamily: {
                "display": ["Plus Jakarta Sans", "sans-serif"],
                "body": ["Plus Jakarta Sans", "sans-serif"],
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            }
        },
    },
}

document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Khởi tạo AOS Animation (Giống Mindjoin)
    AOS.init({
        duration: 1000,       // Thời gian animation chạy (1s)
        easing: 'ease-out-quart', 
        once: true,           // Chỉ chạy 1 lần khi cuộn xuống
        offset: 100           // Kích hoạt sớm hơn 100px
    });

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(16, 28, 34, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

    // 3. Carousel Auto-scroll (Cho phần Trending Vibes)
    const carousel = document.querySelector('.no-scrollbar');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        carousel.addEventListener('mouseleave', () => isDown = false);
        carousel.addEventListener('mouseup', () => isDown = false);
        carousel.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
});