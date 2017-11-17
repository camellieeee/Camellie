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
import {px} from '../../../common/utils';
import Color from '../../../common/Color';
import LSListView from '../../../components/LSListView';

export default class Lifer extends Component {
    static navigatorStyle = {
        navBarBackgroundColor: 'rgba(37,37,37,0.5)',
        navBarTextColor: '#f5d500',
        navBarButtonColor: '#fff',
        statusBarTextColorScheme: 'light',
        screenBackgroundColor: '#efefee'
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
                <ScrollView>
                    <View style={{width:width,height:30,backgroundColor:Color.white}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.whitePale}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.red}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.redPale}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.orange}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.orangePale}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.yellow}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.yellowPale}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.green}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.greenPale}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.cyan}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.cyanPale}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.blue}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.bluePale}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.violet}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.violetPale}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.violetPale}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.violetPale}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.violetPale}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.violetPale}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.violetPale}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.violetPale}}/>
                    <View style={{width:width,height:30,backgroundColor:Color.red}}/>
                </ScrollView>
            </Animated.View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: width
    }
});