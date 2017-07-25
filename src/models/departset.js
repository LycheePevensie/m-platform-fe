import * as setService from '../services/settings';

export default {
    namespace: 'departset',
    state: {
        list: [],
        total: null,
        page: null,
        userlist: []
    },
    reducers: {
        save(state, {payload: {data: list, total, page, userlist:userlist}}) {
            return {...state, list, total, page, userlist};
        },
    },
    effects: {
        *fetchDepart({payload: {page = 1}}, {call, put}) {
            const {data, headers} = yield call(setService.fetchDepart, {page});
            const allusers = yield call(setService.fetchusers);
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
        *removeDepart({payload: id}, {call, put, select}) {
            yield call(setService.removeDepart, id);
            const page = yield select(state => state.settings.page);
            yield put({type: 'fetchDepart', payload: {page}});
        },

        *createDepart({payload: values}, {call, put}) {
            yield call(setService.createDepart, values);
            yield put({type: 'reload'});
        },
        *reload(action, {put, select}) {
            const page = yield select(state => state.settings.page);
            yield put({type: 'fetchDepart', payload: {page}});
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/setDepartment') {
                    dispatch({type: 'fetchDepart', payload: query});
                }
            });
        },
    },
};
