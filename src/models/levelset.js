import * as setService from '../services/settings';

export default {
    namespace: 'levelset',
    state: {
        list: [],
        total: null,
        page: null,
    },
    reducers: {
        save(state, {payload: {data: list, total, page}}) {
            return {...state, list, total, page};
        },
    },
    effects: {
        *fetchLevel({payload: {page = 1}}, {call, put}) {
            const {data, headers} = yield call(setService.fetchLevel, {page});
            yield put({
                type: 'save',
                payload: {
                    data,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *removeLevel({payload: id}, {call, put, select}) {
            yield call(setService.removeLevel, id);
            const page = yield select(state => state.levelset.page);
            yield put({type: 'fetchLevel', payload: {page}});
        },

        *createLevel({payload: values}, {call, put}) {
            yield call(setService.createLevel, values);
            yield put({type: 'reload'});
        },
        *reload(action, {put, select}) {
            const page = yield select(state => state.levelset.page);
            yield put({type: 'fetchLevel', payload: {page}});
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/setLevel') {
                    dispatch({type: 'fetchLevel', payload: query});
                }
            });
        },
    },
};
