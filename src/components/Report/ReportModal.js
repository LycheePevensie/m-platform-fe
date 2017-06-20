import React, {Component} from 'react';
import {Form, Input, DatePicker, Icon, Modal, Select, Upload, message, TimePicker} from 'antd';
import moment from 'moment';
import styles from './Report.css'

const FormItem = Form.Item;
const Option = Select.Option;
const {MonthPicker, RangePicker} = DatePicker;

class ReportEditModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            userlist: this.props.userlist.data,
            percent: 0,
            previewVisible: false,
            previewImg: '',
            imgurl: ''
        };
    }

    showModelHandler = (e) => {
        if (e) e.stopPropagation();
        this.setState({
            visible: true,
            imgurl: ''
        });
    };

    hideModelHandler = () => {
        this.setState({
            visible: false,
        });
    };

    okHandler = () => {
        const {onOk, imagePath, way} = this.props;
        this.props.form.setFieldsValue({
            reportImage: imagePath,
        });
        if (way === 'day') {
            this.props.form.setFieldsValue({
                reportWeek: '',
                reportMonth: '',
            });
        } else if (way === 'week') {
            this.props.form.setFieldsValue({
                reportMonth: '',
                reportDate: '',
            });
        } else if (way === 'month') {
            this.props.form.setFieldsValue({
                reportWeek: '',
                reportDate: '',
            });
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const weekArr = this.props.form.getFieldValue("reportWeek");
                values.reportTime = values.reportTime ? moment(this.props.form.getFieldValue("reportTime") + 28800000) : '';
                values.reportDate = values.reportDate ? moment(this.props.form.getFieldValue("reportDate") + 28800000) : '';
                values.reportMonth = values.reportMonth ? moment(this.props.form.getFieldValue("reportMonth") + 28800000) : '';
                values.reportWeek = values.reportWeek ? [moment(weekArr[0] + 28800000), moment(weekArr[1] + 28800000)] : '';
                onOk(values);
                this.hideModelHandler();
            }
        });
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
        this.setState({
            imgurl: imgurl
        })
        onUp(image);
    };

    handleChange = (info) => {
        // if (info.file.status !== 'uploading') {}
        console.log(info);
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
            reportImage: '',
        });
    };

    handlePreview = (file) => {
        this.setState({previewVisible: true, previewImg: file.url || file.thumbUrl})
    };

    handleCancel = () => {
        this.setState({previewVisible: false})
    };

    setTitle = (way) => {
        if (way === "day") {
            return "写日报";
        }
        if (way === "week") {
            return "写周报"
        }
        if (way === "month") {
            return "写月报"
        }
    };

    thisWeek = () => {
        let weekDays = {"星期一": 1, "星期二": 2, "星期三": 3, "星期四": 4, "星期五": 5, "星期六": 6, "星期日": 7}
        let weekNow = moment().format('dddd');
        let thisMon = moment(moment() - 86400000 * (weekDays[weekNow] - 1));
        let thisSun = moment(moment() - 86400000 * (weekDays[weekNow] - 7));
        return [thisMon, thisSun];
    };

    lastWeek = () => {
        let weekDays = {"星期一": 1, "星期二": 2, "星期三": 3, "星期四": 4, "星期五": 5, "星期六": 6, "星期日": 7}
        let weekNow = moment().format('dddd');
        let lastMon = moment(moment() - 86400000 * (weekDays[weekNow] + 6));
        let lastSun = moment(moment() - 86400000 * (weekDays[weekNow]));
        return [lastMon, lastSun];
    };

    disabledDate = (current) => {
        return current && (current.valueOf() <= (Date.now() - 1296000000));
    };

    disabledMonth = (current) => {
        return current && (current.valueOf() <= (Date.now() - 7776000000));
    };

    render() {
        const {children, way} = this.props;
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
                title={this.setTitle(way)}
                visible={this.state.visible}
                onOk={this.okHandler}
                onCancel={this.hideModelHandler}
                okText={"保存"}
                width={700}
            >
                <Form horizontal onSubmit={this.okHandler}>
                    <FormItem
                        {...formItemLayout}
                        label="汇报人"
                    >
                        {
                            getFieldDecorator('reporter', {
                                rules: [{required: true, message: '请选择汇报人姓名!'}],
                            })(
                                <Select
                                    showSearch
                                    placeholder="请选择汇报人姓名"
                                    optionFilterProp="children"
                                >
                                    {!options ? '' : options}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="可查看者"
                    >
                        {
                            getFieldDecorator('readers', {
                                rules: [{required: true, message: '请填写至少一个可查看人姓名!'}],
                            })(
                                <Select
                                    showSearch
                                    mode="multiple"
                                    placeholder="请选择可查看人姓名"
                                    optionFilterProp="children"
                                >
                                    {!options ? '' : options}
                                </Select>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="日期"
                        style={{
                            display: way === 'day' ? 'block' : 'none'
                        }}
                    >
                        {
                            getFieldDecorator('reportDate', {
                                rules: way === 'day' ? [{required: true, message: '请选择日期!'}] : '',
                                initialValue: moment(),
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
                        label="周"
                        style={{
                            display: way === 'week' ? 'block' : 'none'
                        }}
                    >
                        {
                            getFieldDecorator('reportWeek', {
                                rules: way === 'week' ? [{required: true, message: '请选择周!'}] : '',
                            })(
                                <RangePicker size="default" format="YYYY-MM-DD" style={{width: '100%'}}
                                             ranges={{'上周': this.lastWeek(), '本周': this.thisWeek()}}/>
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="月"
                        style={{
                            display: way === 'month' ? 'block' : 'none'
                        }}
                    >
                        {
                            getFieldDecorator('reportMonth', {
                                rules: way === 'month' ? [{required: true, message: '请选择月份!'}] : '',
                                initialValue: moment(),
                            })(
                                <MonthPicker size="default" style={{width: '100%'}}
                                             placeholder="按月查询" disabledDate={this.disabledMonth}
                                />
                            )
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="时间"
                    >
                        {
                            getFieldDecorator('reportTime', {
                                initialValue: moment(),
                                rules: [{required: true}],
                            })(<TimePicker disabled format="YYYY-MM-DD hh:mm:ss a"
                                           style={{width: '100%'}}/>)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="汇报内容"
                    >
                        {
                            getFieldDecorator('reportInfo', {
                                rules: [{required: true, message: '请补充汇报内容!'}],
                            })(<Input type="textarea" autosize/>)
                        }
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="备注"
                    >
                        {
                            getFieldDecorator('reportTips', {})(<Input type="textarea" autosize/>)
                        }
                    </FormItem>
                     <FormItem
                         {...formItemLayout}
                         label="上传图片"
                     >
                        {
                            getFieldDecorator('reportImage', {})(
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
                                        this.state.imgurl ?
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
                </Form>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="" style={{width: '100%'}} src={this.state.previewImg}/>
                </Modal>
            </Modal>
        </span>
        );
    }
}

export default Form.create()(ReportEditModal);
