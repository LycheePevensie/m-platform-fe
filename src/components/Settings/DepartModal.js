import React, {Component} from 'react';
import {Form, Input, Select, Modal, TimePicker, notification} from 'antd';
import moment from 'moment';
import styles from './Settings.css';

const FormItem = Form.Item;
const Option = Select.Option;

class DepartModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            checkS: '',
            checkE: '',
            leaveS: '',
            leaveE: ''
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
        if (this.props.form.getFieldValue("departCheckS") > this.props.form.getFieldValue("departCheckE")) {
            notification.warn({
                message: '签到起始时间必须小于终止时间！',
                top: 500,
                duration: 2,
            });
        } else if (this.props.form.getFieldValue("departLeaveS") > this.props.form.getFieldValue("departLeaveE")) {
            notification.warn({
                message: '签退起始时间必须小于终止时间！',
                top: 500,
                duration: 2,
            });
        } else {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    values.departCheckS = moment(this.props.form.getFieldValue("departCheckS") + 28800000);
                    values.departCheckE = moment(this.props.form.getFieldValue("departCheckE") + 28800000);
                    values.departLeaveS = moment(this.props.form.getFieldValue("departLeaveS") + 28800000);
                    values.departLeaveE = moment(this.props.form.getFieldValue("departLeaveE") + 28800000);
                    onOk(values);
                    this.hideModelHandler();
                }
            });
        }
    };

    render() {
        const {children, userlist} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {departId, department, departLeader, departCheckS, departCheckE, departLeaveS, departLeaveE} = this.props.record;
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
        const formItemLayoutTime = {
            labelCol: {
                xs: {span: 40},
                sm: {span: 12},
            },
            wrapperCol: {
                xs: {span: 40},
                sm: {span: 8},
            },
        };
        const formItemLayoutTimeE = {
            labelCol: {
                xs: {span: 40},
                sm: {span: 0},
            },
            wrapperCol: {
                xs: {span: 40},
                sm: {span: 20},
            },
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
                        style={{display:"none"}}
                        {...formItemLayout}
                        label="部门Id"
                    >
                      {
                          getFieldDecorator('departId', {
                              initialValue: departId,
                          })(<Input />)
                      }
                    </FormItem>
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
                        style={{display: 'inline-block', width: '50%'}}
                        {...formItemLayoutTime}
                        label="签到时间"
                    >
                        {
                            getFieldDecorator('departCheckS', {
                                initialValue: moment(departCheckS),
                                rules: [{required: true, message: '请选择签到起始时间!'}],
                            })(<TimePicker format={format} style={{width: 120}} placeholder=""/>)
                        }
                    </FormItem>
                    <span className={styles.timelink}>～</span>
                    <FormItem
                        style={{display: 'inline-block', width: '50%'}}
                        {...formItemLayoutTimeE}
                        label={<span> </span>}
                    >
                        {
                            getFieldDecorator('departCheckE', {
                                initialValue: moment(departCheckE),
                                rules: [{required: true, message: '请选择签到终止时间!'}],
                            })(<TimePicker format={format} style={{width: 120}} placeholder=""/>)
                        }
                    </FormItem>
                    <FormItem
                        style={{display: 'inline-block', width: '50%'}}
                        {...formItemLayoutTime}
                        label="签退时间"
                    >
                        {
                            getFieldDecorator('departLeaveS', {
                                initialValue: moment(departLeaveS),
                                rules: [{required: true, message: '请选择签退起始时间!'}],
                            })(<TimePicker format={format} style={{width: 120}} placeholder=""/>)
                        }
                    </FormItem>
                    <span className={styles.timelink}>～</span>
                    <FormItem
                        style={{display: 'inline-block', width: '50%'}}
                        {...formItemLayoutTimeE}
                        label={<span> </span>}
                    >
                        {
                            getFieldDecorator('departLeaveE', {
                                initialValue: moment(departLeaveE),
                                rules: [{required: true, message: '请选择签退终止时间!'}],
                            })(<TimePicker format={format} style={{width: 120}} placeholder=""/>)
                        }
                    </FormItem>
                </Form>
            </Modal>
          </span>
        );
    }
}

export default Form.create()(DepartModal);
