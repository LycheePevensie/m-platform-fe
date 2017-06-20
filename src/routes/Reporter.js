import React from 'react';
import { connect } from 'dva';
import styles from './Common.css';
import ReportComponent from '../components/Report/Report';

function Report({ location, report }) {
    const {operation} = report;
    return (
        <div className={styles.normal}>
            <ReportComponent operation={operation}/>
        </div>
    );
}

export default connect(({report}) => ({report}))(Report);
