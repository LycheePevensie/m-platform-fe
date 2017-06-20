import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page }) {
    return request(`/api/report/select?_page=${page}&_limit=${5}`);
}

export function fetchusers() {
    return request(`/api/users/allusers`);
}

export function remove(id) {
    return request(`/api/report/${id}`, {
        method: 'DELETE',
    });
}

export function patch(id, values) {
    return request(`/api/report/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(values),
    });
}

export function create(values) {
    return request('/api/report/new', {
        method: 'POST',
        body: JSON.stringify(values),
    });
}

export function search(values) {
    return request('/api/report/search', {
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
    return request(`/api/img/imgdel/`, {
        method: 'POST',
        body: JSON.stringify(imagepath),
    });
}
