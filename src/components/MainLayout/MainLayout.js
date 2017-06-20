import React from 'react';
import { connect } from 'dva';
import {Layout, Menu, Icon} from 'antd';
import styles from './MainLayout.css';
import Header from './Header';
import Footer from './Footer';
import Menus from './Menus'

const {Sider, Content} = Layout;

function MainLayout({children, location, collapsed}) {
    function switchSider(){
        dispatch({
            type: 'app/switchSider'
        });
    }

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <div className={styles.logo}/>
                <Menus location={location} className={styles.content}/>
            </Sider>
            <Layout>
                <Header location={location}>
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
    );
}

function mapStateToProps(state) {
    console.log(state);
    const { collapsed } = state.users;
    return {
        collapsed,
    };
}
// export default ;
export default connect(mapStateToProps)(MainLayout)