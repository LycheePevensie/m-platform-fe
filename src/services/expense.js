import request from '../utils/request';
import {PAGE_SIZE} from '../constants';

export function fetch({page}) {
    return request(`/api/expense/select?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function fetchusers() {
    return request(`/api/users/allusers`);
}

export function confirm(id) {
    return request(`/api/expense/confirm?id=${id}`);
}

export function reject(id) {
    return request(`/api/expense/reject?id=${id}`);
}

export function search(values) {
    return request('/api/expense/search', {
        method: 'POST',
        body: JSON.stringify(values),
    });
}

export function create(values) {
    return request('/api/expense/new', {
        method: 'POST',
        body: JSON.stringify(values),
    });
}
