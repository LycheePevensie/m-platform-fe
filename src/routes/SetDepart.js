import React from 'react';
import { connect } from 'dva';
import styles from './Common.css';
import Department from '../components/Settings/Department';

function department({ location }) {
  return (
      <div className={styles.normal}>
        <Department />
      </div>
  );
}

export default connect()(department);
