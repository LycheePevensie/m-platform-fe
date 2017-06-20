import React from 'react';
import { connect } from 'dva';
import styles from './Common.css';
import LeaveComponent from '../components/Leave/Leave';

function Leave({ location, leave }) {
    const {operation} = leave;
    return (
        <div className={styles.normal}>
            <LeaveComponent operation={operation}/>
        </div>
    );
}

export default connect(({leave}) => ({leave}))(Leave);
