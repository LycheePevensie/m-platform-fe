import React, {Component} from 'react';
import {Form, Input, DatePicker, Icon, Modal, Select} from 'antd';
import moment from 'moment'

const FormItem = Form.Item;
const {Option, OptGroup} = Select;

class ExpenseEditModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            userlist: this.props.userlist.data,
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
        const options = !this.props.userlist ? '' : this.props.userlist.map(d => <Option value={d.userId}>{d.trueName}</Option>);
        return (
            <span>
            <span onClick={this.showModelHandler}>
              { children }
            </span>
            <Modal
                title="报销单"
                visible={this.state.visible}
                onOk={this.okHandler}
                onCancel={this.hideModelHandler}
                okText={"保存"}
                width={700}
            >
                <Form horizontal onSubmit={this.okHandler}>
                    <FormItem
                        {...formItemLayout}
                        label="报销单名称"
                    >
                        {
                            getFieldDecorator('expenseName', {
                                rules: [{required: true, message: '请选择报销单名称!'}],
                            })(
                                <Select
                                    showSearch
                                    placeholder="请选择报销单名称"
                                    optionFilterProp="children"
                                >
                                    <OptGroup label="办公费">
                                        <Option value="网络费用">网络费用</Option>
                                        <Option value="办公用品">办公用品</Option>
                                        <Option value="资质费">资质费</Option>
                                    </OptGroup>
                                    <OptGroup label="差旅费">
                                        <Option value="住宿费">住宿费</Option>
                                        <Option value="交通费">交通费</Option>
                                    </OptGroup>
                                    <Option value="培训费">培训费</Option>
                                    <Option value="通讯费">通讯费</Option>
                                    <Option value="餐饮补助">餐饮补助</Option>
                                    <Option value="招待费">招待费</Option>
                                    <Option value="其他补贴">其他补贴</Option>
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="报销金额"
                        hasFeedback
                    >
                        {
                            getFieldDecorator('expenseValue', {
                                rules: [{required: true, message: '请输入金额!', whitespace: true}],
                            })(
                                <Input
                                    placeholder="请输入金额"
                                    prefix={<Icon type="pay-circle-o"/>}
                                />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="提交人"
                    >
                        {
                            getFieldDecorator('expenseUser', {
                                rules: [{required: true, message: '请填写提交人姓名!'}],
                            })(
                                <Select
                                    showSearch
                                    placeholder="请选择提交人姓名"
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
                            getFieldDecorator('expenseManager', {
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
                         label="提交时间"
                     >
                        {
                            getFieldDecorator('expenseTime', {
                                rules: [{required: true, message: '请选择提交时间!'}],
                            })(
                                <DatePicker
                                    disabledDate={this.disabledDate}
                                    showTime={{hideDisabledOptions: true}}
                                    format="YYYY/MM/DD HH:mm"
                                    style={{width: '100%'}}
                                />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注"
                    >
                        {
                            getFieldDecorator('expenseTips', {})(<Input type="textarea" autosize/>)
                        }
                    </FormItem>
                </Form>
            </Modal>
        </span>
        );
    }
}

export default Form.create()(ExpenseEditModal);
