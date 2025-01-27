// 商品数据示例
const products = [
    // 剪纸艺术
    {
        id: 1,
        title: '喜庆剪纸套装',
        description: '传统手工剪纸，精美窗花，年节装饰必备',
        price: 299,
        sales: 128,
        image: 'images/products/paper-cut/set1.jpg',
        category: 'paper-cut',
        tags: ['new']
    },
    {
        id: 2,
        title: '十二生肖剪纸',
        description: '传统手工剪纸，十二生肖完整套装',
        price: 399,
        sales: 89,
        image: 'images/products/paper-cut/zodiac.jpg',
        category: 'paper-cut',
        tags: ['hot']
    },
    // 传统绘画
    {
        id: 3,
        title: '山水国画',
        description: '纯手工绘制，意境优美，装裱精美',
        price: 2999,
        sales: 45,
        image: 'images/products/painting/landscape.jpg',
        category: 'painting',
        tags: ['new']
    },
    {
        id: 4,
        title: '花鸟画卷轴',
        description: '工笔画作品，栩栩如生，适合居家装饰',
        price: 1999,
        sales: 67,
        image: 'images/products/painting/flowers.jpg',
        category: 'painting',
        tags: []
    },
    // 景德镇陶瓷
    {
        id: 5,
        title: '青花瓷花瓶',
        description: '景德镇手工制作，青花瓷器，古朴典雅',
        price: 1999,
        sales: 56,
        image: 'images/products/ceramics/vase1.jpg',
        category: 'ceramics',
        tags: ['hot']
    },
    {
        id: 6,
        title: '粉彩茶具套装',
        description: '景德镇精品茶具，工艺精湛，送礼佳品',
        price: 888,
        sales: 234,
        image: 'images/products/ceramics/tea-set.jpg',
        category: 'ceramics',
        tags: []
    },
    // 木雕工艺
    {
        id: 7,
        title: '东阳木雕屏风',
        description: '传统手工木雕，精细雕刻，富贵花开',
        price: 4999,
        sales: 23,
        image: 'images/products/woodcarving/screen.jpg',
        category: 'woodcarving',
        tags: ['new']
    },
    {
        id: 8,
        title: '黄杨木雕佛像',
        description: '黄杨木精雕细琢，佛像庄严，供奉收藏皆宜',
        price: 3999,
        sales: 45,
        image: 'images/products/woodcarving/buddha.jpg',
        category: 'woodcarving',
        tags: []
    },
    // 刺绣织品
    {
        id: 9,
        title: '苏绣双面绣',
        description: '苏州名师手工刺绣，双面精工，珍品收藏',
        price: 5999,
        sales: 12,
        image: 'images/products/embroidery/double-sided.jpg',
        category: 'embroidery',
        tags: ['new']
    },
    {
        id: 10,
        title: '湘绣丝绸挂画',
        description: '湖南传统刺绣，栩栩如生，装饰收藏',
        price: 2999,
        sales: 78,
        image: 'images/products/embroidery/painting.jpg',
        category: 'embroidery',
        tags: ['hot']
    },
    // 漆器工艺
    {
        id: 11,
        title: '福州脱胎漆器茶盘',
        description: '传统手工漆器，轻巧耐用，茶道必备',
        price: 1599,
        sales: 89,
        image: 'images/products/lacquer/tea-tray.jpg',
        category: 'lacquer',
        tags: []
    },
    {
        id: 12,
        title: '扬州漆器首饰盒',
        description: '精美漆器工艺，雕刻细腻，送礼收藏皆宜',
        price: 999,
        sales: 156,
        image: 'images/products/lacquer/jewelry-box.jpg',
        category: 'lacquer',
        tags: ['hot']
    }
];

// 购物车数据
let cartItems = [];

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    initProducts();
    initCategoryFilter();
    initSortFilter();
    initCart();
});

// 初始化商品列表
function initProducts() {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = ''; // 清空现有内容

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// 创建商品卡片
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}">
            <div class="product-tags">
                ${product.tags.map(tag => `<span class="tag ${tag}">${tag === 'new' ? '新品' : '热销'}</span>`).join('')}
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-desc">${product.description}</p>
            <div class="product-meta">
                <span class="price">¥${product.price}</span>
                <span class="sales">已售 ${product.sales}</span>
            </div>
            <div class="product-footer">
                <button class="btn-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> 加入购物车
                </button>
                <button class="btn-favorite" data-id="${product.id}">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        </div>
    `;

    // 绑定加入购物车事件
    card.querySelector('.btn-cart').addEventListener('click', () => {
        addToCart(product);
    });

    // 绑定收藏事件
    card.querySelector('.btn-favorite').addEventListener('click', (e) => {
        toggleFavorite(e.currentTarget);
    });

    return card;
}

// 分类筛选功能
function initCategoryFilter() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除其他分类的active类
            categoryItems.forEach(i => i.classList.remove('active'));
            // 添加当前分类的active类
            item.classList.add('active');

            // 获取选中的分类
            const selectedCategory = getCategoryFromText(item.querySelector('span').textContent);
            
            // 筛选并显示商品
            filterProducts(selectedCategory);
        });
    });
}

// 根据文本获取分类值
function getCategoryFromText(text) {
    const categoryMap = {
        '剪纸艺术': 'paper-cut',
        '传统绘画': 'painting',
        '景德镇陶瓷': 'ceramics',
        '木雕工艺': 'woodcarving',
        '刺绣织品': 'embroidery',
        '漆器工艺': 'lacquer'
    };
    return categoryMap[text] || '';
}

// 筛选商品
function filterProducts(category) {
    const filteredProducts = category ? 
        products.filter(product => product.category === category) : 
        products;

    // 更新商品显示
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// 排序功能
function initSortFilter() {
    const sortSelect = document.querySelector('.filter-group select[value="newest"]');
    sortSelect?.addEventListener('change', (e) => {
        const value = e.target.value;
        let sortedProducts = [...products];

        switch (value) {
            case 'price-asc':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'sales':
                sortedProducts.sort((a, b) => b.sales - a.sales);
                break;
            default: // newest
                sortedProducts = [...products]; // 保持原有顺序
                break;
        }

        // 更新商品显示
        const productsGrid = document.querySelector('.products-grid');
        productsGrid.innerHTML = '';

        sortedProducts.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    });
}

// 购物车功能
function initCart() {
    const cartBtn = document.querySelector('.btn-cart');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCartBtn = document.querySelector('.close-cart');

    // 打开购物车
    cartBtn?.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });

    // 关闭购物车
    closeCartBtn?.addEventListener('click', () => {
        cartSidebar.classList.remove('active');
    });

    // 点击外部关闭购物车
    document.addEventListener('click', (e) => {
        if (!cartSidebar.contains(e.target) && !e.target.closest('.btn-cart')) {
            cartSidebar.classList.remove('active');
        }
    });
}

// 添加商品到购物车
function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            ...product,
            quantity: 1
        });
    }

    updateCartUI();
    showCartNotification('商品已添加到购物车');
}

// 更新购物车界面
function updateCartUI() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    
    // 清空现有内容
    cartItemsContainer.innerHTML = '';
    
    // 计算总价
    let totalPrice = 0;
    
    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-info">
                <h4>${item.title}</h4>
                <div class="cart-item-price">¥${item.price}</div>
                <div class="cart-item-quantity">
                    <button class="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase">+</button>
                </div>
            </div>
            <button class="remove-item">×</button>
        `;
        
        cartItemsContainer.appendChild(itemElement);
    });
    
    // 更新总价
    totalPriceElement.textContent = `¥${totalPrice}`;
}

// 显示购物车通知
function showCartNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 2秒后移除通知
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// 收藏功能
function toggleFavorite(button) {
    const icon = button.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        showCartNotification('已添加到收藏');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        showCartNotification('已取消收藏');
    }
} 