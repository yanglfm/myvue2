import router from "./router";
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

import {Message} from "element-ui";
import {getToken} from "./utils/auth";//验权
import {filterAsyncRouter} from "./store/modules/permission";

const whiteList = ['/login']//不重定向白名单

router.beforeEach((to, from, next) => {
    NProgress.start()
    console.log("token--->" + getToken())
    console.log("type of Token--->" + typeof getToken())

    if (getToken() && getToken() != "{\"id\":null,\"employeeCode\":null,\"username\":\"tom\",\"password\":\"123456\"}" && getToken() !== 'admin') {

        console.log("to--", to)// path='/dashboard'
        console.log("from--", from)// path='/'
        if (to.path === '/login') {
            console.log("to--1", to)
            next({path: '/'})
            NProgress.done()
        } else {
            console.log("to--2", to)
            console.log(store.getters.roles)
            if (store.getters.roles.length === 0) {
                store.dispatch('GetInfo').then(res => {
                    const asyncRouters = filterAsyncRouter(res.data.menus);
                    asyncRouters.push({
                        path: '*',
                        redirect: '/404',
                        hidden: true
                    })
                    store.dispatch('GenerateRoutes', asyncRouters).then(res => {
                        //动态添加路由
                        console.log(store.getters.apiRouters)
                        router.addRoutes(store.getters.apiRouters)
                        next({...to, replace: true})
                    })

                })
            } else {
                console.log(store.getters.username)
                var data = {
                    name: to.name,
                    path: to.path,
                    username: store.getters.username,
                }
                store.dispatch('AddWebLog', data).then(res => {
                        console.log("menus--->", store.getters.menus)
                        next()
                    }
                );


            }

        }
    } else {
        //访问http://localhost:8080/
        // permission.js?223d:51 noToken---> /dashboard
        // permission.js?223d:52 indexOf---> -1
        // permission.js?223d:14 undefined
        // permission.js?223d:15 undefined
        // permission.js?223d:51 noToken---> /login
        // permission.js?223d:52 indexOf---> 0
        console.log("noToken--->", to.path)
        console.log("indexOf--->", whiteList.indexOf(to.path))
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect${to.path}`)
            NProgress.done()
        }
    }

})

router.afterEach(() => {
    NProgress.done()
})