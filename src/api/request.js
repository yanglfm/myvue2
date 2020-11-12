import axios from 'axios'

import {Message, MessageBox} from "element-ui";
import store from "../store";
import router from "../router";
import {getToken, setToken} from "../utils/auth";
//创建axios实例
const service = axios.create({
    baseURL: 'http://localhost:8087',
    /*这个也可以设置开发环境属于哪一个，这个还需要重新来看是否正确*/
    // baseURL: process.env.NODE_ENV == "development" ? "http://localhost:8087/api/mall" : "http://localhost:8087",
})
//request拦截器
service.interceptors.request.use(config => {
        if (store.getters.token) {
            config.headers['Authorization'] = getToken()// 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config
    }, error => {
        console.log(error)
        Promise.reject(error)
    }
)
service.interceptors.response.use(
    response => {
        if (response.headers.newToken) {
            setToken(response.headers.newToken)
        }
        const res = response.data
        if (res.code !== 200) {
            Message(
                {
                    message: res.msg,
                    type: 'error',
                    duration: 2 * 1000
                }
            )
            if (res.code === 401) {
                setToken('')
                router.push("/login")/*直接跳转，不给程序处理*/
            }
        } else {
            return response.data
        }

    }, error => {
        return Promise.reject("服务器不可用，请重新再试")
    }
)
export default service