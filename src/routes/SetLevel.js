import React from 'react';
import { connect } from 'dva';
import styles from './Common.css';
import Level from '../components/Settings/Level';

function level({ location }) {
    return (
        <div className={styles.normal}>
            <Level />
        </div>
    );
}

export default connect()(level);
