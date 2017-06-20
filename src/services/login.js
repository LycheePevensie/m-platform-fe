import request from '../utils/request';


export function login(values) {
    return request('/api/users', {
        method: 'POST',
        body: JSON.stringify(values)
    });
}
