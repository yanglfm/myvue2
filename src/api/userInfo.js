import request from './request'

export function changeUsername(username) {
    return request({
        url: '/user/changeUsername',
        method: 'get',
        params: {
            username: username
        }
    })
}