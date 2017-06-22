import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox, Tooltip, Select, Radio, Upload, message, Modal} from 'antd';
import styles from './Register.css';

const FormItem = Form.Item
const Option = Select.Option;
const RadioGroup = Radio.Group;

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            previewImg: '',
        };
    }

    handleOk = () => {
        const {onOk, imagePath} = this.props;
        this.props.form.setFieldsValue({
            userImage: imagePath,
        });
        this.props.form.validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return
            }
            onOk(values);
        })
    };

    checkPassword = (rule, value, callback) => {
        if (value && value !== this.props.form.getFieldValue('userPwd')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    };
    upSuccess = (imgurl) => {
        const {onUp} = this.props;
        const image = {imageurl: imgurl}
        onUp(image);
    };

    handleChange = (info) => {
        // if (info.file.status !== 'uploading') {}
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, this.upSuccess);
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    handleRemove = () => {
        const {onDel, imagePath} = this.props;
        const imageDpath = {imagePath: imagePath}
        onDel(imageDpath);
        this.props.form.setFieldsValue({
            userImage: '',
        });
    };

    handlePreview = (file) => {
        this.setState({
            visible: true,
            previewImg: file.url || file.thumbUrl
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {imageUrl} = this.props;
        const {getFieldDecorator} = this.props.form;
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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(<div className={styles.icpselector}>
                <Select defaultValue="86">
                    <Option value="86">+86</Option>
                </Select>
            </div>
        );
        return (
            <div className={styles.register}>
                <div className={styles.form}>
                    <div className={styles.logo}>
                        <img alt={'logo'} src={'https://t.alipayobjects.com/images/T1QUBfXo4fXXXXXXXX.png'}/>
                        <span>{'Welcome'}</span>
                    </div>
                    <form>
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
                                    rules: [{required: true, message: '请输入用户名!', whitespace: true}],
                                })(<Input />)
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                            hasFeedback
                        >
                            {getFieldDecorator('userPwd', {
                                rules: [{
                                    required: true, message: 'Please input your password!',
                                }],
                            })(
                                <Input type="password"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="确认密码"
                            hasFeedback
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Please confirm your password!',
                                }, {
                                    validator: this.checkPassword,
                                }],
                            })(
                                <Input type="password"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="姓名"
                            hasFeedback
                        >
                            {
                                getFieldDecorator('trueName', {
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
                                    initialValue: 'male',
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
                                    rules: [{
                                        type: 'email', message: 'The input is not valid E-mail!',
                                    }, {
                                        required: true, message: 'Please input your E-mail!',
                                    }],
                                })(<Input />)
                            }
                        </FormItem>
                        {/*<FormItem*/}
                            {/*{...formItemLayout}*/}
                            {/*label="公司"*/}
                        {/*>*/}
                            {/*{*/}
                                {/*getFieldDecorator('company', {*/}
                                    {/*rules: [{required: true, message: '请输入公司名!', whitespace: true}],*/}
                                {/*})(<Input />)*/}
                            {/*}*/}
                        {/*</FormItem>*/}
                        <FormItem
                            {...formItemLayout}
                            label="部门"
                        >
                            {
                                getFieldDecorator('department', {
                                    rules: [{required: true, message: '请输入部门名!', whitespace: true}],
                                })(<Input />)
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="职位"
                        >
                            {
                                getFieldDecorator('userJob', {
                                    rules: [{required: true, message: '请输入职位!', whitespace: true}],
                                })(<Input />)
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="权限级别"
                        >
                            {
                                getFieldDecorator('userFlag', {
                                    rules: [{required: true, message: '请输入权限值!'}],
                                })(
                                    <Select>
                                        <Option value="1">1</Option>
                                        <Option value="2">2</Option>
                                        <Option value="3">3</Option>
                                        <Option value="4">4</Option>
                                        <Option value="5">5</Option>
                                        <Option value="6">6</Option>
                                        <Option value="7">7</Option>
                                        <Option value="8">8</Option>
                                        <Option value="9">9</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label={<span><span className={styles.picrequire}>*</span>照片</span>}
                        >
                            {
                                getFieldDecorator('userImageShow', {})(
                                    <Upload
                                        className={styles.uploader}
                                        name="avatar"
                                        listType="picture-card"
                                        action="//localhost:8000/api/img/"
                                        beforeUpload={this.beforeUpload}
                                        onChange={this.handleChange}
                                        onPreview={this.handlePreview}
                                        onRemove={this.handleRemove}
                                    >
                                        {
                                            imageUrl ?
                                                null :
                                                <div>
                                                    <div className={styles.avatartrigger}>
                                                        <Icon type="plus"/>
                                                        <div className={styles.uploadtext}>点击上传</div>
                                                    </div>
                                                </div>
                                        }
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label=""
                            className={styles.hidepic}
                        >
                            {
                                getFieldDecorator('userImage', {
                                    rules: [{required: true, message: '请选择用于考勤的照片!'}],
                                })(
                                    <Input className={styles.preHide}/>
                                )
                            }
                        </FormItem>
                        <FormItem {...tailFormItemLayout} style={{marginBottom: 8}}>
                            {getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                                rules: [{required: true, message: '请确认已阅读并同意协议!'}],
                            })(
                                <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout} style={{marginBottom: 8}}>
                            <Button type="primary" size="large" onClick={this.handleOk}>
                                注册
                            </Button>
                        </FormItem>
                    </form>
                    <Modal visible={this.state.visible} footer={null} onCancel={this.handleCancel}>
                        <img alt="" style={{width: '100%'}} src={this.state.previewImg}/>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Form.create()(RegisterForm);
