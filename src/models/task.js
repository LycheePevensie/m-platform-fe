import * as taskService from '../services/task';

export default {
    namespace: 'task',
    state: {
        list: [],
        total: null,
        page: null,
        operation: true,
        userlist: []
    },
    reducers: {
        save(state, {payload: {data: list, total, page, userlist:userlist}}) {
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
            if (location.pathname === '/taskAssignee') {
                yield put({type: 'showcreate'})
            }
            if (location.pathname === '/taskAssigner') {
                yield put({type: 'hidecreate'})
            }
            const {data, headers} = yield call(taskService.fetch, {page});
            const allusers = yield call(taskService.fetchusers);
            const userlist = allusers.data;
            yield put({
                type: 'save',
                payload: {
                    data,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, 10),
                    userlist: userlist,
                },
            });
        },
        *remove({payload: id}, {call, put, select}) {
            yield call(taskService.remove, id);
            const page = yield select(state => state.users.page);
            yield put({type: 'fetch', payload: {page}});
        },
        *patch({payload: {id, values}}, {call, put}) {
            yield call(taskService.patch, id, values);
            yield put({type: 'reload'});
        },
        *search({payload: values}, {call, put}) {
            yield call(taskService.search, values);
            yield put({type: 'reload'});
        },
        *create({payload: values}, {call, put}) {
            yield call(taskService.create, values);
            yield put({type: 'reload'});
        },
        *reload(action, {put, select}) {
            const page = yield select(state => state.task.page);
            yield put({type: 'fetch', payload: {page}});
        },

    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/taskAssignee' || pathname === '/taskAssigner') {
                    dispatch({type: 'fetch', payload: query});
                }
            });
        },
    },
};
