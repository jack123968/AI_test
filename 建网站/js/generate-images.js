// 创建画布
function createCanvas(width, height) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
}

// 绘制中国传统纹样背景
function drawTraditionalPattern(ctx, width, height, color) {
    // 绘制回字纹背景
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    const patternSize = 40;
    
    for (let x = 0; x < width; x += patternSize) {
        for (let y = 0; y < height; y += patternSize) {
            ctx.beginPath();
            ctx.moveTo(x + patternSize/4, y + patternSize/4);
            ctx.lineTo(x + patternSize*3/4, y + patternSize/4);
            ctx.lineTo(x + patternSize*3/4, y + patternSize*3/4);
            ctx.lineTo(x + patternSize/4, y + patternSize*3/4);
            ctx.lineTo(x + patternSize/4, y + patternSize/4);
            ctx.stroke();
        }
    }
}

// 绘制装饰边框
function drawDecorativeBorder(ctx, width, height, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    
    // 外边框
    ctx.strokeRect(10, 10, width-20, height-20);
    
    // 角落装饰
    const cornerSize = 30;
    // 左上角
    ctx.beginPath();
    ctx.moveTo(10, 40);
    ctx.lineTo(10, 10);
    ctx.lineTo(40, 10);
    ctx.moveTo(20, 20);
    ctx.lineTo(30, 20);
    ctx.lineTo(30, 30);
    ctx.stroke();
    
    // 右上角
    ctx.beginPath();
    ctx.moveTo(width-40, 10);
    ctx.lineTo(width-10, 10);
    ctx.lineTo(width-10, 40);
    ctx.moveTo(width-30, 20);
    ctx.lineTo(width-20, 20);
    ctx.lineTo(width-20, 30);
    ctx.stroke();
    
    // 左下角
    ctx.beginPath();
    ctx.moveTo(10, height-40);
    ctx.lineTo(10, height-10);
    ctx.lineTo(40, height-10);
    ctx.moveTo(20, height-20);
    ctx.lineTo(30, height-20);
    ctx.lineTo(30, height-30);
    ctx.stroke();
    
    // 右下角
    ctx.beginPath();
    ctx.moveTo(width-40, height-10);
    ctx.lineTo(width-10, height-10);
    ctx.lineTo(width-10, height-40);
    ctx.moveTo(width-30, height-20);
    ctx.lineTo(width-20, height-20);
    ctx.lineTo(width-20, height-30);
    ctx.stroke();
}

// 生成示例图片
function generateProductImage(category, index, width = 400, height = 300) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // 设置背景色
    const colors = {
        'paper-cut': '#FFE4E1',  // 浅粉色
        'painting': '#E6E6FA',   // 浅紫色
        'ceramics': '#E0FFFF',   // 浅青色
        'woodcarving': '#F5DEB3', // 小麦色
        'embroidery': '#FFF0F5',  // 浅粉红
        'lacquer': '#FFE4B5'     // 浅橙色
    };

    // 绘制背景
    const bgColor = colors[category] || '#FFFFFF';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // 绘制传统纹样背景
    drawTraditionalPattern(ctx, width, height, `rgba(139, 69, 19, 0.1)`);

    // 绘制装饰边框
    drawDecorativeBorder(ctx, width, height, '#8B4513');

    // 绘制分类图标
    const icons = {
        'paper-cut': '✄',
        'painting': '🖌',
        'ceramics': '🏺',
        'woodcarving': '🗿',
        'embroidery': '🧵',
        'lacquer': '🎨'
    };

    // 绘制分类名称
    ctx.fillStyle = '#8B4513';
    ctx.font = 'bold 32px 楷体';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 获取中文分类名
    const categoryNames = {
        'paper-cut': '剪纸艺术',
        'painting': '传统绘画',
        'ceramics': '景德镇陶瓷',
        'woodcarving': '木雕工艺',
        'embroidery': '刺绣织品',
        'lacquer': '漆器工艺'
    };
    
    // 绘制图标
    ctx.font = '48px serif';
    ctx.fillText(icons[category], width/2, height/2 - 50);
    
    // 绘制分类名称
    ctx.font = 'bold 32px 楷体';
    ctx.fillText(categoryNames[category], width/2, height/2 + 10);
    
    // 绘制编号
    ctx.font = '24px 楷体';
    ctx.fillText(`作品 ${index} 号`, width/2, height/2 + 50);

    // 添加水印
    ctx.font = '16px 楷体';
    ctx.fillStyle = 'rgba(139, 69, 19, 0.3)';
    ctx.fillText('遗常在', width - 50, height - 20);

    return canvas.toDataURL('image/jpeg', 0.9);
}

// 生成所有商品图片
function generateAllProductImages() {
    const categories = ['paper-cut', 'painting', 'ceramics', 'woodcarving', 'embroidery', 'lacquer'];
    const images = {};

    categories.forEach(category => {
        images[category] = [];
        for (let i = 1; i <= 2; i++) {
            const imageData = generateProductImage(category, i);
            images[category].push(imageData);
            
            // 创建下载链接
            const link = document.createElement('a');
            link.href = imageData;
            link.download = `${category}${i}.jpg`;
            link.click();
        }
    });

    return images;
}

// 当页面加载完成后生成图片
document.addEventListener('DOMContentLoaded', generateAllProductImages); 