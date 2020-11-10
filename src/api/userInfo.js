import request from './request'

export function checkUsername(username) {
    return request({
        url: '/user/checkUsername',
        method: 'get',
        params: {
            username: username
        }
    })
}

export function editUserInfo(userInfo) {
    return request({
        url: '/user/editUserInfo',
        method: 'post',
        data: userInfo,
    })
}