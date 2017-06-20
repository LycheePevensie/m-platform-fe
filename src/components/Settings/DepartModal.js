import React, {Component} from 'react';
import {Form, Input, Select, Modal, TimePicker, Button} from 'antd';
import styles from './Settings.css'

const FormItem = Form.Item;
const Option = Select.Option;

class DepartModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            open: false
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

    timeOpenChange = (open) => {
        console.log(open)
        this.setState({open});
    }

    timeClose = () => this.setState({open: false})


    render() {
        const {children, userlist} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {department, departLeader, departCheck, departLeave} = this.props.record;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const format = 'HH:mm';
        const options = !userlist ? '' : userlist.map(d =>
                <Option value={d.userId}>{d.trueName}</Option>);

        return (
            <span>
            <span onClick={this.showModelHandler}>
              { children }
            </span>
            <Modal
                title="编辑部门"
                visible={this.state.visible}
                onOk={this.okHandler}
                onCancel={this.hideModelHandler}
                okText={"保存"}
                width={700}
            >
                <Form horizontal onSubmit={this.okHandler}>
                    <FormItem
                        {...formItemLayout}
                        label="部门名称"
                        hasFeedback
                    >
                      {
                          getFieldDecorator('department', {
                              initialValue: department,
                              rules: [{required: true, message: '请输入部门名称!', whitespace: true}],
                          })(<Input />)
                      }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="负责人"
                    >
                        {
                            getFieldDecorator('departLeader', {
                                initialValue: departLeader,
                                rules: [{required: true, message: '请选择部门负责人!'}],
                            })(
                                <Select
                                    showSearch
                                    placeholder="请选择部门负责人"
                                    optionFilterProp="children"
                                >
                                    {!options ? '' : options}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="签到时间"
                    >
                        {
                            getFieldDecorator('departCheck', {
                                rules: [{required: true, message: '请选择签到时间!'}],
                            })(
                                <div>
                                    <TimePicker format={format} style={{width:120}} placeholder=""/>
                                    <span style={{margin: "0 10px"}}>～</span>
                                    <TimePicker format={format} style={{width:120}} placeholder=""/>
                                </div>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="签退时间"
                    >
                        {
                            getFieldDecorator('departLeave', {
                                rules: [{required: true, message: '请选择签退时间!'}],
                            })(
                                <div>
                                    <TimePicker format={format} style={{width:120}} placeholder=""/>
                                    <span style={{margin: "0 10px"}}>～</span>
                                    <TimePicker format={format} style={{width:120}} placeholder=""/>
                                </div>
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
          </span>
        );
    }
}

export default Form.create()(DepartModal);
