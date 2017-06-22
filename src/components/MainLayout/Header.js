import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'dva/router';
import styles from './MainLayout.css';

const SubMenu = Menu.SubMenu;

function Header({children, location, user, logout}) {
    return (
        <div className={styles.header}>
            <div className={styles.foldIcon}>
                {children}
            </div>
            <div className={styles.rightWarpper}>
                <div className={styles.button}>
                    <Icon type="mail"/>
                </div>
                <div className={styles.logout}>
                    <Menu mode="horizontal">
                        <SubMenu title={< span > <Icon type="user"/>{user.trueName}</span>}>
                            <Menu.Item key="logout">
                                <a onClick={logout}>注销</a>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default Header;
