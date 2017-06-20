import * as reportService from '../services/report';

export default {
    namespace: 'report',
    state: {
        list: [],
        total: null,
        page: null,
        operation: true,
        userlist: [],
        imagePath: '',
        previewUrl: '',
        preview: false,
    },
    effects: {
        *fetch({payload: {page = 1}}, {call, put}) {
            if (location.pathname === '/reporter') {
                yield put({type: 'showcreate'})
            }
            if (location.pathname === '/manager') {
                yield put({type: 'hidecreate'})
            }
            const {data, headers} = yield call(reportService.fetch, {page});
            const allusers = yield call(reportService.fetchusers);
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
        *uploadImg({payload: imgurl}, {put, call}){
            const data = yield call(reportService.upload, imgurl);
            const imgpath = data.data.imgurl;
            yield put({type: 'savePath', payload: {imgpath}})
        },
        *removeImg({payload:imagepath}, {put, call}){
            yield call(reportService.removeimg, imagepath);
        },
        *remove({payload: id}, {call, put, select}) {
            yield call(reportService.remove, id);
            const page = yield select(state => state.users.page);
            yield put({type: 'fetch', payload: {page}});
        },
        *patch({payload: {id, values}}, {call, put}) {
            yield call(reportService.patch, id, values);
            yield put({type: 'reload'});
        },
        *create({payload: values}, {call, put}) {
            yield call(reportService.create, values);
            yield put({type: 'reload'});
        },
        *search({payload: values}, {call, put}) {
            yield call(reportService.search, values);
            yield put({type: 'reload'});
        },
        *reload(action, {put, select}) {
            const page = yield select(state => state.report.page);
            yield put({type: 'fetch', payload: {page}});
        },

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
        previewImg(state, {payload: {imgurl:imgurl}}){
            return {...state, preview: true}
        },
        hideImg(state){
            return {...state, preview: false}
        },
        // changeUrl(state, {payload:{imgurl:imgurl}}){
        //     return {...state, imageUrl: imgurl}
        // },
        // removeUrl(state){
        //     return {...state, imageUrl: ''}
        // },
        savePath(state, {payload:{imgpath:imgpath}}){
            return {...state, imagePath: imgpath}
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/reporter' || pathname === '/manager') {
                    dispatch({type: 'fetch', payload: query});
                }
            });
        },
    },
};
