import React, {Component} from 'react';
import {Form, Input, Tooltip, Icon, Select, Modal, Radio} from 'antd';
import styles from './Users.css'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class UserEditModal extends Component {

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
        console.log(this.props.record.department)
        this.props.form.setFieldsValue({
            department: this.props.record.department
        });
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
        const {userName, trueName, sex, userTel, userMail, departName, userJob, userFlag} = this.props.record;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(<div className={styles.icpselector}>
                <Select defaultValue="86">
                    <Option value="86">+86</Option>
                </Select>
            </div>
        );
        const options = !this.props.departlist ? '' : this.props.departlist.map(d =>
                <Option value={d.departId}>{d.department}</Option>);
        const levels = !this.props.levellist ? '' : this.props.levellist.map(d =>
                <Option value={d.levelId}>{d.levelName}</Option>);
        return (
            <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
            title={edit == "add" ? "新增用户" : "编辑用户"}
            visible={this.state.visible}
            onOk={this.okHandler}
            onCancel={this.hideModelHandler}
            okText={"保存"}
            width={700}
        >
            <Form horizontal onSubmit={this.okHandler}>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>用户名&nbsp;
                            <Tooltip title="用户名必须唯一"><Icon type="question-circle-o"/></Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                  {
                      getFieldDecorator('userName', {
                          initialValue: userName,
                          rules: [{required: true, message: '请输入用户名!', whitespace: true}],
                      })(<Input />)
                  }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="姓名"
                    hasFeedback
                >
                  {
                      getFieldDecorator('trueName', {
                          initialValue: trueName,
                          rules: [{required: true, message: '请输入姓名!', whitespace: true}],
                      })(<Input />)
                  }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="性别"
                >
                  {
                      getFieldDecorator('sex', {
                          initialValue: sex == 1 ? 'female' : 'male',
                          rules: [{required: true, message: '请选择性别!'}],
                      })(
                          <RadioGroup>
                              <Radio value="male">男</Radio>
                              <Radio value="female">女</Radio>
                          </RadioGroup>
                      )
                  }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机"
                >
                  {
                      getFieldDecorator('userTel', {
                          initialValue: userTel,
                          rules: [{required: true, message: '请输入电话号码!'}],
                      })(<Input addonBefore={prefixSelector}/>)
                  }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="邮箱"
                    hasFeedback
                >
                  {
                      getFieldDecorator('userMail', {
                          initialValue: userMail,
                          rules: [{
                              type: 'email', message: 'The input is not valid E-mail!',
                          }, {
                              required: true, message: 'Please input your E-mail!',
                          }],
                      })(<Input />)
                  }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="部门"
                >
                  {
                      getFieldDecorator('department', {
                          initialValue: departName,
                          rules: [{required: true, message: '请输入部门名!'}],
                      })(
                          <Select
                              showSearch
                              placeholder="请选择部门名"
                              optionFilterProp="children"
                          >
                              {!options ? '' : options}
                          </Select>
                      )
                  }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="职位"
                >
                  {
                      getFieldDecorator('userJob', {
                          initialValue: userJob,
                          rules: [{required: true, message: '请输入职位!', whitespace: true}],
                      })(<Input />)
                  }
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="角色"
                >
                  {
                      getFieldDecorator('userFlag', {
                          initialValue: userFlag,
                          rules: [{required: true, message: '请选择角色!'}],
                      })(
                          <Select
                              showSearch
                              placeholder="请选择角色"
                              optionFilterProp="children"
                          >
                              {!levels ? '' : levels}
                          </Select>
                      )
                  }
                </FormItem>
            </Form>
        </Modal>
      </span>
        );
    }
}

export default Form.create()(UserEditModal);
