import React from 'react';
import { connect } from 'dva';
import styles from './Common.css';
import TaskComponent from '../components/Task/Task';

function Task({ location, task }) {
    const {operation} = task;
    return (
        <div className={styles.normal}>
            <TaskComponent operation={operation}/>
        </div>
    );
}

export default connect(({task}) => ({task}))(Task);
