import React, {Component} from 'react';
import {Form, Modal} from 'antd';
import styles from './Check.css';

class MapModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            gps: '',
        };
    }

    showModelHandler = (e) => {
        if (e) e.stopPropagation();
        this.getGps();
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
        onOk(this.state.gps);
        this.hideModelHandler();
    };

    regeocoder = (lnglatXY, map) => {
        var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });
        geocoder.getAddress(lnglatXY, this.mapGeoCode.bind(this));
        new AMap.Marker({
            map: map,
            position: lnglatXY
        });
        map.setFitView();
    };

    mapGeoCode = (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
            this.setState({
                gps: result.regeocode.formattedAddress,
            });
        }
    };

    getGps = () => {
        let map, geolocation, lnglatXY;
        map = new AMap.Map('container', {
            resizeEnable: true,
            zoom: 18
        });
        map.plugin('AMap.Geolocation', mapGeo.bind(this));
        map.plugin(["AMap.ToolBar"], function () {
            map.addControl(new AMap.ToolBar());
        });
        if (location.href.indexOf('&guide=1') !== -1) {
            map.setStatus({scrollWheel: false})
        }
        function mapGeo() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,
                timeout: 10000,
                buttonOffset: new AMap.Pixel(10, 20),
                zoomToAccuracy: true,
                buttonPosition: 'RB'
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete.bind(this));
            AMap.event.addListener(geolocation, 'error', onError);
        }

        function onComplete(data) {
            lnglatXY = [data.position.getLng(), data.position.getLat()];
            this.regeocoder(lnglatXY, map).bind(this);
        };
        function onError(data) {
            document.getElementById('tip').innerHTML = '定位失败';
        };
    }

    render() {
        const {children} = this.props;
        return (
            <span>
                <span onClick={this.showModelHandler}>{ children }</span>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.hideModelHandler}
                    onOk={this.okHandler}
                >
                    <div id='container' className={styles.container}></div>
                </Modal>
            </span>
        );
    }
}

export default Form.create()(MapModal);