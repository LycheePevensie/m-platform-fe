import * as usersService from '../services/users';

export default {
    namespace: 'users',
    state: {
        list: [],
        total: null,
        page: null,
        departlist: [],
        levellist: []
    },
    reducers: {
        save(state, {payload: {data: list, total, page, departlist:departlist, levellist:levellist}}) {
            return {...state, list, total, page, departlist, levellist};
        },
    },
    effects: {
        *fetch({payload: {page = 1}}, {call, put}) {
            const {data, headers} = yield call(usersService.fetch, {page});
            const alldepart = yield call(usersService.fetchdepart);
            const departlist = alldepart.data;
            const alllevel = yield call(usersService.fetchlevel);
            const levellist = alllevel.data;
            yield put({
                type: 'save',
                payload: {
                    data,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, 10),
                    departlist: departlist,
                    levellist: levellist
                },
            });
        },
        *search({payload: {values, page = 1}}, {call, put}) {
            const {data, headers} = yield call(usersService.search, values, {page});
            yield put({
                type: 'save',
                payload: {
                    data,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *remove({payload: id}, {call, put, select}) {
            yield call(usersService.remove, id);
            const page = yield select(state => state.users.page);
            yield put({type: 'fetch', payload: {page}});
        },

        *create({payload: values}, {call, put}) {
            yield call(usersService.create, values);
            yield put({type: 'reload'});
        },
        *reload(action, {put, select}) {
            const page = yield select(state => state.users.page);
            yield put({type: 'fetch', payload: {page}});
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/users') {
                    dispatch({type: 'fetch', payload: query});
                }
            });
        },
    },
};
