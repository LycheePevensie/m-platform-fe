import request from '../utils/request';
import {PAGE_SIZE} from '../constants';

export function fetch({page}) {
    return request(`/api/users/select?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function remove(id) {
    return request(`/api/users/delete?id=${id}`);
}

export function patch(values, {page}) {
    return request(`/api/users/search?_page=${page}&_limit=${PAGE_SIZE}`, {
        method: 'POST',
        body: JSON.stringify(values),
    });
}

export function create(values) {
    return request(`/api/users/register`, {
        method: 'POST',
        body: JSON.stringify(values),
    });
}

export function upload(imgurl) {
    return request(`/api/img/imgpost/`, {
        method: 'POST',
        body: JSON.stringify(imgurl),
    });
}

export function removeimg(imagepath){
    console.log(imagepath)
    return request(`/api/img/imgdel/`, {
        method: 'POST',
        body: JSON.stringify(imagepath),
    });
}
