import React from 'react';
import { connect } from 'dva';
import styles from './Common.css';
import SetComponent from '../components/Settings/Department';

function Settings({ location }) {
  return (
      <div className={styles.normal}>
        <SetComponent />
      </div>
  );
}

export default connect()(Settings);
