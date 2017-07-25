import React from 'react';
import {connect} from 'dva';
import {Table, Pagination, Button, Icon, Menu} from 'antd';
import {routerRedux} from 'dva/router';
import moment from 'moment';
import styles from './Check.css';
import {PAGE_SIZE} from '../../constants';
import CheckModal from './CheckModal';
import Search from '../Search';

function Check({dispatch, list: dataSource, loading, total, page: current, recognise}) {
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
            type: 'check/search',
            payload: values,
        });
    }

    function uploadImg(imgurl) {
        dispatch({
            type: 'check/uploadImg',
            payload: imgurl,
        });

    }
    function checkIn(record,status) {
        if(record.checkIn && record.checkIn.checkStatus == status){
            return "✔️";
        }else if(!record.checkIn && status == 3){
            return "✔️";
        }else {
            return " ";
        }
    }
    function checkOut(record,status) {
        if(record.checkOut && record.checkOut.checkStatus == status){
            return "✔️";
        }else if(!record.checkOut && status == 3){
            return "✔️";
        }else {
            return " ";
        }
    }

    const columns = [
        {
            title: '日期',
            dataIndex: 'checkDate',
            key: 'checkDate',
            sorter: (a, b) => moment(a.checkDate) - moment(b.checkDate),
        },
        {
            title: '星期',
            dataIndex: 'checkWeek',
            key: 'checkWeek',
        },
        {
            title: '上班',
            children: [
                {
                    title: '准时',
                    dataIndex: 'ontimea',
                    key: 'ontimea',
                    render: (text, record) => (<div>{checkIn(record,0)}</div>),
                },
                {
                    title: '迟到',
                    dataIndex: 'delaya',
                    key: 'delaya',
                    render: (text, record) => (<div>{checkIn(record,1)}</div>),
                },
                {
                    title: '未签',
                    dataIndex: 'nosigna',
                    key: 'nosigna',
                    render: (text, record) => (<div>{checkIn(record,3)}</div>),
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
                    render: (text, record) => (<div>{checkOut(record,0)}</div>),
                },
                {
                    title: '早退',
                    dataIndex: 'delayp',
                    key: 'delayp',
                    render: (text, record) => (<div>{checkOut(record,2)}</div>),
                },
                {
                    title: '未签',
                    dataIndex: 'nosignp',
                    key: 'nosignp',
                    render: (text, record) => (<div>{checkOut(record,3)}</div>),
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
                <div className={styles.contentheader}>
                    <div className={styles.create}>
                        <Button type="primary"><Icon type="check-square-o"/>打卡</Button>
                        <Menu className={styles.createmenu}>
                            <Menu.Item className={styles.createway}>
                                <CheckModal record={{}} onOk={createHandler} onUp={uploadImg} checkWay={"checkin"} recognise={recognise}>
                                    <span className={styles.createbtn}>签到</span>
                                </CheckModal>
                            </Menu.Item>
                            <Menu.Item className={styles.createway}>
                                <CheckModal record={{}} onOk={createHandler} onUp={uploadImg} checkWay={"checkout"} recognise={recognise}>
                                    <span className={styles.createbtn}>签退</span>
                                </CheckModal>
                            </Menu.Item>
                        </Menu>
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
                    bordered
                    footer={() => 'Footer'}
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
    const {list, total, page, recognise} = state.check;
    return {
        loading: state.loading.models.check,
        list,
        total,
        page,
        recognise
    };
}

export default connect(mapStateToProps)(Check);
