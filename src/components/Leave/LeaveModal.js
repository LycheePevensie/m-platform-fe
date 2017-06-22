import React, {Component} from 'react';
import {Form, Input, DatePicker, Modal, Select} from 'antd';
import moment from 'moment'

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class LeaveEditModal extends Component {

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

    disabledDate = (current) => {
        return current && current.valueOf() <= Date.now() - 86400;
    };

    render() {
        const {children} = this.props;
        const {getFieldDecorator} = this.props.form;
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
                title="请假模板"
                visible={this.state.visible}
                onOk={this.okHandler}
                onCancel={this.hideModelHandler}
                okText={"保存"}
                width={700}
            >
                <Form horizontal onSubmit={this.okHandler}>
                    <FormItem
                        {...formItemLayout}
                        label="申请人"
                    >
                        {
                            getFieldDecorator('leaveUser', {
                                rules: [{required: true, message: '请选择申请人姓名!'}],
                            })(
                                <Select
                                    showSearch
                                    placeholder="请选择申请人姓名"
                                    optionFilterProp="children"
                                >
                                    {!options ? '' : options}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="审批人"
                    >
                        {
                            getFieldDecorator('leaveManager', {
                                rules: [{required: true, message: '请填写审批人姓名!'}],
                            })(
                                <Select
                                    showSearch
                                    placeholder="请选择审批人姓名"
                                    optionFilterProp="children"
                                >
                                    {!options ? '' : options}
                                </Select>
                            )
                        }
                    </FormItem>
                     <FormItem
                         {...formItemLayout}
                         label="请假时间"
                     >
                        {
                            getFieldDecorator('leaveTime', {
                                rules: [{required: true, message: '请选择请假时间!'}],
                            })(
                                <RangePicker
                                    disabledDate={this.disabledDate}
                                    showTime={{hideDisabledOptions: true}}
                                    ranges={{
                                        Today: [moment(), moment()],
                                        'This Month': [moment(), moment().endOf('month')]
                                    }}
                                    format="YYYY/MM/DD HH:mm"
                                    style={{width: '100%'}}
                                />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="请假类型"
                    >
                        {
                            getFieldDecorator('leaveType', {
                                rules: [{required: true, message: '请补充请假类型!', whitespace: true}],
                            })(
                                <Select placeholder="请假类型">
                                    <Option value="事假">事假</Option>
                                    <Option value="病假">病假</Option>
                                    <Option value="年假">年假</Option>
                                    <Option value="婚假">婚假</Option>
                                    <Option value="产假">产假</Option>
                                    <Option value="丧假">丧假</Option>
                                    <Option value="其他">其他，请备注说明</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="请假事由"
                    >
                        {
                            getFieldDecorator('leaveReason', {})(<Input type="textarea" autosize/>)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注"
                    >
                        {
                            getFieldDecorator('leaveTips', {})(<Input type="textarea" autosize/>)
                        }
                    </FormItem>
                </Form>
            </Modal>
        </span>
        );
    }
}

export default Form.create()(LeaveEditModal);
