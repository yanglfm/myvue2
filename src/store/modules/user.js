import {getToken, setToken, removeToken} from "../../utils/auth";
import {addWebLog, getWebLogList, login, loginOut, userInfo} from "../../api/login";
import {
    addPath,
    checkUsername,
    editUserInfo,
    getDemoList, getModule,
    updateUser,
    uploadFiles,
    uploadMultiFiles
} from "../../api/userInfo";

const user = {
    state: {
        token: getToken(),
        username: '',
        user: {},
        roles: [],//用户角色列表
        menus: [],//菜单列表
        usernameCanUse: false,
        uploadFlag: false,
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
        ,
        /**
         * 判定用户名是否可用
         */
        SET_CAN_USER_FLAG: (state, usernameCanUse) => {
            state.usernameCanUse = usernameCanUse
        },
        /**
         *设置上传文件的类别，添加请求头
         */
        SET_UPLOAD_FLAG: (state, flag) => {
            state.uploadFlag = flag
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
        GetWebLogList({commit}, params) {
            return new Promise((resolve, reject) => {
                getWebLogList(params).then(res => {
                    resolve(res)
                })
            })
        },
        CheckUsername({commit}, username) {
            return new Promise((resolve, reject) => {
                checkUsername(username).then(res => {
                    //msg=用户名已存在, code=2001,
                    if (res.data.code >= 2000) {
                        commit('SET_CAN_USER_FLAG', false)
                    } else {
                        commit('SET_CAN_USER_FLAG', true)
                    }
                    getWebLogList
                    resolve(res.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        EditUserInfo({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                editUserInfo(userInfo).then(res => {
                    console.log("userInfo----->", userInfo)
                    console.log("res----->", res)

                })
            })
        },

        GetDemoList({commit}) {
            return new Promise((resolve, reject) => {
                getDemoList().then(res => {
                    resolve(res)
                })
            })
        },
        DoUpdateUser({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                updateUser(userInfo).then(res => {
                    resolve(res)
                })
            })
        },
        DoUploadFiles({commit}, fileParams) {
            return new Promise((resolve, reject) => {
                uploadFiles(fileParams).then(res => {
                    resolve(res)
                })
            })
        },
        DoChangeUploadFlag({commit}, flag) {
            return new Promise((resolve, reject) => {

            })
        },
        DoUploadMultiFiles({commit}, files) {
            return new Promise((resolve, reject) => {
                uploadMultiFiles(files).then(res => {
                    resolve(res)
                })
            })
        },
        AddPath({commit}, path) {
            return new Promise((resolve, reject) => {
                addPath(path).then(res => {
                    resolve(res)
                })
            })
        },
        GetModule({commit}, roles) {
            return new Promise((resolve, reject) => {
                getModule(roles).then(res => {
                    console.log("res----->"+res)
                    resolve(res)
                })
            })
        }
    }
}
export default user