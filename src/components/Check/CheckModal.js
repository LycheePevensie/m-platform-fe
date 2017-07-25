import React, {Component} from 'react';
import {Form, Input, TimePicker, Icon, Modal} from 'antd';
import MapModal from './Map';
import PhotoModal from './Photo';
import moment from 'moment';
import styles from './Check.css';

const FormItem = Form.Item;

class CheckEditModal extends Component {

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
            gps: ''
        });
    };

    hideModelHandler = () => {
        this.setState({
            visible: false,
        });
    };

    okHandler = () => {
        const {onOk, checkWay} = this.props;
        if (this.props.recognise == true) {
            this.props.form.setFieldsValue({
                recognise: true,
            });
        } else {
            this.props.form.setFieldsValue({
                recognise: false,
                checkImg: this.props.recognise
            });
        }

        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.checkWay = checkWay;
                values.checkTime = moment(this.props.form.getFieldValue("checkTime") + 28800000);
                onOk(values);
                this.hideModelHandler();
            }
        });
    };

    upLoad = (imgurl) => {
        const {onUp} = this.props;
        onUp(imgurl);
    };

    setGps = (p) => {
        this.setState({
            gps: p
        });
        this.props.form.setFieldsValue({
            checkPlace: p,
        });
    };

    render() {
        const {children, checkWay} = this.props;
        const {getFieldDecorator} = this.props.form;
        const {time} = this.props.record;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        const formNolabelLayout = {
            wrapperCol: {span: 24},
        };

        return (
            <span>
            <span onClick={this.showModelHandler}>
              { children }
            </span>
            <Modal
                title={checkWay == "checkin" ? "签到" : "签退"}
                visible={this.state.visible}
                onOk={this.okHandler}
                onCancel={this.hideModelHandler}
                okText={"保存"}
                width={700}
            >
                <Form horizontal onSubmit={this.okHandler}>
                    <FormItem
                        {...formNolabelLayout}
                    >
                        {
                            getFieldDecorator('recognise', {})(
                                <div className={styles.photoarea}>
                                    <PhotoModal onUp={this.upLoad}>
                                        <div className={styles.phototrigger}>
                                            <Icon type="camera-o"/>
                                            <div className={styles.phone}>
                                                <span className={styles.phonebtn}>点击拍照</span>
                                            </div>
                                        </div>
                                    </PhotoModal>
                                </div>
                            )
                        }

                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="时间"
                    >
                        {
                            getFieldDecorator('checkTime', {
                                initialValue: moment(),
                            })(<TimePicker disabled style={{width: '100%'}}/>)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="定位"
                    >
                        {
                            getFieldDecorator('checkPlace', {})(
                                <MapModal onOk={this.setGps}>
                                    <Input
                                        addonAfter={<Icon type="environment-o" className={styles.gpsicon}/>}
                                        value={this.state.gps}
                                        disabled={true}
                                    />
                                </MapModal>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="外勤说明"
                    >
                        {
                            getFieldDecorator('outReason', {
                                rules: [{required: true, message: '请补充外勤说明!', whitespace: true}],
                            })(<Input type="textarea" autosize/>)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="签到范围外说明"
                    >
                        {
                            getFieldDecorator('otherReason', {
                                rules: [{required: true, message: '请补充签到范围外说明!', whitespace: true}],
                            })(<Input type="textarea" autosize/>)
                        }
                    </FormItem>
                    <FormItem
                        style={{display: "none"}}
                        {...formItemLayout}
                        label="签到失败照片地址"
                    >
                        {
                            getFieldDecorator('checkImg', {})(<Input />)
                        }
                    </FormItem>
                </Form>
            </Modal>
        </span>
        );
    }
}

export default Form.create()(CheckEditModal);
