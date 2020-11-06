import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    //设置cookies有效时间为7天，不知道默认时间是多少
    return Cookies.set(TokenKey, token, {expires: 7})
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
