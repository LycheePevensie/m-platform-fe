import React from 'react';
import {connect} from 'dva';
import {Table, Pagination, Popconfirm, Button, Icon, Tag} from 'antd';
import {routerRedux} from 'dva/router';
import styles from './Task.css';
import {PAGE_SIZE} from '../../constants';
import TaskModal from './TaskModal';
import Search from '../Search';

function Task({dispatch, list: dataSource, loading, total, page: current, operation, userlist:userlist}) {
    function confirmHandler(id) {
        dispatch({
            type: 'task/remove',
            payload: id,
        });
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/task',
            query: {page},
        }));
    }

    function updateHandler(id, values) {
        dispatch({
            type: 'task/patch',
            payload: {id, values},
        });
    }

    function createHandler(values) {
        dispatch({
            type: 'task/create',
            payload: values,
        });
    }

    function searchHandler(values) {
        dispatch({
            type: 'task/search',
            payload: values,
        });
    }

    const columns = [
        {
            title: '任务名称',
            dataIndex: 'taskName',
            key: 'taskName',
        },
        {
            title: '创建人',
            dataIndex: 'managerName',
            key: 'managerName',
        },
        {
            title: '任务成员',
            dataIndex: 'taskMember',
            key: 'taskMember',
        },
        {
            title: '创建时间',
            dataIndex: 'taskStart',
            key: 'taskStart',
            render: text => <span>{text.substring(0, text.length - 5)}</span>
        },
        {
            title: '截止日期',
            dataIndex: 'taskDead',
            key: 'taskDead',
            render: text => <span>{text.substring(0, text.length - 5)}</span>
        },
        {
            title: '任务内容',
            dataIndex: 'taskInfo',
            key: 'taskInfo',
        },
        {
            title: '任务状态',
            dataIndex: 'taskStatus',
            key: 'taskStatus',
        },
        {
            title: '备注',
            dataIndex: 'taskTips',
            key: 'taskTips',
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span className={styles.operation}>
                    <TaskModal record={record} onOk={updateHandler.bind(null, record.id)} userlist={userlist} operation={operation}>
                        <Tag color="pink">更新</Tag>
                    </TaskModal>
                    <div className={!operation ? styles.create : styles.hide}>
                        <Popconfirm title="确认已完成该任务？" onConfirm={confirmHandler.bind(null, record.id)}>
                            <Tag color="cyan">完成</Tag>
                        </Popconfirm>
                    </div>
                </span>
            ),
        },
    ];

    return (
        <div className={styles.normal}>
            <div>
                <div className={styles.contentheader}>
                    <div className={!operation ? styles.create : styles.hide}>
                        <TaskModal record={{}} onOk={createHandler} userlist={userlist}>
                            <Button type="primary"><Icon type="api"/>新建任务</Button>
                        </TaskModal>
                    </div>
                    <div className={styles.timefilter}>
                        <Search onSearch={searchHandler}></Search>
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
    const {list, total, page, userlist} = state.task;
    return {
        loading: state.loading.models.task,
        list,
        total,
        page,
        userlist,
    };
}

export default connect(mapStateToProps)(Task);
