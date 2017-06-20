import request from '../utils/request';
import {PAGE_SIZE} from '../constants';

export function fetch({page}) {
    return request(`/api/task/select?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function fetchusers() {
    return request(`/api/users/allusers`);
}

export function remove(id) {
    return request(`/api/task/${id}`, {
        method: 'DELETE',
    });
}

export function complete(id) {
    return request(`/api/task/confirm?id=${id}`);
}

export function patch(id, values) {
    return request(`/api/task/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(values),
    });
}

export function search(values) {
    return request('/api/leave/search', {
        method: 'POST',
        body: JSON.stringify(values),
    });
}

export function create(values) {
    return request('/api/task/new', {
        method: 'POST',
        body: JSON.stringify(values),
    });
}