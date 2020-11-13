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

/*测试mock*/
export function getDemoList() {
    return request({
        // url:'/user/getUser',
        url: '/demo/demoList',
        method: 'get',
    })
}

export function updateUser(userInfo) {
    return request({
        // url:'/user/getUser',
        url: '/demo/updateUser',
        method: 'post',
        data: userInfo,
    })
}

export function uploadFiles(fileParams) {
    return request({
        url:'/file/upload',
        method:'post',
        data:fileParams
    })
}