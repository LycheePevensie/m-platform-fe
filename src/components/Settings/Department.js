import React from 'react';
import {connect} from 'dva';
import {Table, Pagination, Popconfirm, Button, Icon, Tag} from 'antd';
import {routerRedux} from 'dva/router';
import styles from './Settings.css';
import {PAGE_SIZE} from '../../constants';
import DepartModal from './DepartModal';

function Department({dispatch, list: dataSource, loading, total, page: current, userlist:userlist}) {
    function deleteHandler(id) {
        dispatch({
            type: 'settings/departRemove',
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
            type: 'settings/departCreate',
            payload: values,
        });
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'departmentId',
            key: 'departmentId',
        },
        {
            title: '部门',
            dataIndex: 'department',
            key: 'department',
        },
        {
            title: '负责人',
            dataIndex: 'departLeader',
            key: 'departLeader',
            render: text => <a href="">{text}</a>,
        },
        {
            title: '考勤时间',
            children: [
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
            ]
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span className={styles.operation}>
          <DepartModal record={record} onOk={createHandler} userlist={userlist}>
              <Tag color="blue">编辑</Tag>
          </DepartModal>
          <Popconfirm title="确认删除该部门？" onConfirm={deleteHandler.bind(null, record.userId)}>
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
                    <DepartModal record={{}} onOk={createHandler} userlist={userlist}>
                        <Button type="primary"><Icon type="usergroup-add" />添加部门</Button>
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
