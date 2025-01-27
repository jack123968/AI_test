// DOM 元素
const postModal = document.getElementById('postModal');
const newPostBtn = document.querySelector('.new-post-btn');
const closeModalBtn = document.querySelector('.close-modal');
const cancelBtn = document.querySelector('.cancel-btn');
const newPostForm = document.getElementById('newPostForm');
const forumSearch = document.querySelector('.forum-search input');
const searchBtn = document.querySelector('.forum-search button');

// 示例帖子数据
let posts = [
    {
        id: 1,
        author: '张三丰',
        avatar: 'images/avatars/default.jpg',
        title: '【经验分享】如何鉴别真正的景德镇陶瓷',
        content: '分享多年收藏经验，教你从纹样、釉色等方面识别真品...',
        time: '2小时前',
        views: 1280,
        comments: 46,
        likes: 128,
        section: 'trade'
    },
    {
        id: 2,
        author: '李四',
        avatar: 'images/avatars/default.jpg',
        title: '【技艺传承】苏绣技法详解与教程',
        content: '详细图解苏绣基本针法，从入门到进阶的完整教程...',
        time: '5小时前',
        views: 960,
        comments: 32,
        likes: 96,
        section: 'skill'
    }
];

// 打开发帖弹窗
function openPostModal() {
    postModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭发帖弹窗
function closePostModal() {
    postModal.classList.remove('active');
    document.body.style.overflow = '';
    newPostForm.reset();
}

// 发布新帖
function handlePostSubmit(e) {
    e.preventDefault();
    
    // 获取表单数据
    const formData = new FormData(newPostForm);
    const section = formData.get('section');
    const title = formData.get('title');
    const content = formData.get('content');
    
    // 验证表单
    if (!section || !title || !content) {
        alert('请填写完整信息');
        return;
    }
    
    // 创建新帖子对象
    const newPost = {
        id: posts.length + 1,
        author: '当前用户',
        avatar: 'images/avatars/default.jpg',
        title: title,
        content: content,
        time: '刚刚',
        views: 0,
        comments: 0,
        likes: 0,
        section: section
    };
    
    // 添加到帖子列表
    posts.unshift(newPost);
    
    // 更新界面
    updatePosts();
    
    // 关闭弹窗
    closePostModal();
    
    // 显示成功提示
    showNotification('发布成功！');
}

// 搜索帖子
function searchPosts() {
    const keyword = forumSearch.value.trim().toLowerCase();
    if (!keyword) {
        updatePosts(posts);
        return;
    }
    
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword)
    );
    
    updatePosts(filteredPosts);
}

// 更新帖子列表显示
function updatePosts(postsToShow = posts) {
    const postList = document.querySelector('.post-list');
    postList.innerHTML = postsToShow.map(post => `
        <div class="post-item">
            <div class="post-meta">
                <img src="${post.avatar}" alt="${post.author}的头像" class="user-avatar">
                <span class="post-author">${post.author}</span>
                <span class="post-time">${post.time}</span>
            </div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-excerpt">${post.content}</p>
                <div class="post-stats">
                    <span><i class="fas fa-eye"></i> ${post.views}</span>
                    <span><i class="fas fa-comment"></i> ${post.comments}</span>
                    <span><i class="fas fa-heart"></i> ${post.likes}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// 显示通知
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 事件监听
newPostBtn.addEventListener('click', openPostModal);
closeModalBtn.addEventListener('click', closePostModal);
cancelBtn.addEventListener('click', closePostModal);
newPostForm.addEventListener('submit', handlePostSubmit);
searchBtn.addEventListener('click', searchPosts);
forumSearch.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        searchPosts();
    }
});

// 点击模态框外部关闭
postModal.addEventListener('click', e => {
    if (e.target === postModal) {
        closePostModal();
    }
});

// 文件上传预览
const fileInput = document.querySelector('input[type="file"]');
const uploadTip = document.querySelector('.upload-tip');

fileInput.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
        uploadTip.innerHTML = `
            <i class="fas fa-check"></i>
            <p>已选择 ${files.length} 个文件</p>
        `;
    } else {
        uploadTip.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <p>点击或拖拽图片到此处</p>
        `;
    }
});

// 拖拽上传
const uploadArea = document.querySelector('.upload-area');

uploadArea.addEventListener('dragover', e => {
    e.preventDefault();
    uploadArea.style.borderColor = '#4a5568';
});

uploadArea.addEventListener('dragleave', e => {
    e.preventDefault();
    uploadArea.style.borderColor = '#e2e8f0';
});

uploadArea.addEventListener('drop', e => {
    e.preventDefault();
    uploadArea.style.borderColor = '#e2e8f0';
    
    const files = Array.from(e.dataTransfer.files);
    if (files.some(file => !file.type.startsWith('image/'))) {
        alert('请只上传图片文件');
        return;
    }
    
    fileInput.files = e.dataTransfer.files;
    uploadTip.innerHTML = `
        <i class="fas fa-check"></i>
        <p>已选择 ${files.length} 个文件</p>
    `;
});

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    updatePosts();
}); 