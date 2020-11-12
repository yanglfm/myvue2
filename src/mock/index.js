import homeApi from './home'
import userApi from './user'
import demoList from "./demoList";

const Mock = require('mockjs')
/*//设置拦截ajax请求的相应时间
Mock.setup({
    timeout: '200-600'
});

let configArray = [];

//使用webpack的require.context()遍历所有mock文件
const files = require.context('.', true, /\.js$/);
files.keys().forEach((key) => {
    if (key === './index.js') return;
    configArray = configArray.concat(files(key).default);
});

// 注册所有的mock服务
configArray.forEach((item) => {
    for (let [path, target] of Object.entries(item)) {
        let protocol = path.split('|');
        Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target);
    }
});*/

// 设置200-2000毫秒延时请求数据
Mock.setup({
  timeout: '200-2000'
})

// 首页相关
// 拦截的是 /home/getData
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)

// 用户相关
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/batchremove/, 'get', userApi.batchremove)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)


Mock.mock(/\/demo\/demoList/,'get',demoList.demoList)
Mock.mock(/\/demo\/updateUser/,'post',demoList.updateUser)