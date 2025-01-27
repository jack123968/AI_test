// 轮播图数据
const slides = [
    {
        image: 'images/slide1.jpg',
        title: '传统剪纸艺术',
        description: '千年传承的民间艺术，展现精湛的手工技艺'
    },
    {
        image: 'images/slide2.jpg',
        title: '景德镇陶瓷',
        description: '中国瓷都，千年窑火不熄'
    },
    {
        image: 'images/slide3.jpg',
        title: '苏绣精品',
        description: '针针入微，传承千年的刺绣艺术'
    }
];

// 轮播图功能
const slider = {
    currentSlide: 0,
    slides: document.querySelectorAll('.slide'),
    prevBtn: document.querySelector('.slider-controls .prev'),
    nextBtn: document.querySelector('.slider-controls .next'),
    dotsContainer: document.querySelector('.slider-dots'),
    autoPlayInterval: null,

    init() {
        // 创建轮播点
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });

        // 绑定事件
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // 自动播放
        this.startAutoPlay();

        // 鼠标悬停时暂停自动播放
        document.querySelector('.slider').addEventListener('mouseenter', () => this.stopAutoPlay());
        document.querySelector('.slider').addEventListener('mouseleave', () => this.startAutoPlay());
    },

    updateSlides() {
        // 更新幻灯片显示
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });

        // 更新轮播点
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    },

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlides();
    },

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlides();
    },

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlides();
    },

    startAutoPlay() {
        this.stopAutoPlay(); // 清除可能存在的定时器
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    },

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
};

// 搜索功能
const search = {
    input: document.querySelector('.search-box input'),
    button: document.querySelector('.search-box button'),

    init() {
        this.button.addEventListener('click', () => this.handleSearch());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });
    },

    handleSearch() {
        const query = this.input.value.trim();
        if (query) {
            // 这里可以根据实际需求跳转到搜索结果页面
            window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
    }
};

// 页面滚动效果
const scroll = {
    init() {
        // 监听滚动事件
        window.addEventListener('scroll', () => this.handleScroll());

        // 为所有带有 data-scroll 属性的元素添加淡入效果
        document.querySelectorAll('[data-scroll]').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });

        // 初始检查一次
        this.handleScroll();
    },

    handleScroll() {
        document.querySelectorAll('[data-scroll]').forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.9 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    slider.init();
    search.init();
    scroll.init();

    // 为产品卡片添加淡入效果
    document.querySelectorAll('.product-card, .culture-card').forEach(card => {
        card.setAttribute('data-scroll', '');
    });
}); 