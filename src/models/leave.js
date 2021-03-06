import * as leaveService from '../services/leave';
import * as loginService from '../services/login';

export default {
    namespace: 'leave',
    state: {
        list: [],
        total: null,
        page: null,
        operation: true,
        userlist: []
    },
    reducers: {
        save(state, {payload: {datas: list, total, page, userlist:userlist}}) {
            return {...state, list, total, page, userlist};
        },
        showcreate (state) {
            return {...state, operation: true,}
        },
        hidecreate (state) {
            return {...state, operation: false,}
        },
        // userstate (state, {payload:{userlist: userlist}}) {
        //     return {...state, userlist,}
        // }
    },
    effects: {
        *fetch({payload: {page = 1}}, {call, put}) {
            // if (location.pathname === '/leaveProposer') {
            //     yield put({type: 'showcreate'})
            // }
            // if (location.pathname === '/leaveApprover') {
            //     yield put({type: 'hidecreate'})
            // }
            // const {data, headers} = yield call(leaveService.fetch, {page});
            // console.log(data);
            // const allusers = yield call(leaveService.fetchusers);
            // const userlist = allusers.data;
            // yield put({
            //     type: 'save',
            //     payload: {
            //         data,
            //         total: parseInt(headers['x-total-count'], 10),
            //         page: parseInt(page, 10),
            //         userlist: userlist,
            //     },
            // });
            const {data, headers} = yield call(leaveService.fetch, {page});
            const allusers = yield call(leaveService.fetchusers);
            const userlist = allusers.data;
            const curUser = yield call(loginService.getUserInfo);
            if (location.pathname === '/leaveProposer') {
                yield put({type: 'showcreate'});
                let datas = [];
                for (let i in data) {
                    if (data[i].leaveUser == curUser.data.user.userId) {
                        datas.push(data[i])
                    }
                }
                yield put({
                    type: 'save',
                    payload: {
                        datas,
                        total: parseInt(headers['x-total-count'], 10),
                        page: parseInt(page, 10),
                        userlist: userlist,
                    },
                });
            }
            if (location.pathname === '/leaveApprover') {
                yield put({type: 'hidecreate'})
                let datas = [];
                for (let i in data) {
                    if (data[i].leaveManager == curUser.data.user.userId) {
                        datas.push(data[i])
                    }
                }
                yield put({
                    type: 'save',
                    payload: {
                        datas,
                        total: parseInt(headers['x-total-count'], 10),
                        page: parseInt(page, 10),
                        userlist: userlist,
                    },
                });
            }

        },
        // *fetchusers({payload}, {call,put}){
        //     yield put({
        //         type: 'userstate',
        //         payload: {userlist}
        //     });
        // },
        *confirm({payload: id}, {call, put, select}) {
            yield call(leaveService.confirm, id);
            const page = yield select(state => state.users.page);
            yield put({type: 'fetch', payload: {page}});
        },
        *reject({payload: id}, {call, put, select}) {
            yield call(leaveService.reject, id);
            const page = yield select(state => state.users.page);
            yield put({type: 'fetch', payload: {page}});
        },
        *search({payload: values, page = 1}, {call, put}) {
            const {data, headers} = yield call(leaveService.search, values, {page});
            const curUser = yield call(loginService.getUserInfo);
            if (location.pathname === '/leaveProposer') {
                let datas = [];
                for (let i in data) {
                    if (data[i].leaveUser == curUser.data.user.userId) {
                        datas.push(data[i])
                    }
                }
                yield put({
                    type: 'save',
                    payload: {
                        datas,
                        total: parseInt(headers['x-total-count'], 10),
                        page: parseInt(page, 10),
                    },
                });
            }
            if (location.pathname === '/leaveApprover') {
                let datas = [];
                for (let i in data) {
                    if (data[i].leaveManager == curUser.data.user.userId) {
                        datas.push(data[i])
                    }
                }
                yield put({
                    type: 'save',
                    payload: {
                        datas,
                        total: parseInt(headers['x-total-count'], 10),
                        page: parseInt(page, 10),
                    },
                });
            }
        },
        *create({payload: values}, {call, put}) {
            yield call(leaveService.create, values);
            yield put({type: 'reload'});
        },
        *reload(action, {put, select}) {
            const page = yield select(state => state.leave.page);
            yield put({type: 'fetch', payload: {page}});
        },

    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/leaveApprover' || pathname === '/leaveProposer') {
                    dispatch({type: 'fetch', payload: query});
                }
            });
        },
    },
};
