import React from 'react';
import { connect } from 'dva';
import styles from './Common.css';
import CheckComponent from '../components/Check/Check';

function Check({ location }) {
    return (
        <div className={styles.normal}>
            <CheckComponent />
        </div>
    );
}

export default connect()(Check);
