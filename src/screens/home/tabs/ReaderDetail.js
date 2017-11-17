/**
 * Created by turing on 2017/5/20.
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
import {px} from '../../../common/utils';
import Color from '../../../common/Color';
import Placeholder from 'rn-placeholder';

class ReaderDetail extends Component {
    static navigatorStyle = {
        navBarBackgroundColor: Color.greyPale,
        navBarTextColor: Color.yellowPale,
        navBarButtonColor: Color.whitePale,
        statusBarTextColorScheme: 'light',
        screenBackgroundColor: '#fff'
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
        this.fetchData();
        setTimeout(()=>{this.setState({isReadyImageContent:true})},5000)
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Animated.View style={[styles.container,{opacity:this.state.fadeInOpacity}]}>
                <Placeholder.Paragraph
                    lineNumber={10}
                    textSize={24}
                    lineSpacing={10}
                    color="#dedede"
                    width="100%"
                    lastLineWidth="70%"
                    firstLineWidth="50%"
                    onReady={this.state.isReadyImageContent}
                >
                </Placeholder.Paragraph>
                <View style={{position:'absolute',top:0,backgroundColor:'transparent',width:width,height:height}}>
                    <WebView style={{backgroundColor:'transparent'}} source={{uri:'https://github.com/adbayb/react-native-android-kit'/*this.props.url*/}}/*startInLoadingState={true}*/
                             renderError={()=>{<Text style={{color:'red',fontSize:50}}>hello world</Text>}}
                    />
                </View>

            </Animated.View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        app: state.app
    };
}

export default connect(mapStateToProps)(ReaderDetail);