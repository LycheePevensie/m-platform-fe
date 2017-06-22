import * as loginService from '../services/login'
import {routerRedux} from 'dva/router'

export default {
    namespace: 'app',
    state: {
        collapsed: false,
        isNavbar: document.body.clientWidth < 769,
        user: [],
    },
    subscriptions: {
        setup({dispatch}){
            if(location.pathname != '/login'){
                dispatch({type: 'app/queryUser'});
            }
            window.onresize = () => {
                dispatch({type: 'changeNavbar'})
            }
        }
    },
    effects: {
        *queryUser ({payload}, {put, call}) {
            const data = yield call(loginService.getUserInfo)
            if (data.data.success && data.data.user) {
                yield put({
                    type: 'queryUserSuccess',
                    payload: data.data.user,
                })
            }
        },
        *logout ({payload}, {put, call}) {
            const data = yield call(loginService.logout)
            if (data.data.success) {
                yield put({
                    type: 'logoutSuccess',
                    payload: data.user,
                })
                location.pathname = '/login';
            }
        },
        *switchSider ({
            payload,
        }, {put}) {
            yield put({
                type: 'handleSwitchSider',
            })
        },
        *changeNavbar ({
            payload,
        }, {put}) {
            if (document.body.clientWidth < 769) {
                yield put({type: 'showNavbar'})
            } else {
                yield put({type: 'hideNavbar'})
            }
        },
        // *changeNavbar ({
        //     payload,
        // }, { put }) {
        //     if (document.body.clientWidth < 769) {
        //         yield put({ type: 'showNavbar' })
        //     } else {
        //         yield put({ type: 'hideNavbar' })
        //     }
        // }
    },
    reducers: {
        queryUserSuccess (state, {payload: user}) {
            return {
                ...state,
                user,
            }
        },
        logoutSuccess (state, {payload: user}) {
            return {
                ...state,
                user:[],
            }
        },
        handleSwitchSider (state) {
            // localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
            return {
                ...state,
                collapsed: !state.collapsed,
            }
        },
        showNavbar (state) {
            return {
                ...state,
                isNavbar: true,
            }
        },
        hideNavbar (state) {
            return {
                ...state,
                isNavbar: false,
            }
        }
    }
}