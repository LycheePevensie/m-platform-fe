import React, {Component} from 'react';
import {Form, Input, DatePicker, Icon, Modal, Select, Progress, Button} from 'antd';
import moment from 'moment';
import styles from './Task.css';

const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

class TaskEditModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            userlist: this.props.userlist.data,
            percent: 0,
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

    disabledDate = (current) => {
        return current && current.valueOf() <= Date.now() - 86400;
    };

    increase = () => {
        let percent = this.state.percent + 10;
        if (percent > 100) {
            percent = 100;
        }
        this.setState({percent});
        this.props.form.setFieldsValue({
            taskStatus: percent,
        });
    };

    decline = () => {
        let percent = this.state.percent - 10;
        if (percent < 0) {
            percent = 0;
        }
        this.setState({percent});
        this.props.form.setFieldsValue({
            taskStatus: percent,
        });
    };

    render() {
        const {children, operation} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {taskName, taskManager, taskMember, taskStart, taskDead, taskInfo, taskStatus} = this.props.record;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const options = !this.props.userlist ? '' : this.props.userlist.map(d =>
                <Option value={d.userId}>{d.trueName}</Option>);
        return (
            <span>
            <span onClick={this.showModelHandler}>
              { children }
            </span>
            <Modal
                title={!operation ? "新建任务" : "更新任务"}
                visible={this.state.visible}
                onOk={this.okHandler}
                onCancel={this.hideModelHandler}
                okText={"保存"}
                width={700}
            >
                <Form horizontal onSubmit={this.okHandler}>
                    <div className={!operation ? styles.show : styles.hide}>
                        <FormItem
                            {...formItemLayout}
                            label="任务名称"
                        >
                        {
                            getFieldDecorator('taskName', {
                                initialValue: taskName,
                                rules: operation ? '' : [{required: true, message: '请填写任务名称!'}],
                            })(<Input/>)
                        }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="创建人"
                        >
                        {
                            getFieldDecorator('taskManager', {
                                initialValue: taskManager,
                                rules: operation ? '' : [{required: true, message: '请选择创建人姓名!'}],
                            })(
                                <Select
                                    showSearch
                                    placeholder="请选择创建人姓名"
                                    optionFilterProp="children"
                                >
                                    {!options ? '' : options}
                                </Select>
                            )
                        }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="任务成员"
                        >
                        {
                            getFieldDecorator('taskMember', {
                                initialValue: taskMember,
                                rules: operation ? '' : [{required: true, message: '请填写至少一个任务成员姓名!'}],
                            })(
                                <Select
                                    showSearch
                                    mode="multiple"
                                    placeholder="请选择任务成员姓名"
                                    optionFilterProp="children"
                                >
                                    {!options ? '' : options}
                                </Select>
                            )
                        }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="创建日期"
                        >
                        {
                            getFieldDecorator('taskStart', {
                                initialValue:moment(taskStart),
                                rules: operation ? '' : [{required: true, message: '请选择创建时间!'}],
                            })(
                                <DatePicker
                                    disabledDate={this.disabledDate}
                                    showTime={{hideDisabledOptions: true}}
                                    placeholder="创建日期"
                                    format="YYYY/MM/DD HH:mm"
                                    style={{width: '100%'}}
                                />
                            )
                        }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="截止日期"
                        >
                        {
                            getFieldDecorator('taskDead', {
                                initialValue:moment(taskDead),
                                rules: operation ? '' : [{required: true, message: '请选择截止日期!'}],
                            })(
                                <DatePicker
                                    disabledDate={this.disabledDate}
                                    showTime={{hideDisabledOptions: true}}
                                    placeholder="截止日期"
                                    format="YYYY/MM/DD HH:mm"
                                    style={{width: '100%'}}
                                />
                            )
                        }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="任务内容"
                        >
                        {
                            getFieldDecorator('taskInfo', {
                                initialValue: taskInfo,
                                rules: operation ? '' : [{required: true, message: '请补充任务内容!'}],
                            })(<Input type="textarea" autosize/>)
                        }
                        </FormItem>
                    </div>
                    <div className={operation ? styles.show : styles.hide}>
                        <FormItem
                            {...formItemLayout}
                            label="任务状态"
                        >
                        {
                            getFieldDecorator('taskStatus', {
                                initialValue: taskStatus,
                            })(
                                <div>
                                    <Progress percent={this.state.percent}/>
                                    <ButtonGroup>
                                        <Button onClick={this.decline} icon="minus"/>
                                        <Button onClick={this.increase} icon="plus"/>
                                    </ButtonGroup>
                                </div>
                            )
                        }
                        </FormItem>
                    </div>
                    <FormItem
                        {...formItemLayout}
                        label="备注"
                    >
                        {
                            getFieldDecorator('taskTips', {})(<Input type="textarea" autosize/>)
                        }
                    </FormItem>
                </Form>
            </Modal>
        </span>
        );
    }
}

export default Form.create()(TaskEditModal);
