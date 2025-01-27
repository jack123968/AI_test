// 导入各个地区的数据
import north from './north.js';
import northeast from './northeast.js';
import east from './east.js';
import south from './south.js';
import southwest from './southwest.js';
import northwest from './northwest.js';
import central from './central.js';

// 合并所有地区数据
const regionData = {
    ...north,    // 华北地区：北京、天津、河北、山西、内蒙古
    ...northeast, // 东北地区：辽宁、吉林、黑龙江
    ...east,     // 华东地区：上海、江苏、浙江、安徽、福建、江西、山东
    ...central,  // 华中地区：河南、湖北、湖南
    ...south,    // 华南地区：广东、广西、海南
    ...southwest, // 西南地区：重庆、四川、贵州、云南、西藏
    ...northwest // 西北地区：陕西、甘肃、青海、宁夏、新疆
};

export default regionData; 