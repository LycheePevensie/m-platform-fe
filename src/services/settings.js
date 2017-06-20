import request from '../utils/request';
import {PAGE_SIZE} from '../constants';

export function fetch({page}) {
    return request(`/api/settings/select?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function fetchusers() {
    return request(`/api/users/allusers`);
}

export function remove(id) {
    return request(`/api/settings/delete?id=${id}`);
}

export function create(values) {
    return request(`/api/settings/register`, {
        method: 'POST',
        body: JSON.stringify(values),
    });
}