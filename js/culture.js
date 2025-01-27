// DOM 元素
const categoryList = document.querySelector('.category-list');
const categoryItems = document.querySelectorAll('.category-list li');
const cultureGrids = document.querySelectorAll('.culture-grid');

// 文化内容数据
const cultureData = {
    crafts: [
        {
            title: '景德镇陶瓷',
            description: '景德镇素有"瓷都"之称，千年窑火传承着中国陶瓷文化的精髓。',
            image: 'images/culture/ceramics.jpg',
            location: '江西省景德镇市',
            date: '2006年列入首批国家级非遗名录'
        },
        {
            title: '苏绣',
            description: '苏绣以其精细的针法、优美的图案和浓郁的艺术特色闻名于世。',
            image: 'images/culture/embroidery.jpg',
            location: '江苏省苏州市',
            date: '2006年列入首批国家级非遗名录'
        }
    ],
    art: [
        {
            title: '中国剪纸',
            description: '剪纸艺术是中国最普及的民间艺术形式之一，具有深厚的文化内涵。',
            image: 'images/culture/paper-cut.jpg',
            location: '全国各地',
            date: '2009年列入人类非物质文化遗产名录'
        },
        {
            title: '中国画',
            description: '中国画以其独特的笔墨语言和艺术表现形式，展现着东方艺术的魅力。',
            image: 'images/culture/painting.jpg',
            location: '全国各地',
            date: '传承千年的艺术瑰宝'
        }
    ],
    medicine: [
        {
            title: '中医针灸',
            description: '针灸是中医治疗疾病的重要手段，体现着中华医学的智慧。',
            image: 'images/culture/acupuncture.jpg',
            location: '全国各地',
            date: '2010年列入人类非物质文化遗产名录'
        }
    ],
    custom: [
        {
            title: '端午节',
            description: '端午节是中国重要的传统节日，包含着丰富的文化内涵。',
            image: 'images/culture/dragon-boat.jpg',
            location: '全国各地',
            date: '2009年列入人类非物质文化遗产名录'
        }
    ]
};

// 切换分类
function switchCategory(category) {
    // 更新分类按钮状态
    categoryItems.forEach(item => {
        if (item.dataset.category === category) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // 显示对应分类的内容
    if (category === 'all') {
        cultureGrids.forEach(grid => {
            grid.style.display = 'grid';
        });
    } else {
        cultureGrids.forEach(grid => {
            if (grid.dataset.category === category) {
                grid.style.display = 'grid';
            } else {
                grid.style.display = 'none';
            }
        });
    }
}

// 生成文化卡片HTML
function generateCultureCard(item) {
    return `
        <article class="culture-card">
            <div class="culture-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="culture-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="culture-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${item.date}</span>
                </div>
                <a href="#" class="read-more">了解更多 <i class="fas fa-arrow-right"></i></a>
            </div>
        </article>
    `;
}

// 更新文化内容
function updateCultureContent() {
    Object.entries(cultureData).forEach(([category, items]) => {
        const grid = document.querySelector(`.culture-grid[data-category="${category}"]`);
        if (grid) {
            grid.innerHTML = items.map(generateCultureCard).join('');
        }
    });
}

// 初始化
function init() {
    // 绑定分类切换事件
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            switchCategory(category);
        });
    });

    // 更新文化内容
    updateCultureContent();

    // 添加滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.culture-card').forEach(card => {
        observer.observe(card);
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', init);

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 