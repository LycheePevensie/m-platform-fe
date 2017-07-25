import request from '../utils/request';
import {PAGE_SIZE} from '../constants';

export function fetch({page}) {
    return request(`/api/check/select?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function create(values) {
    return request('/api/check/new', {
        method: 'POST',
        body: JSON.stringify(values),
    });
}

export function search(values) {
    return request('/api/check/', {
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