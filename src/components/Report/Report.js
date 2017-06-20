import React from 'react';
import {connect} from 'dva';
import {Table, Pagination, Button, Icon, DatePicker, Tag, Menu, Modal} from 'antd';
import {routerRedux} from 'dva/router';
import styles from './Report.css';
import {PAGE_SIZE} from '../../constants';
import iconpng from '../../assets/icon.png'
import ReportModal from './ReportModal';
import Search from '../Search';
import ReportImg from './ReportImg'

function Report({dispatch, list: dataSource, loading, total, page: current, operation, imagePath:imagePath, userlist:userlist, preview:preview, previewUrl:previewUrl}) {
    function confirmHandler(id) {
        dispatch({
            type: 'report/remove',
            payload: id,
        });
    }

    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: operation ? '/reporter' : '/manager',
            query: {page},
        }));
    }

    function editHandler(id, values) {
        dispatch({
            type: 'report/patch',
            payload: {id, values},
        });
    }

    function searchHandler(values) {
        dispatch({
            type: 'report/search',
            payload: values,
        });
    }

    function createHandler(values) {
        dispatch({
            type: 'report/create',
            payload: values,
        });
    }

    function upSuccess(imgurl) {
        dispatch({
            type: 'report/uploadImg',
            payload: imgurl,
        });
    }

    function handleRemove(imagePath) {
        dispatch({
            type: 'report/removeImg',
            payload: imagePath,
        });
    };

    function cheader(record) {
        if (record.reportDate) {
            return "日报：" + record.reportDate
        }
        if (record.reportWeek) {
            return "周报：" + record.reportWeek
        }
        if (record.reportMonth) {
            return "月报：" + record.reportMonth
        }
    }

    function imgPreview(imgurl) {
        console.log('test')
    }

    function imgHide() {
        dispatch({
            type: 'report/hideImg'
        });
    }

    const columns = [
        {
            title: '汇报人',
            dataIndex: 'reporter',
            key: 'reporter',
            width: 48,
            className: styles.avatarcolumn,
            render: text => <span style={{backgroundImage: `url(${text})`}} className={styles.avatar}/>,
        },
        {
            title: '汇报内容',
            dataIndex: 'reportInfo',
            key: 'reportInfo',
            render: (text, record) => (
                <div>
                    <p className={styles.cheader}>{cheader(record)}</p>
                    <h5 className={styles.name}>{record.reporterName}</h5>
                    <p className={styles.content}>{record.reportInfo}</p>
                    <div className={record.reportImage ? styles.clearfix : styles.hide}>
                        <div className={styles.imagewrapper}>
                            <div className={styles.imagelayer}>
                                <img className={styles.image} src={"api" + record.reportImage}/>
                            </div>
                            <ReportImg previewImg={"api" + record.reportImage}><span className={styles.imgoperate}><Icon className={styles.imgicon} type="eye-o"/></span></ReportImg>
                        </div>
                    </div>
                    <div className={styles.daterow}>
                        <p className={styles.date}>{record.reportTimeStr}</p>
                    </div>
                    <div className={styles.right}>
                        <Tag color="cyan">评论</Tag>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className={styles.normal}>
            <div>
                <div className={styles.contentheader}>
                    <div className={operation ? styles.create : styles.createhide}>
                        <Button type="primary"><Icon type="api"/>写汇报</Button>
                        <Menu className={styles.createmenu}>
                            <Menu.Item className={styles.createway}>
                                <ReportModal onOk={createHandler} userlist={userlist} way={"day"}
                                             imagePath={imagePath} onUp={upSuccess} onDel={handleRemove}>
                                    <span className={styles.createbtn}>写日报</span>
                                </ReportModal>
                            </Menu.Item>
                            <Menu.Item className={styles.createway}>
                                <ReportModal onOk={createHandler} userlist={userlist} way={"week"}
                                             imagePath={imagePath} onUp={upSuccess} onDel={handleRemove}>
                                    <span className={styles.createbtn}>写周报</span>
                                </ReportModal>
                            </Menu.Item>
                            <Menu.Item className={styles.createway}>
                                <ReportModal onOk={createHandler} userlist={userlist} way={"month"}
                                             imagePath={imagePath} onUp={upSuccess} onDel={handleRemove}>
                                    <span className={styles.createbtn}>写月报</span>
                                </ReportModal>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className={styles.timefilter}>
                        <Search onSearch={searchHandler} report="report"></Search>
                    </div>
                </div>
                <Table
                    className={styles.wrapper}
                    showHeader={false}
                    columns={columns}
                    dataSource={dataSource}
                    loading={loading}
                    rowKey={record => record.id}
                    pagination={false}
                />
                {/*<Modal visible={preview} footer={null} onCancel={imgHide}>*/}
                {/*<img alt="" style={{width: '100%'}} src={previewUrl}/>*/}
                {/*</Modal>*/}
                <Pagination
                    className="ant-table-pagination"
                    total={total}
                    current={current}
                    pageSize={5}
                    onChange={pageChangeHandler}
                />
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const {list, total, page, userlist, imagePath, preview, previewUrl} = state.report;
    return {
        loading: state.loading.models.report,
        list,
        total,
        page,
        userlist,
        imagePath,
        preview,
        previewUrl,
    };
}

export default connect(mapStateToProps)(Report);
