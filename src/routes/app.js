import React from 'react';
import {connect} from 'dva';
import {Layout, Menu, Icon} from 'antd';
import {MainLayout} from '../components'

const {Sider, Content} = Layout;
const {Header, Menus, Bread, Footer, styles} = MainLayout;

function App({children, location, dispatch, app}) {
    const {collapsed, isNavbar, user} = app

    function switchSider() {
        dispatch({
            type: 'app/switchSider'
        });
    };

    function logout() {
        dispatch({
            type: 'app/logout'
        });
    }

    return (
        <div>
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <div className={styles.logo}/>
                    <Menus location={location} className={styles.content} collapsed={collapsed}/>
                </Sider>
                <Layout>
                    <Header location={location} user={user} logout={logout}>
                        <Icon
                            className={styles.trigger}
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={switchSider}
                        />
                    </Header>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 580}}>
                        <div className={styles.content}>
                            <div className={styles.main}>
                                {children}
                            </div>
                        </div>
                    </Content>
                    <Footer/>
                </Layout>
            </Layout>
        </div>
    );
}

export default connect(({app}) => ({app}))(App)
