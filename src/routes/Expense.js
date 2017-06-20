import React from 'react';
import { connect } from 'dva';
import styles from './Common.css';
import ExpenseComponent from '../components/Expense/Expense';

function Expense({ location, expense }) {
    const {operation} = expense;
    return (
        <div className={styles.normal}>
            <ExpenseComponent operation={operation}/>
        </div>
    );
}

export default connect(({expense}) => ({expense}))(Expense);
