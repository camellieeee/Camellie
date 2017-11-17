/**
 * Created by turing on 2017/6/4.
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
    Easing
}from 'react-native';
const {width, height}=Dimensions.get('window');
import {connect} from 'react-redux';
import {px} from '../../../common/utils';
import Color from '../../../common/Color';
import ParallaxView from '../../../components/ParallaxView';
import Animation from 'lottie-react-native';

class ScrollTest extends Component {
    static navigatorStyle = {
        // navBarBackgroundColor: 'rgba(37,37,37,0.5)',
        // navBarTextColor: Color.yellowPale,
        // navBarButtonColor: '#fff',
        navBarHidden: true,
        statusBarTextColorScheme: 'light',
        screenBackgroundColor: Color.whitePale
    };

    constructor(props) {
        super(props);
        this.state = {
            fadeInOpacity: new Animated.Value(0),
            progress: new Animated.Value(0),
            progress1: new Animated.Value(0)
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
        this.fetchData();
        this.animation.play()
    }

    _click() {
        Animated.timing(this.state.progress, {
            toValue: 1,
            duration: 2000
        }).start()
    }

    //
    render() {
        return (
            <Animated.View style={[styles.container,{opacity:this.state.fadeInOpacity}]}>
                {/*<ParallaxView
                 backgroundSource={{uri:'https://hiracervideo.oss-cn-hangzhou.aliyuncs.com/%E8%8A%B1%E7%B5%AE/(4K)%E5%A4%A7%E9%98%AA%E3%82%AA%E3%83%BC%E3%83%88%E3%83%A1%E3%83%83%E3%82%BB2016%20-%20%E3%82%B3%E3%83%B3%E3%83%91%E3%83%8B%E3%82%AA%E3%83%B3%E3%83%BB%E3%82%AD%E3%83%A3%E3%83%B3%E3%82%AE%E3%83%A3%E3%83%AB%20vol.23/(4K)%E5%A4%A7%E9%98%AA%E3%82%AA%E3%83%BC%E3%83%88%E3%83%A1%E3%83%83%E3%82%BB2016%20-%20%E3%82%B3%E3%83%B3%E3%83%91%E3%83%8B%E3%82%AA%E3%83%B3%E3%83%BB%E3%82%AD%E3%83%A3%E3%83%B3%E3%82%AE%E3%83%A3%E3%83%AB%20vol.23.png'}}
                 windowHeight={300}
                 header={(
                 <Text>
                 Header Content
                 </Text>
                 )}>
                 <View style={{width:width,height:50,backgroundColor:Color.white}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.whitePale}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.red}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.redPale}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.orange}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.orangePale}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.yellow}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.yellowPale}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.green}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.greenPale}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.cyan}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.cyanPale}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.blue}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.bluePale}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.violet}}/>
                 <View style={{width:width,height:50,backgroundColor:Color.violetPale}}/>
                 </ParallaxView>*/}
                <TouchableOpacity activeOpacity={0.9} onPress={()=>{this._click()}}>
                    <Animation ref={animation => { this.animation = animation; }}
                               loop={true} style={{width:width,height:width,backgroundColor:'pink'}}
                               progress={this.state.progress}
                               source={require('../../../common/path/animations/pulse_loader.json')}/>
                </TouchableOpacity>

                <TouchableOpacity style={{width:width,height:50,position:'absolute',bottom:0,backgroundColor:'yellow'}}
                                  onPress={()=>{this.props.navigator.pop()}}/>
            </Animated.View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: width, height: height
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

export default connect(mapStateToProps)(ScrollTest);