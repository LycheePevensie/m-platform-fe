import React from 'react';
import {connect} from 'dva';
import {Table, Pagination, Popconfirm, Button, Icon, Tag} from 'antd';
import {routerRedux} from 'dva/router';
import styles from './Users.css';
import {PAGE_SIZE} from '../../constants';
import UserModal from './UserModal';
import UserSearch from './UserSearch';

function Users({dispatch, list: dataSource, loading, total, page: current}) {
    function deleteHandler(id) {
        dispatch({
            type: 'users/remove',
            payload: id,
        });
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/users',
            query: {page},
        }));
    }

    function searchHandler(values) {
        dispatch({
            type: 'users/patch',
            payload: {values},
        });
    }

    function createHandler(values) {
        dispatch({
            type: 'users/create',
            payload: values,
        });
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
            render: text => <a href="">{text}</a>,
        },
        {
            title: '姓名',
            dataIndex: 'trueName',
            key: 'trueName',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render: text => (<span><span className={text == 0 ? styles.show : styles.hide}>男</span><span className={text == 1 ? styles.show : styles.hide}>女</span></span>),
        },
        {
            title: '手机',
            dataIndex: 'userTel',
            key: 'userTel',
        },
        {
            title: '部门',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: '职位',
            dataIndex: 'userJob',
            key: 'userJob',
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span className={styles.operation}>
          <UserModal record={record} onOk={createHandler}>
              <Tag color="blue">编辑</Tag>
          </UserModal>
          <Popconfirm title="确认删除该用户？" onConfirm={deleteHandler.bind(null, record.userId)}>
              <Tag color="red">删除</Tag>
          </Popconfirm>
        </span>
            ),
        },
    ];

    return (
        <div className={styles.normal}>
            <div>
                <div className={styles.create}>
                    <UserModal record={{}} onOk={createHandler}>
                        <Button type="primary"><Icon type="user-add"/>添加成员</Button>
                    </UserModal>
                    <div className={styles.userfilter}>
                        <UserSearch onSearch={searchHandler}></UserSearch>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    rowKey={record => record.id}
                    pagination={false}
                />
                <Pagination
                    className="ant-table-pagination"
                    total={total}
                    current={current}
                    pageSize={PAGE_SIZE}
                    onChange={pageChangeHandler}
                />
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const {list, total, page} = state.users;
    return {
        loading: state.loading.models.users,
        list,
        total,
        page,
    };
}

export default connect(mapStateToProps)(Users);
