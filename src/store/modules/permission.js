import router, {constantRouterMap} from "../../router";

import Layout from "../../views/layout/Layout";


const permission = {
    state: {
        routers: constantRouterMap,
        apiRouters: []//后台接口获取得到的路由
    }
    ,
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.apiRouters = routers
            state.routers = constantRouterMap.concat(routers)
            console.log("state.apiRouters--->", state.apiRouters)
            console.log("state.routers--->", state.routers)
        },


    },
    actions: {
        GenerateRoutes({commit}, data) {
            return new Promise(resolve => {
                commit('SET_ROUTERS', data)
                resolve()
            })
        },

    }
}
export const filterAsyncRouter = (routers) => {//遍历后台传来的字符串，转为组件对象
    const backAsyncRouter = routers.filter(router => {
        if (router.component) {
            //Layout布局特殊处理
            if (router.component === 'Layout') {
                router.component = Layout
            } else {
                const component = router.component
                router.component = loadView(component)

            }
        }
        if (router.children && router.children.length > 0) {
            router.children = filterAsyncRouter(router.children)
        }
        return true
    })
    console.log("backAsyncRouter--->", backAsyncRouter)
    return backAsyncRouter

}

export const loadView = (view) => {
    return () => import(`@/views/${view}`)
}

export default permission