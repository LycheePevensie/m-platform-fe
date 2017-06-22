import React from 'react';
import {connect} from 'dva';
import {Table, Pagination, Popconfirm, Button, Icon, Tag} from 'antd';
import {routerRedux} from 'dva/router';
import moment from 'moment';
import styles from './Settings.css';
import {PAGE_SIZE} from '../../constants';
import DepartModal from './DepartModal';

function Department({dispatch, list: dataSource, loading, total, page: current, userlist:userlist}) {
    function deleteHandler(id) {
        dispatch({
            type: 'settings/removeDepart',
            payload: id,
        });
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/settings',
            query: {page},
        }));
    }

    function createHandler(values) {
        dispatch({
            type: 'settings/createDepart',
            payload: values,
        });
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'departId',
            key: 'departId',
        },
        {
            title: '部门',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: '负责人',
            dataIndex: 'departLeaderName',
            key: 'departLeaderName',
            render: text => <a href="">{text}</a>,
        },
        {
            title: '签到',
            dataIndex: 'departCheck',
            key: 'departCheck',
        },
        {
            title: '签退',
            dataIndex: 'departLeave',
            key: 'departLeave',
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span className={styles.operation}>
                  <DepartModal record={record} onOk={createHandler} userlist={userlist} edit={"edit"}>
                      <Tag color="blue">编辑</Tag>
                  </DepartModal>
                  <Popconfirm title="确认删除该部门？" onConfirm={deleteHandler.bind(null, record.departId)}>
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
                    <DepartModal record={{}} onOk={createHandler} userlist={userlist} edit={"add"}>
                        <Button type="primary"><Icon type="usergroup-add"/>添加部门</Button>
                    </DepartModal>
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
    const {list, total, page, userlist} = state.settings;
    return {
        loading: state.loading.models.settings,
        list,
        total,
        page,
        userlist
    };
}

export default connect(mapStateToProps)(Department);
