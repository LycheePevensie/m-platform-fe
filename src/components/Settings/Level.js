import React from 'react';
import {connect} from 'dva';
import {Table, Pagination, Popconfirm, Button, Icon, Tag} from 'antd';
import {routerRedux} from 'dva/router';
import styles from './Settings.css';
import {PAGE_SIZE} from '../../constants';
import LevelModal from './LevelModal';

function Level({dispatch, list: dataSource, loading, total, page: current}) {
    function deleteHandler(id) {
        dispatch({
            type: 'levelset/removeLevel',
            payload: id,
        });
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/levelset',
            query: {page},
        }));
    }

    function createHandler(values) {
        dispatch({
            type: 'levelset/createLevel',
            payload: values,
        });
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'levelId',
            key: 'levelId',
        },
        {
            title: '权限级别',
            dataIndex: 'levelNum',
            key: 'levelNum',
        },
        {
            title: '角色名称',
            dataIndex: 'levelName',
            key: 'levelName',
        },
        {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span className={styles.operation}>
                  <LevelModal record={record} onOk={createHandler} edit={"edit"}>
                      <Tag color="blue">编辑</Tag>
                  </LevelModal>
                  <Popconfirm title="确认删除该角色？" onConfirm={deleteHandler.bind(null, record.levelId)}>
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
                    <LevelModal record={{}} onOk={createHandler} edit={"add"}>
                        <Button type="primary"><Icon type="tag-o" />添加角色</Button>
                    </LevelModal>
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
    const {list, total, page} = state.levelset;
    return {
        loading: state.loading.models.levelset,
        list,
        total,
        page
    };
}

export default connect(mapStateToProps)(Level);
