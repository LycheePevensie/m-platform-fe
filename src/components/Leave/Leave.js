import React from 'react';
import {connect} from 'dva';
import {Table, Pagination, Popconfirm, Button, Icon, Tag} from 'antd';
import {routerRedux} from 'dva/router';
import styles from './Leave.css';
import {PAGE_SIZE} from '../../constants';
import LeaveModal from './LeaveModal';
import Search from '../Search';

function Leave({dispatch, list: dataSource, loading, total, page: current, operation, userlist:userlist}) {
    function confirmHandler(id) {
        dispatch({
            type: 'leave/confirm',
            payload: id,
        });
    }

    function rejectHandler(id) {
        dispatch({
            type: 'leave/reject',
            payload: id,
        });
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/leave',
            query: {page},
        }));
    }

    function searchHandler(values) {
        dispatch({
            type: 'leave/search',
            payload: values,
        });
    }

    function createHandler(values) {
        dispatch({
            type: 'leave/create',
            payload: values,
        });
    }

    const columns = [
        {
            title: '申请人',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '审批人',
            dataIndex: 'managerName',
            key: 'managerName',
        },
        {
            title: '请假时间',
            dataIndex: 'leaveTime',
            key: 'leaveTime',
            width: 150
        },
        {
            title: '请假类型',
            dataIndex: 'leaveType',
            key: 'leaveType',
        },
        {
            title: '请假事由',
            dataIndex: 'leaveReason',
            key: 'leavereason',
        },
        {
            title: '审批状态',
            dataIndex: 'leaveStatus',
            key: 'leaveStatus',
            render: text => (<span><span className={text == 0 ? styles.show : styles.hide}>未审批</span><span className={text == 1 ? styles.confirm : styles.hide}>已通过</span><span className={text == 2 ? styles.reject : styles.hide}>已驳回</span></span>),
        },
        {
            title: '备注',
            dataIndex: 'leaveTips',
            key: 'leaveTips',
        },
    ];

    if (!operation) {
        columns.push(
            {
                title: '操作',
                key: 'operation',
                render: (text, record) => (
                    <span className={styles.operation}>
                    <Popconfirm title="确认批准此次请假？" onConfirm={confirmHandler.bind(null, record.leaveId)}>
                        <Tag color="cyan">批准</Tag>
                    </Popconfirm>
                    <Popconfirm title="确认否定此次请假？" onConfirm={rejectHandler.bind(null, record.leaveId)}>
                        <Tag color="orange">驳回</Tag>
                    </Popconfirm>
                    </span>
                ),
            },
        )
    }

    return (
        <div className={styles.normal}>
            <div>
                <div className={styles.contentheader}>
                    <div className={operation ? styles.create : styles.createhide}>
                        <LeaveModal record={{}} onOk={createHandler} userlist={userlist}>
                            <Button type="primary"><Icon type="calendar"/>请假模板</Button>
                        </LeaveModal>
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
    const {list, total, page, userlist} = state.leave;
    return {
        loading: state.loading.models.leave,
        list,
        total,
        page,
        userlist,
    };
}

export default connect(mapStateToProps)(Leave);
