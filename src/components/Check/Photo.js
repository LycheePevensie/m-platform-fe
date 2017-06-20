import React, {Component} from 'react';
import {Modal, Button} from 'antd';
import styles from './Check.css';

class PhotoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            videoSrc: '',
            mediaStreamTrack: null,
            snap: ''
        };
    }

    showModelHandler = (e) => {
        if (e) e.stopPropagation();
        this.setState({
            visible: true,
        });
        this.openCamera();
    };

    hideModelHandler = () => {
        this.setState({
            visible: false,
            videoSrc: ''
        });
        const canvas = document.getElementById("canvas").getContext("2d");
        canvas.clearRect(0, 0, 640, 480);
        this.state.mediaStreamTrack.stop();
    };

    upLoad = () => {
        const {onUp} = this.props;
        onUp(this.state.snap);
        this.hideModelHandler();
    };

    openCamera = () => {
        navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMeddia || navigator.msGetUserMedia;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                video: {facingMode: "user"},
                audio: true
            }).then((function (stream) {
                this.setState({mediaStreamTrack: typeof stream.stop === 'function' ? stream : stream.getTracks()[1]})
                this.setState({videoSrc: (window.URL || window.webkitURL).createObjectURL(stream)})
            }).bind(this)).catch(function (err) {
                console.log(err);
            })
        } else if (navigator.getMedia) {
            navigator.getMedia({
                video: true
            }, (function (stream) {
                this.setState({mediaStreamTrack: stream.getTracks()[0]})
                this.setState({videoSrc: (window.URL || window.webkitURL).createObjectURL(stream)})
            }).bind(this), function (err) {
                console.log(err);
            });
        }
    };

    snap = () => {
        const canvas = document.getElementById("canvas");
        const video = document.getElementById("video");
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, 640, 480);
        this.setState({
            snap: canvas.toDataURL('image/jpeg')
        })
    };

    render() {
        const {children} = this.props;
        return (
            <span>
                <span onClick={this.showModelHandler}>{ children }</span>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.hideModelHandler}
                    onOk={this.okHandler}
                    footer={[
                        <Button key="snap" size="large" onClick={this.snap}>拍照</Button>,
                        <Button key="upload" type="primary" size="large" onClick={this.upLoad}>上传</Button>,
                    ]}
                >
                    <div className={styles.videowrapper}>
                        <video id="video" className={styles.video} autoPlay src={this.state.videoSrc}></video>
                    </div>
                    <div className={styles.canvas}>
                        <canvas id="canvas" width="640" height="480" className={styles.video}></canvas>
                    </div>
                </Modal>
            </span>
        );
    }
}

export default PhotoModal;