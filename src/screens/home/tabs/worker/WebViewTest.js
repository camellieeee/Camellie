/**
 * Created by turing on 2017/6/16.
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    ListView,
    RefreshControl,
    NativeModules,
    ActivityIndicator,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Dimensions,
    Platform,
    Animated,
    Easing,
    WebView
}from 'react-native';
const {width, height}=Dimensions.get('window');
import {connect} from 'react-redux';
import {px} from '../../../../common/utils';
import Color from '../../../../common/Color';
// import Carousel from 'react-native-snap-carousel';

import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';

// import Interactable from 'react-native-interactable';
// import Wkwebview from 'react-native-wkwebview';
import SafariView from 'react-native-safari-view';

class WebViewTest extends Component {
    static navigatorStyle = {
        navBarBackgroundColor: 'rgba(37,37,37,0.5)',
        navBarTextColor: Color.yellowPale,
        navBarButtonColor: '#fff',
        statusBarTextColorScheme: 'light',
        screenBackgroundColor: Color.whitePale
    };

    constructor(props) {
        super(props);
        this.state = {
            fadeInOpacity: new Animated.Value(0)
        }
    }

    fetchData() {
    }

    componentDidMount() {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear
        }).start();
    }

    componentWillUnmount() {
    }

    render() {
        let itemWidth = width - px(150);
        return (
            <Animated.View style={[styles.container,{opacity:this.state.fadeInOpacity}]}>
                {/*<Webview style={{ backgroundColor: '#ff0000' }}
                         allowsInlineMediaPlayback={true}
        //                  injectedJavaScript="window.onload = function () {
        //     var _video = document.getElementsByTagName('video');
        //     for (var i = 0; i < _video.length; i++) {
        //         _video[i].setAttribute('webkit-playsinline', 'true');
        //         _video[i].setAttribute('playsinline', 'true');
        //     };
        //     var _embed = document.getElementById('player').childNodes;
        //
        // }"
                    // userAgent="MyFancyWebView"
                    // hideKeyboardAccessoryView={false}
                         ref="webview"
                    // sendCookies={true}
                         source={{ uri: 'https://www.baidu.com' }}/>*/}
                <TouchableOpacity onPress={()=>{
                        SafariView.show({
                          url: 'http://sports.le.com/live/10201706190846377.html'
                        });}}
                style={{width:width,height:100,backgroundColor:'yellow'}} />
            </Animated.View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: width, height: height - 64
    },
    header: {
        width: width, height: px(100),
        backgroundColor: Color.yellowPale
    }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        counter: state.counter
    };
}

export default connect(mapStateToProps)(WebViewTest);