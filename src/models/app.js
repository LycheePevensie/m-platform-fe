export default {
    namespace: 'app',
    state: {
        collapsed: false,
        isNavbar: document.body.clientWidth < 769,

    },
    subscriptions: {
        setup({ dispatch }){
            window.onresize = () => {
                dispatch({ type: 'changeNavbar' })
            }
        }
    },
    effects: {
        *switchSider ({
            payload,
        }, {put}) {
            yield put({
                type: 'handleSwitchSider',
            })
        },
        *changeNavbar ({
            payload,
        }, { put }) {
            if (document.body.clientWidth < 769) {
                yield put({ type: 'showNavbar' })
            } else {
                yield put({ type: 'hideNavbar' })
            }
        },
        // *changeNavbar ({
        //     payload,
        // }, { put }) {
        //     if (document.body.clientWidth < 769) {
        //         yield put({ type: 'showNavbar' })
        //     } else {
        //         yield put({ type: 'hideNavbar' })
        //     }
        // }
    },
    reducers: {
        handleSwitchSider (state) {
            // localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
            return {
                ...state,
                collapsed: !state.collapsed,
            }
        },
        showNavbar (state) {
            return {
                ...state,
                isNavbar: true,
            }
        },
        hideNavbar (state) {
            return {
                ...state,
                isNavbar: false,
            }
        }
    }
}