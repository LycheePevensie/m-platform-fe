import request from '../utils/request';
import {PAGE_SIZE} from '../constants';

export function fetchDepart({page}) {
    return request(`/api/department/select?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function fetchusers() {
    return request(`/api/users/allusers`);
}

export function removeDepart(id) {
    return request(`/api/department/delete?id=${id}`);
}

export function createDepart(values) {
    return request(`/api/department/new`, {
        method: 'POST',
        body: JSON.stringify(values),
    });
}

export function fetchLevel({page}) {
    return request(`/api/level/select?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function removeLevel(id) {
    return request(`/api/level/delete?id=${id}`);
}

export function createLevel(values) {
    return request(`/api/level/new`, {
        method: 'POST',
        body: JSON.stringify(values),
    });
}