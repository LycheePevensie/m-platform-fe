import * as usersService from '../services/users';

export default {
    namespace: 'register',
    state: {
        imageUrl: '',
        imagePath: '',
        companylist: []
    },

    effects: {
        *fetch({payload: {}}, {call, put}) {
            const allcompany = yield call(usersService.fetchcompany);
            const companylist = allcompany.data;
            yield put({
                type: 'save',
                payload: {
                    companylist: companylist,
                },
            });
        },
        *create({payload: values}, {call}) {
            const data = yield call(usersService.create, values);
            console.log(data);
            if (data.data == true) {
                location.pathname = '/login';
            } else {
                throw ""
            }
        },
        *uploadImg({payload: imgurl}, {put, call}){
            yield put({type: 'changeUrl', payload: {imgurl}})
            const data = yield call(usersService.upload, imgurl);
            const imgpath = data.data.imgurl;
            yield put({type: 'savePath', payload: {imgpath}})
        },
        *removeImg({payload:imagepath}, {put, call}){
            yield put({type: 'removeUrl', payload: {imagepath}})
            yield call(usersService.removeimg, imagepath);
        },
    },
    reducers: {
        save(state, {payload: {companylist:companylist}}) {
            return {...state, companylist};
        },
        changeUrl(state, {payload:{imgurl:imgurl}}){
            return {...state, imageUrl: imgurl}
        },
        removeUrl(state){
            return {...state, imageUrl: ''}
        },
        savePath(state, {payload:{imgpath:imgpath}}){
            return {...state, imagePath: imgpath}
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname, query}) => {
                if (pathname === '/register') {
                    dispatch({type: 'fetch', payload: query});
                }
            });
        },
    },
}
