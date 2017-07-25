import * as loginService from '../services/login'
import {routerRedux} from 'dva/router'

export default {
    namespace: 'login',
    state: {
        loginLoading: false,
    },

    effects: {
        *login ({payload : values}, {put, call}) {
            yield put({type: 'showLoginLoading'})
            const data = yield call(loginService.login, values)
            console.log(data)
            yield put({type: 'hideLoginLoading'})
            if (data.data == true) {
                location.pathname = '/users';
            } else {
                throw "错误的用户名和密码"
            }
        },
        *uploadImg({payload: imgurl}, {put, call}){
            const data = yield call(loginService.upload, imgurl);
            if (data.data.imgurl) {
                location.pathname = '/';
            }
        },
    },
    reducers: {
        showLoginLoading (state) {
            return {
                ...state,
                loginLoading: false,
            }
        },
        hideLoginLoading (state) {
            return {
                ...state,
                loginLoading: false,
            }
        }
    }
}
