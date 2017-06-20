import React, {Component} from 'react';
import {Modal} from 'antd';
import styles from './Report.css'

class ReportImg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
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

    render() {
        const {children, previewImg}=this.props;
        return (
            <span>
                <span onClick={this.showModelHandler}>
                  { children }
                </span>
                <Modal visible={this.state.visible} footer={null} onCancel={this.hideModelHandler}>
                    <img alt="" style={{width: '100%'}} src={previewImg}/>
                </Modal>
            </span>
        );
    }
}

export default ReportImg;
