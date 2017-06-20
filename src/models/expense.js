import * as expenseService from '../services/expense';

export default {
    namespace: 'expense',
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
            if (location.pathname === '/expenseApprover') {
                yield put({type: 'showcreate'})
            }
            if (location.pathname === '/expenseManager') {
                yield put({type: 'hidecreate'})
            }
            const {data, headers} = yield call(expenseService.fetch, {page});
            const allusers = yield call(expenseService.fetchusers);
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
        *confirm({payload: id}, {call, put, select}) {
            yield call(expenseService.confirm, id);
            const page = yield select(state => state.users.page);
            yield put({type: 'fetch', payload: {page}});
        },
        *reject({payload: id}, {call, put, select}) {
            yield call(expenseService.reject, id);
            const page = yield select(state => state.users.page);
            yield put({type: 'fetch', payload: {page}});
        },
        *search({payload: values}, {call, put}) {
            yield call(expenseService.search, values);
            yield put({type: 'reload'});
        },
        *create({payload: values}, {call, put}) {
            yield call(expenseService.create, values);
            yield put({type: 'reload'});
        },
        *reload(action, {put, select}) {
            const page = yield select(state => state.expense.page);
            yield put({type: 'fetch', payload: {page}});
        },

    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/expenseManager' || pathname === '/expenseApprover') {
                    dispatch({type: 'fetch', payload: query});
                }
            });
        },
    },
};
