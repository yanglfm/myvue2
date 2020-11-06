import {getToken, setToken, removeToken} from "../../utils/auth";
import {addWebLog, getWebLogList, login, loginOut, userInfo} from "../../api/login";

const user = {
    state: {
        token: getToken(),
        username: '',
        user: {},
        roles: [],//用户角色列表
        menus: []//菜单列表
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INFO: (state, user) => {
            console.error("userInfo-0------>", user)
            console.error("userInfo-1111------>")
            state.username = user.username
            state.user = user
        },
        SET_MENUS: (state, menus) => {
            state.menus = menus
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles

        },
        /**
         * 添加路由日志
         */
        SET_WEB_LOG: (state, webLog) => {

        }
    },
    actions: {
        //登录
        Login({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo.username, userInfo.password).then(res => {
                    const data = res.data;
                    console.log(data)
                    setToken(data)
                    commit('SET_TOKEN', data)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        //获取用户信息
        GetInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                userInfo(state.token).then(res => {
                    const data = res.data
                    console.log("res.data------>", res.data)
                    console.log(res.data.roles)
                    if (res.data.roles && res.data.roles.length > 0) {
                        commit('SET_ROLES', data.roles)
                    } else {
                        reject('getInfo: roles must be a non-null array !')
                    }
                    commit('SET_MENUS', data.menus)
                    //把用户名存在用户信息里
                    commit('SET_INFO', data.user)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        //登出
        LoginOut({commit, state}) {
            return new Promise((resolve, reject) => {
                loginOut().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    commit('SET_INFO', '')
                    commit('SET_MENUS', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
        ,
        AddWebLog({commit}, data) {
            return new Promise((resolve, reject) => {
                console.log("data--->", data)
                let log = {
                    description: data.name,
                    contentPath: data.path,
                    username: data.username,
                }
                addWebLog(log).then(() => {
                    resolve()
                })
            })
        },
        GetWebLogList({commit}, username) {
            return new Promise((resolve, reject) => {
                getWebLogList(username).then(res => {
                    console.error("store-----getWebLogList----->", res)
                    resolve(res)
                })
            })
        }
    }
}
export default user