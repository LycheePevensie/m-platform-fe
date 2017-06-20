import {login} from '../services/login'
import {routerRedux} from 'dva/router'

export default {
    namespace: 'login',
    state: {
        loginLoading: false,
    },

    effects: {
        *login ({payload : values}, {put, call}) {
            yield put({type: 'showLoginLoading'})
            const data = yield call(login, values)
            console.log(data);
            yield put({type: 'hideLoginLoading'})
            if (data.data == true) {
                location.pathname = '/';
            } else {
                throw "错误的用户名和密码"
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
