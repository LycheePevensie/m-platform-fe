import request from '../utils/request';


export function login(values) {
    return request(`/api/users/login`, {
        method: 'POST',
        body: JSON.stringify(values)
    });
}

export function upload(imgurl) {
    return request(`/api/img/imgpost/`, {
        method: 'POST',
        body: JSON.stringify(imgurl),
    });
}

export function getUserInfo () {
    return request(`/api/users/userinfo`, {
        method: 'GET',
    })
}

export function logout () {
    return request(`/api/users/logout`, {
        method: 'GET',
    })
}