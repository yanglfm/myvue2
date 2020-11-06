import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from "../views/layout/Layout";


Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

export const constantRouterMap = [

    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        icon: 'el-icon-s-home',
        children: [
            {
                name:'首页',
                path: 'dashboard',
                meta: {
                    title: '首页',
                    icon: 'el-icon-s-home'
                },
                component: () => import('@/views/dashboard/index')

            }
        ]
    },
    // {
    //     path: '/auth222',
    //     component: Layout,
    //     // redirect: '/dashboard',
    //     name: '权限管理',
    //     title:'权限管理',
    //     icon: 'el-icon-user-solid',
    //     meta: {
    //         title: '权限管理',
    //         icon: 'el-icon-user'
    //     },
    //     children: [
    //         {
    //             name:'用户权限',
    //             path: '/auth222/index',
    //             meta: {
    //                 title: '用户权限',
    //                 icon: 'el-icon-user'
    //             },
    //             component: () => import('@/views/auth/index')
    //         },
    //         {
    //             name:'系统权限',
    //             path: '/system/index',
    //             meta: {
    //                 title: '系统权限',
    //                 icon: 'el-icon-setting'
    //             },
    //             component: () => import('@/views/system/index')
    //         }
    //     ]
    // },
]

const router = new VueRouter({
    routes: constantRouterMap
})

export default router
