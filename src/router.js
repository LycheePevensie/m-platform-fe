import React from 'react';
import {Router} from 'dva/router';
import App from './routes/app';
// import Leave from './routes/Leave'

// import Login from "./routes/Login.js";

const cached = {};
const registerModel = (app, model) => {
    if (!cached[model.namespace]) {
        app.model(model)
        cached[model.namespace] = 1
    }
}

const RouterConfig = function ({history, app}) {
    const routes = [
        {
            path: '/',
            component: App,
            getIndexRoute (nextState, cb) {
                require.ensure([], require => {
                    registerModel(app, require('./models/users'))
                    cb(null, { component: require('./routes/Users') })
                }, 'users')
            },
            childRoutes: [
                {
                    path: 'users',
                    name: 'users',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/users'));
                            cb(null, require('./routes/Users'));
                        },'users');
                    },
                },
                {
                    path: 'check',
                    name: 'check',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/check'));
                            cb(null, require('./routes/Check'));
                        },'check');
                    },
                },
                {
                    path:'leaveProposer',
                    name:'leave-proposer',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/leave'));
                            cb(null, require('./routes/Leave'));
                        },'proposer');
                    },
                },
                {
                    path: 'leaveApprover',
                    name: 'leave-approver',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/leave'));
                            cb(null, require('./routes/Leave'));
                        },'approver');
                    },
                },
                {
                    path:'taskAssignee',
                    name:'task-assignee',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/task'));
                            cb(null, require('./routes/Task'));
                        },'assignee');
                    },
                },
                {
                    path: 'taskAssigner',
                    name: 'task-assigner',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/task'));
                            cb(null, require('./routes/Task'));
                        },'assigner');
                    },
                },
                {
                    path:'expenseApprover',
                    name:'expense-approver',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/expense'));
                            cb(null, require('./routes/Expense'));
                        },'expense-approver');
                    },
                },
                {
                    path: 'expenseManager',
                    name: 'expense-manager',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/expense'));
                            cb(null, require('./routes/Expense'));
                        },'expense-manager');
                    },
                },
                {
                    path:'reporter',
                    name:'reporter',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/report'));
                            cb(null, require('./routes/Reporter'));
                        },'reporter');
                    },
                },
                {
                    path: 'manager',
                    name: 'manager',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/report'));
                            cb(null, require('./routes/Reporter'));
                        },'manager');
                    },
                },
                {
                    path: 'setDepartment',
                    name: 'setDepartment',
                    getComponent(nextState, cb) {
                        require.ensure([], (require) => {
                            registerModel(app, require('./models/settings'));
                            cb(null, require('./routes/Settings'));
                        },'setDepartment');
                    },
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/login'));
                    cb(null, require('./routes/Login'));
                },'login');
            },
        },
        {
            path: '/register',
            name: 'register',
            getComponent(nextState, cb) {
                require.ensure([], (require) => {
                    registerModel(app, require('./models/register'));
                    cb(null, require('./routes/Register'));
                },'register');
            },
        },
    ];

    return <Router history={history} routes={routes}/>;
}

export default RouterConfig;
