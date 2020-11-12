import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './permission'
import i18n from './lang'
import Moment from 'moment'
/*
我们设置mock在开发development环境可用，在生产production环境不可用。
默认为false是生产环境。我们将其设置为true即进入了开发环境，设置后，可在浏览器检查中看到You are runing Vue in development mode*/
Vue.config.productionTip = false
Vue.prototype.moment = Moment
Vue.use(ElementUI)


//由于mock拦截了所有的请求
// var dev="development"
// console.log("process.env.MOCK=======>", process.env.NODE_ENV===dev)        //process.env.MOCK=======> development
console.log("process.env.MOCK=======>", process.env.NODE_ENV)        //process.env.MOCK=======> development
console.log("process.env.MOCK=======>", typeof process.env.NODE_ENV) //main.js?56d7:21 process.env.MOCK=======> string
console.log("process.env.MOCK=======>", process.env)                 //main.js?56d7:22 process.env.MOCK=======> {NODE_ENV: "development", BASE_URL: "/"}

/*想试一下这个在发布的环境中是否不能够显示，就是线上环境加上这个不能够显示*/
process.env.NODE_ENV === 'development' && require("./mock")
// require('./mock');//单独的引入mock文件

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
