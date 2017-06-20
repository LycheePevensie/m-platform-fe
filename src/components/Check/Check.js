import React from 'react';
import {connect} from 'dva';
import {Table, Pagination, Button, Icon} from 'antd';
import {routerRedux} from 'dva/router';
import styles from './Check.css';
import {PAGE_SIZE} from '../../constants';
import CheckModal from './CheckModal';
import Search from '../Search';

function Check({dispatch, list: dataSource, loading, total, page: current}) {
    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/check',
            query: {page},
        }));
    }

    function createHandler(values) {
        dispatch({
            type: 'check/create',
            payload: values,
        });
    }

    function searchHandler(values) {
        dispatch({
            type: 'check/patch',
            payload: values,
        });
    }

    function uploadImg(imgurl) {
        dispatch({
            type: 'check/uploadImg',
            payload: imgurl,
        });
    }

    const columns = [
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => a.date - b.date,
        },
        {
            title: '星期',
            dataIndex: 'week',
            key: 'week',
        },
        {
            title: '上班',
            children: [
                {
                    title: '准时',
                    dataIndex: 'ontimea',
                    key: 'ontimea',
                },
                {
                    title: '迟到',
                    dataIndex: 'delaya',
                    key: 'delaya',
                },
                {
                    title: '未签',
                    dataIndex: 'nosigna',
                    key: 'nosigna',
                },
            ]
        },
        {
            title: '下班',
            children: [
                {
                    title: '准时',
                    dataIndex: 'ontimep',
                    key: 'ontimep',
                },
                {
                    title: '早退',
                    dataIndex: 'delayp',
                    key: 'delayp',
                },
                {
                    title: '未签',
                    dataIndex: 'nosignp',
                    key: 'nosignp',
                },
            ]
        },
        {
            title: '加班',
            dataIndex: 'extra',
            key: 'extra',
        },
        {
            title: '外勤',
            dataIndex: 'out',
            key: 'out',
        },
    ];

    return (
        <div className={styles.normal}>
            <div>
                <div className={styles.create}>
                    <CheckModal record={{}} onOk={createHandler} onUp={uploadImg}>
                        <Button type="primary"><Icon type="check-square-o"/>签到</Button>
                    </CheckModal>
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
    const {list, total, page} = state.check;
    return {
        loading: state.loading.models.check,
        list,
        total,
        page,
    };
}

export default connect(mapStateToProps)(Check);