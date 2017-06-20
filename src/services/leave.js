import request from '../utils/request';
import {PAGE_SIZE} from '../constants';

export function fetch({page}) {
    return request(`/api/leave/select?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function fetchusers() {
    return request(`/api/users/allusers`);
}

export function confirm(id) {
    return request(`/api/leave/confirm?id=${id}`);
}

export function reject(id) {
    return request(`/api/leave/reject?id=${id}`);
}

export function search(values, {page}) {
    return request(`/api/leave/search?_page=${page}&_limit=${PAGE_SIZE}`, {
        method: 'POST',
        body: JSON.stringify(values),
    });
}

export function create(values) {
    return request('/api/leave/new', {
        method: 'POST',
        body: JSON.stringify(values),
    });
}
