import fetch from 'dva/fetch';

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default async function request(url, options) {
    options = options ? options : {};
    options.credentials = 'include';
    const response = await fetch(url, options);

    checkStatus(response);
    // console.log(response.responseText);

    const data = await response.json();

    const ret = {
        data,
        headers: {},
    };

    if (response.headers.get('x-total-count')) {
        ret.headers['x-total-count'] = response.headers.get('x-total-count');
    }
    // if (response.headers.get('Access-token')) {
    //     // sessionStorage.setItem('Access-token', response.headers.get('Access-token'));
    //     let exp = new Date();
    //     exp.setTime(exp.getTime() + 30*24*60*60*1000);
    //     document.cookie = "token=" + response.headers.get('Access-token') + ";expires=" + exp.toGMTString();
    // }
    return ret;
}
