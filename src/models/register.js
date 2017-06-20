import * as usersService from '../services/users';

export default {
    namespace: 'register',
    state: {
        imageUrl: '',
        imagePath: '',
    },

    effects: {
        *create({payload: values}, {call}) {
            const data = yield call(usersService.create, values);
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
        *removeImg({payload:imagepath}, {put,call}){
            yield put({type: 'removeUrl', payload: {imagepath}})
            yield call(usersService.removeimg, imagepath);
        },
    },
    reducers: {
        changeUrl(state, {payload:{imgurl:imgurl}}){
            return {...state, imageUrl: imgurl}
        },
        removeUrl(state){
            return {...state, imageUrl: ''}
        },
        savePath(state, {payload:{imgpath:imgpath}}){
            return {...state, imagePath: imgpath}
        },
    }
}
