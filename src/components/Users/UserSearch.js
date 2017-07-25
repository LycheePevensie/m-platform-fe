import React, {Component} from 'react';
import {Form, Input, Icon, Select, notification} from 'antd';
import styles from './Users.css'

const FormItem = Form.Item;
const Option = Select.Option;

class UserSearch extends Component {

    okHandler = () => {
        const {onSearch} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (!values.userCondition) {
                    notification.warn({
                        message: '请填写查询关键字！',
                        top: 500,
                        duration: 2,
                    });
                } else {
                    onSearch(values);
                }
            }
        });
    };

    handleChange = (e) => {
        this.props.form.setFieldsValue({
            prefix: e
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: "name",
        })(<div className={styles.icpselector}>
                <Select
                    defaultValue="name"
                    onChange={this.handleChange}
                >
                    <Option value="name">姓名</Option>
                    <Option value="department">部门ID</Option>
                </Select>
            </div>
        );

        return (
            <span>
            <Form layout="inline">
                <FormItem>
                    {getFieldDecorator('userCondition', {})(
                        <Input
                            addonBefore={prefixSelector}
                            size="default"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Icon type="search" className={styles.filtericon} onClick={this.okHandler}/>
                </FormItem>
            </Form>
            </span>
        );
    }
}

export default Form.create()(UserSearch);
