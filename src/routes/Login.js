import React, {PropTypes} from 'react';
import {connect} from 'dva';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import styles from './Login.css';
import PhotoModal from '../components/Check/Photo';

const FormItem = Form.Item

const Login = ({
    login,
    dispatch,
    form: {
        getFieldDecorator,
        validateFieldsAndScroll,
    },
}) => {
    const {loginLoading} = login

    function handleOk() {
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            dispatch({type: 'login/login', payload: values})
        })
    }

    return (
        <div className={styles.login} style={{backgroundImage: `url(../api/imac-2x.png)`}}>
            <div className={styles.logo}>
                <img alt={'logo'} src={'../api/Clipboard.png'}/>
                <p>Welcome to m-platform</p>
            </div>
            <div className={styles.form}>
                <div className={styles.triangle}></div>
                <form>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{
                                required: true,
                                message: '请填写用户名',
                            }],
                        })(
                            <Input prefix={
                                <Icon type="user" style={{fontSize: 13}}/>} size="large" onPressEnter={handleOk} placeholder="用户名"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                message: '请填写密码',
                            }],
                        })(
                            <Input prefix={
                                <Icon type="lock" style={{fontSize: 13}}/>} size="large" type="password" onPressEnter={handleOk} placeholder="密码"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住我</Checkbox>
                        )}
                        <a className={styles.forgot} href="">忘记密码</a>
                        <div>
                            <Button type="primary" size="large" onClick={handleOk} loading={loginLoading} style={{"margin-right": "20px"}}>
                                登录
                            </Button>
                            <PhotoModal>
                                <Button type="primary" size="large">拍照登录</Button>
                            </PhotoModal>
                        </div>
                        <a href="/register">没有账号？立即注册！</a>
                    </FormItem>
                </form>
            </div>
        </div>
    )
}

Login.propTypes = {
    form: PropTypes.object,
    login: PropTypes.object,
    dispatch: PropTypes.func,
}

export default connect(({login}) => ({login}))(Form.create()(Login))

