import React, {Component} from 'react';
import {Form, Input, Icon, Modal, Collapse} from 'antd';
import styles from './Settings.css';

const FormItem = Form.Item;
const Panel = Collapse.Panel;

class LevelModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    showModelHandler = (e) => {
        if (e) e.stopPropagation();
        this.setState({
            visible: true,
        });
    };

    hideModelHandler = () => {
        this.setState({
            visible: false,
        });
    };

    okHandler = () => {
        const {onOk} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                onOk(values);
                this.hideModelHandler();
            }
        });

    };

    render() {
        const {children, edit} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {levelId, levelName, levelNum,} = this.props.record;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };

        return (
            <span>
            <span onClick={this.showModelHandler}>
              { children }
            </span>
            <Modal
                title={edit == "add" ? "新增角色" : "编辑角色"}
                visible={this.state.visible}
                onOk={this.okHandler}
                onCancel={this.hideModelHandler}
                okText={"保存"}
                width={700}
            >
                <Form horizontal onSubmit={this.okHandler}>
                    <FormItem
                        style={{display: "none"}}
                        {...formItemLayout}
                        label="角色Id"
                    >
                      {
                          getFieldDecorator('levelId', {
                              initialValue: levelId,
                          })(<Input />)
                      }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="权限等级"
                        hasFeedback
                    >
                      {
                          getFieldDecorator('levelNum', {
                              initialValue: levelNum,
                              rules: [{required: true, message: '请输入权限等级!', whitespace: true}],
                          })(<Input />)
                      }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="角色名称"
                        hasFeedback
                    >
                      {
                          getFieldDecorator('levelName', {
                              initialValue: levelName,
                              rules: [{required: true, message: '请输入角色名称!', whitespace: true}],
                          })(<Input />)
                      }
                    </FormItem>
                </Form>
                <Collapse bordered={false} className={styles.collapse}>
                    <Panel header={(
                        <span style={{color:'rgba(0, 0, 0, 0.65)'}}>权限等级说明&nbsp;<Icon type="info-circle-o" /></span>
                    )} key="1">
                        <p className={styles.tips}>1.&nbsp;管理员具有最高权限，权限等级为0</p>
                        <p className={styles.tips}>2.&nbsp;管理员添加权限时选填1-100，数字越大权限越大</p>
                        <p className={styles.tips}>3.&nbsp;一个权限等级可对应多个角色</p>
                    </Panel>
                </Collapse>
            </Modal>
          </span>
        );
    }
}

export default Form.create()(LevelModal);
