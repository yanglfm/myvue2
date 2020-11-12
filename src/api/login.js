import request from './request'

export function login(username, password) {
    return request({
        url: '/user/login',
        data: {
            username,
            password,
        }
        , method: 'post'
    })
}

export function userInfo(token) {
    return request({
        url: '/user/userInfo',
        method: 'get',
        params: {token}
    })
}

export function loginOut() {
    return request({
        url: '/user/loginOut',
        method: 'post',
    })
}

export function addWebLog(log) {
    return request({
        url: 'log/addWebLog',
        method: 'post',
        data: log
    })
}

export function getWebLogList(params) {
    return request({
        url:'log/getWebLogList',
        method:'get',
        params:{
            username:params.username,
            pageNo:params.pageNo,
            pageNum:params.pageNum,
        }
    })

}
