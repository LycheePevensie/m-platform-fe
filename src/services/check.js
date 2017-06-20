import request from '../utils/request';
import {PAGE_SIZE} from '../constants';

export function fetch({page}) {
    return request(`/api/check?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function create(values) {
    return request('/api/users', {
        method: 'POST',
        body: JSON.stringify(values),
    });
}

export function patch(values) {
    return request('/api/users/', {
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