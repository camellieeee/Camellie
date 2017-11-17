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
    Easing
}from 'react-native';
const {width, height}=Dimensions.get('window');
import {connect} from 'react-redux';
import {LSText} from '../../common/LSText';
import LSColor from '../../common/LSColor';
import lspx from '../../common/lspx';

class Home extends Component {
    static navigatorStyle = {
        navBarBackgroundColor: 'rgba(37,37,37,0.5)',
        navBarTextColor: LSColor.yellowPale,
        navBarButtonColor: '#fff',
        statusBarTextColorScheme: 'light',
        screenBackgroundColor: LSColor.whiteBackground
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
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Animated.View style={[styles.container,{opacity:this.state.fadeInOpacity}]}>
                <LSText>hello hiracer</LSText>
                <View style={styles.header}/>
            </Animated.View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: width, height: height
    },
    header: {
        width: width, height: lspx(100),
        backgroundColor: LSColor.yellowPale
    }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        counter: state.counter
    };
}

export default connect(mapStateToProps)(Home);