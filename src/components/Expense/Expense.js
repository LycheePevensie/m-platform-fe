import React from 'react';
import {connect} from 'dva';
import {Table, Pagination, Popconfirm, Button, Icon, Tag} from 'antd';
import {routerRedux} from 'dva/router';
import styles from './Expense.css';
import {PAGE_SIZE} from '../../constants';
import ExpenseModal from './ExpenseModal';
import Search from '../Search';

function Expense({dispatch, list: dataSource, loading, total, page: current, operation, userlist:userlist}) {
    function confirmHandler(id) {
        dispatch({
            type: 'expense/confirm',
            payload: id,
        });
    }

    function rejectHandler(id) {
        dispatch({
            type: 'expense/reject',
            payload: id,
        });
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/expense',
            query: {page},
        }));
    }

    function searchHandler(values) {
        dispatch({
            type: 'expense/search',
            payload: values,
        });
    }

    function createHandler(values) {
        dispatch({
            type: 'expense/create',
            payload: values,
        });
    }

    const columns = [
        {
            title: '报销单名称',
            dataIndex: 'expenseName',
            key: 'expensenName',
            render: text => <a href="">{text}</a>,
        },
        {
            title: '报销金额',
            dataIndex: 'expenseValue',
            key: 'expenseValue',
        },
        {
            title: '提交人',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '审批人',
            dataIndex: 'managerName',
            key: 'managerName',
        },
        {
            title: '提交时间',
            dataIndex: 'expenseTimeStr',
            key: 'expenseTimeStr',
        },
        {
            title: '审批状态',
            dataIndex: 'expenseStatus',
            key: 'expenseStatus',
            render: text => (<span><span className={text == 0 ? styles.show : styles.hide}>未审批</span><span className={text == 1 ? styles.confirm : styles.hide}>已通过</span><span className={text == 2 ? styles.reject : styles.hide}>已驳回</span></span>),
        },
        {
            title: '备注',
            dataIndex: 'expenseTips',
            key: 'expenseTips',
        },
    ];

    if (!operation) {
        columns.push(
            {
                title: '操作',
                key: 'operation',
                render: (text, record) => (
                    <span className={styles.operation}>
                    <Popconfirm title="确认批准此报销单？" onConfirm={confirmHandler.bind(null, record.expenseId)}>
                        <Tag color="cyan">批准</Tag>
                    </Popconfirm>
                    <Popconfirm title="确认否定此报销单？" onConfirm={rejectHandler.bind(null, record.expenseId)}>
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
                        <ExpenseModal record={{}} onOk={createHandler} userlist={userlist}>
                            <Button type="primary"><Icon type="red-envelope" />报销单</Button>
                        </ExpenseModal>
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
    const {list, total, page, userlist} = state.expense;
    return {
        loading: state.loading.models.expense,
        list,
        total,
        page,
        userlist,
    };
}

export default connect(mapStateToProps)(Expense);
