import React, {Component} from 'react';
import {Form, Icon, Select, DatePicker, notification} from 'antd';
import moment from 'moment';
import styles from './Search.css'

const FormItem = Form.Item;
const Option = Select.Option;
const {MonthPicker, RangePicker} = DatePicker;

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchway: ''
        };
    }

    okHandler = () => {
        console.log('testtest')
        const {onSearch} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (!values.SearchWay) {
                    notification.warn({
                        message: '请选择查询方式！',
                        top: 500,
                        duration: 2,
                    });
                } else if (!(values.SearchDate || values.SearchMonth || values.SearchPeriod)) {
                    notification.warning({
                        message: '请填写具体查询时间！',
                        duration: 2,
                    });
                } else {
                    const pArr = this.props.form.getFieldValue("SearchPeriod");
                    values.SearchDate ? values.SearchDate = moment(this.props.form.getFieldValue("SearchDate") + 28800000) : null;
                    values.SearchMonth ? values.SearchMonth = moment(this.props.form.getFieldValue("SearchMonth") + 28800000) : null;
                    values.SearchPeriod ? values.SearchPeriod = [moment(pArr[0] + 28800000), moment(pArr[1] + 28800000)] : null;
                    onSearch(values);
                }
            }
        });
    };

    handleChange = (e) => {
        this.setState({
            searchway: e,
        });
        if (e === 'date') {
            this.props.form.setFieldsValue({
                SearchMonth: null,
                SearchPeriod: null,
            });
        }
        if (e === 'month') {
            this.props.form.setFieldsValue({
                SearchDate: null,
                SearchPeriod: null,
            });
        }
        if (e === 'period') {
            const pArr = this.props.form.getFieldValue("SearchPeriod")
            this.props.form.setFieldsValue({
                SearchMonth: null,
                SearchDate: null,
            });
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

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <span>
            <Form layout="inline">
                <FormItem>
                    {getFieldDecorator('SearchWay', {})(
                        <Select
                            style={{
                                width: 130,
                                marginRight: this.state.searchway === '' ? -30 : 0
                            }}
                            placeholder="请选择查询方式"
                            size="default"
                            onChange={this.handleChange}
                        >
                            <Option value="date">{this.props.report ? "日报" : "按日期查询"}</Option>
                            <Option value="month">{this.props.report ? "月报" : "按月查询"}</Option>
                            <Option value="period">{this.props.report ? "周报" : "按时间段查询"}</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('SearchDate', {})(
                        <DatePicker
                            size="default"
                            style={{
                                width: 105,
                                marginRight: -20,
                                display: this.state.searchway === 'date' ? 'inline-block' : 'none'
                            }}
                            placeholder="按日期查询"
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('SearchMonth', {})(
                        <MonthPicker
                            size="default"
                            style={{
                                width: 85,
                                marginLeft: -10,
                                marginRight: -10,
                                display: this.state.searchway === 'month' ? 'inline-block' : 'none'
                            }}
                            placeholder="按月查询"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('SearchPeriod', {})(
                        <RangePicker
                            size="default"
                            style={{
                                width: 208,
                                marginLeft: -20,
                                display: this.state.searchway === 'period' ? 'inline-block' : 'none'
                            }}
                            ranges={{'上周': this.lastWeek(), '本周': this.thisWeek()}}
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

export default Form.create()(Search);
