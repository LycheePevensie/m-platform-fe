import React from 'react';
import {Menu, Icon, Switch} from 'antd';
import {Link} from 'dva/router';
import styles from './MainLayout.css'

const SubMenu = Menu.SubMenu;
const siderFold = false;

function Menus({location, collapsed}) {
    return (
        <div>
            {/*<div>*/}
            {/*/!*<img alt={'logo'} src={"https://t.alipayobjects.com/images/T1QUBfXo4fXXXXXXXX.png"}/>*!/*/}
            {/*{siderFold ? '' : <span>{"m-platform"}</span>}*/}
            {/*</div>*/}
            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                defaultSelectedKeys={['1']}
            >
                <Menu.Item key="users">
                    <Link to="users"><Icon type="user" className={collapsed ? styles.iconl : styles.icons}/>
                        <span className={collapsed ? styles.navhide : styles.navshow}>用户管理</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="check">
                    <Link to="check"><Icon type="solution" className={collapsed ? styles.iconl : styles.icons}/>
                        <span className={collapsed ? styles.navhide : styles.navshow}>考勤记录</span>
                    </Link>
                </Menu.Item>
                <SubMenu key="leave" title={
                    <span><Icon type="rocket" className={collapsed ? styles.iconl : styles.icons}/>
                        <span className={collapsed ? styles.navhide : styles.navshow}>请假</span>
                    </span>}>
                    <Menu.Item key="/leaveProposer">
                        <Link to="/leaveProposer"><Icon type="bars"/>我的请假单</Link>
                    </Menu.Item>
                    <Menu.Item key="/leaveApprover">
                        <Link to="/leaveApprover"><Icon type="bars"/>待我审批的请假单</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="task" title={
                    <span><Icon type="share-alt" className={collapsed ? styles.iconl : styles.icons}/>
                        <span className={collapsed ? styles.navhide : styles.navshow}>任务</span>
                    </span>}>
                    <Menu.Item key="/taskAssignee">
                        <Link to="/taskAssignee"><Icon type="bars"/>收到的任务</Link>
                    </Menu.Item>
                    <Menu.Item key="/taskAssigner">
                        <Link to="/taskAssigner"><Icon type="bars"/>发布的任务</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="report" title={
                    <span><Icon type="book" className={collapsed ? styles.iconl : styles.icons}/>
                        <span className={collapsed ? styles.navhide : styles.navshow}>工作汇报</span>
                    </span>}>
                    <Menu.Item key="/reporter">
                        <Link to="/reporter"><Icon type="bars"/>我的工作汇报</Link>
                    </Menu.Item>
                    <Menu.Item key="/manager">
                        <Link to="/manager"><Icon type="bars"/>我可以查看的汇报</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="expense" title={
                    <span><Icon type="bank" className={collapsed ? styles.iconl : styles.icons}/>
                        <span className={collapsed ? styles.navhide : styles.navshow}>报销</span>
                    </span>}>
                    <Menu.Item key="/expenseApprover">
                        <Link to="/expenseApprover"><Icon type="bars"/>我的报销单</Link>
                    </Menu.Item>
                    <Menu.Item key="/expenseManager">
                        <Link to="/expenseManager"><Icon type="bars"/>需我审批的报销单</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="settings" title={
                    <span><Icon type="setting" className={collapsed ? styles.iconl : styles.icons}/>
                        <span className={collapsed ? styles.navhide : styles.navshow}>设置</span>
                    </span>}>
                    <Menu.Item key="/setDepartment">
                        <Link to="/setDepartment"><Icon type="team"/>部门设置</Link>
                    </Menu.Item>
                    <Menu.Item key="/setPerson">
                        <Link to="/setPerson"><Icon type="heart-o"/>个人设置</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
}

export default Menus;
