import * as checkService from '../services/check';

export default {
    namespace: 'check',
    state: {
        list: [],
        total: null,
        page: null,
        checkstatus: false
    },
    reducers: {
        save(state, {payload: {data: list, total, page}}) {
            return {...state, list, total, page};
        },
        saveStatus(state, {payload:{checkstatus:checkstatus}}){
            return {...state, checkstatus: checkstatus}
        },
    },
    effects: {
        *fetch({payload: {page = 1}}, {call, put}) {
            const {data, headers} = yield call(checkService.fetch, {page});
            yield put({
                type: 'save',
                payload: {
                    data,
                    total: parseInt(headers['x-total-count'], 10),
                    page: parseInt(page, 10),
                },
            });
        },
        *create({payload: values}, {call, put}) {
            yield call(checkService.create, values);
            yield put({type: 'reload'});
        },
        *search({payload: values}, {call, put}) {
            yield call(checkService.search, values);
            yield put({type: 'reload'});
        },
        *reload(action, {put, select}) {
            const page = yield select(state => state.check.page);
            yield put({type: 'fetch', payload: {page}});
        },
        *uploadImg({payload: imgurl}, {put, call}){
            const data = yield call(checkService.upload, imgurl);
            const imgpath = data.data.imgurl;
            if(imgpath){
                yield put({type: 'saveStatus', payload: {checkstatus:true}})
            }
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/check') {
                    dispatch({type: 'fetch', payload: query});
                }
            });
        },
    },
};
