import React, {PropTypes} from 'react';
import {connect} from 'dva';
import styles from './Common.css';
import RegisterForm from '../components/Register/Register';

const Register = ({
    register,
    dispatch,
}) => {
    const {imageUrl, imagePath, companylist} = register;

    function handleOk(values) {
        dispatch({type: 'register/create', payload: values})
    };

    function upSuccess(imgurl) {
        dispatch({
            type: 'register/uploadImg',
            payload: imgurl,
        });
    };

    function handleRemove(imagePath) {
        dispatch({
            type: 'register/removeImg',
            payload: imagePath,
        });
    };

    return (
        <RegisterForm imageUrl={imageUrl} imagePath={imagePath} onOk={handleOk} onUp={upSuccess} onDel={handleRemove} companylist={companylist}/>
    )
}

Register.propTypes = {
    dispatch: PropTypes.func,
}

export default connect(({register}) => ({register}))(Register)