// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initAvatarUpload();
    initFormValidation();
    initAddressManagement();
    initRegionSelect();
});

// 标签页切换功能
function initTabs() {
    const navItems = document.querySelectorAll('.profile-nav li');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除所有active类
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // 添加active类到当前项
            item.classList.add('active');
            const tabId = item.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 订单筛选
    const orderFilters = document.querySelectorAll('.order-filter button');
    orderFilters.forEach(button => {
        button.addEventListener('click', () => {
            orderFilters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // 这里可以添加订单筛选逻辑
        });
    });

    // 收藏夹筛选
    const favoriteFilters = document.querySelectorAll('.favorite-filter button');
    favoriteFilters.forEach(button => {
        button.addEventListener('click', () => {
            favoriteFilters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // 这里可以添加收藏夹筛选逻辑
        });
    });

    // 消息筛选
    const messageFilters = document.querySelectorAll('.message-filter button');
    messageFilters.forEach(button => {
        button.addEventListener('click', () => {
            messageFilters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // 这里可以添加消息筛选逻辑
        });
    });
}

// 头像上传功能
function initAvatarUpload() {
    const editAvatarBtn = document.querySelector('.edit-avatar');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    editAvatarBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.querySelector('.user-avatar img').src = event.target.result;
                // 这里可以添加头像上传到服务器的逻辑
            };
            reader.readAsDataURL(file);
        }
    });
}

// 表单验证功能
function initFormValidation() {
    const settingsForm = document.querySelector('.settings-form form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(settingsForm);
            const data = Object.fromEntries(formData.entries());
            
            // 这里可以添加表单验证和提交逻辑
            console.log('表单数据：', data);
            
            // 显示成功提示
            showNotification('保存成功！');
        });
    }
}

// 收货地址管理
function initAddressManagement() {
    const addAddressBtn = document.querySelector('#address .btn-primary');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', () => {
            // 这里可以添加新增地址的逻辑，比如显示一个模态框
            showAddressModal();
        });
    }

    // 为地址操作按钮添加事件
    document.querySelectorAll('.address-actions button').forEach(button => {
        button.addEventListener('click', (e) => {
            const action = e.target.textContent.trim();
            const addressItem = button.closest('.address-item');
            
            if (action === '编辑') {
                // 这里可以添加编辑地址的逻辑
                editAddress(addressItem);
            } else if (action === '删除') {
                // 这里可以添加删除地址的逻辑
                deleteAddress(addressItem);
            }
        });
    });
}

// 地区选择相关代码
async function initRegionSelect() {
    const provinceSelect = document.getElementById('province');
    const citySelect = document.getElementById('city');
    const districtSelect = document.getElementById('district');

    try {
        // 获取所有地区数据
        const response = await fetch('http://localhost:3000/api/region/all');
        const regionData = await response.json();

        // 清空现有选项
        provinceSelect.innerHTML = '<option value="">请选择省份</option>';
        citySelect.innerHTML = '<option value="">请选择城市</option>';
        districtSelect.innerHTML = '<option value="">请选择区县</option>';

        // 添加省份选项
        Object.keys(regionData).forEach(region => {
            Object.keys(regionData[region]).forEach(province => {
                const option = document.createElement('option');
                option.value = province;
                option.textContent = province;
                provinceSelect.appendChild(option);
            });
        });

        // 省份选择变化时更新城市
        provinceSelect.addEventListener('change', async function() {
            const province = this.value;
            citySelect.innerHTML = '<option value="">请选择城市</option>';
            districtSelect.innerHTML = '<option value="">请选择区县</option>';

            if (province) {
                // 查找选中省份所在的地区
                let selectedRegion = null;
                Object.keys(regionData).forEach(region => {
                    if (regionData[region][province]) {
                        selectedRegion = region;
                    }
                });

                if (selectedRegion) {
                    const cities = regionData[selectedRegion][province];
                    Object.keys(cities).forEach(city => {
                        const option = document.createElement('option');
                        option.value = city;
                        option.textContent = city;
                        citySelect.appendChild(option);
                    });
                }
            }
        });

        // 城市选择变化时更新区县
        citySelect.addEventListener('change', async function() {
            const province = provinceSelect.value;
            const city = this.value;
            districtSelect.innerHTML = '<option value="">请选择区县</option>';

            if (city) {
                // 查找选中省份所在的地区
                let selectedRegion = null;
                Object.keys(regionData).forEach(region => {
                    if (regionData[region][province]) {
                        selectedRegion = region;
                    }
                });

                if (selectedRegion) {
                    const districts = regionData[selectedRegion][province][city]["市辖区"];
                    districts.forEach(district => {
                        const option = document.createElement('option');
                        option.value = district;
                        option.textContent = district;
                        districtSelect.appendChild(option);
                    });
                }
            }
        });

    } catch (error) {
        console.error('获取地区数据失败:', error);
        showNotification('获取地区数据失败，请稍后重试', 'error');
    }
}

// 页面加载时初始化地区选择
document.addEventListener('DOMContentLoaded', initRegionSelect);

// 显示地址编辑模态框
function showAddressModal(address = null) {
    const modal = document.getElementById('addressModal');
    const form = document.getElementById('addressForm');
    const title = modal.querySelector('.modal-header h3');

    // 重置表单
    form.reset();

    // 初始化地区选择
    initRegionSelect();

    // 如果是编辑模式，填充表单数据
    if (address) {
        title.textContent = '编辑收货地址';
        // 这里填充表单数据
        const data = {
            name: address.querySelector('h4').textContent.split(' ')[0],
            phone: address.querySelector('h4').textContent.split(' ')[1],
            address: address.querySelector('p').textContent,
            isDefault: address.querySelector('.tag-default') !== null
        };

        form.elements.name.value = data.name;
        form.elements.phone.value = data.phone;
        form.elements.isDefault.checked = data.isDefault;

        // 解析并设置地址
        const addressParts = data.address.split(' ');
        if (addressParts.length >= 3) {
            // 触发选择事件以更新城市和区县选项
            form.elements.province.value = addressParts[0];
            form.elements.province.dispatchEvent(new Event('change'));
            
            setTimeout(() => {
                form.elements.city.value = addressParts[1];
                form.elements.city.dispatchEvent(new Event('change'));
                
                setTimeout(() => {
                    form.elements.district.value = addressParts[2];
                    form.elements.address.value = addressParts.slice(3).join(' ');
                }, 0);
            }, 0);
        }
    } else {
        title.textContent = '新增收货地址';
    }

    // 显示模态框
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 绑定关闭事件
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancelAddress');
    const saveBtn = document.getElementById('saveAddress');

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeBtn.onclick = closeModal;
    cancelBtn.onclick = closeModal;

    // 点击模态框外部关闭
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
        }
    };

    // 保存地址
    saveBtn.onclick = () => {
        if (form.checkValidity()) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // 创建新的地址项
            const addressItem = createAddressItem(data);
            
            // 如果是编辑模式，替换原有地址
            if (address) {
                address.replaceWith(addressItem);
            } else {
                // 添加新地址到列表
                document.querySelector('.address-list').appendChild(addressItem);
            }

            // 如果设为默认地址，更新其他地址的默认状态
            if (data.isDefault) {
                document.querySelectorAll('.address-item').forEach(item => {
                    if (item !== addressItem) {
                        const defaultTag = item.querySelector('.tag-default');
                        if (defaultTag) {
                            defaultTag.remove();
                        }
                    }
                });
            }

            closeModal();
            showNotification('地址保存成功！');
        } else {
            // 触发浏览器的表单验证
            form.reportValidity();
        }
    };
}

// 创建地址项
function createAddressItem(data) {
    const addressItem = document.createElement('div');
    addressItem.className = 'address-item';
    
    const fullAddress = `${data.province} ${data.city} ${data.district} ${data.address}`;
    const tagText = {
        'home': '家',
        'company': '公司',
        'school': '学校'
    };

    addressItem.innerHTML = `
        <div class="address-content">
            <div class="address-tags">
                ${data.isDefault ? '<span class="tag-default">默认</span>' : ''}
                <span class="tag-${data.tag}">${tagText[data.tag]}</span>
            </div>
            <h4>${data.name} ${data.phone}</h4>
            <p>${fullAddress}</p>
        </div>
        <div class="address-actions">
            <button class="btn-secondary">编辑</button>
            <button class="btn-secondary">删除</button>
        </div>
    `;

    // 绑定编辑和删除事件
    const [editBtn, deleteBtn] = addressItem.querySelectorAll('.address-actions button');
    
    editBtn.onclick = () => editAddress(addressItem);
    deleteBtn.onclick = () => deleteAddress(addressItem);

    return addressItem;
}