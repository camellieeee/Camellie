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
import Timeline from 'react-native-timeline-listview';

class TimeLine extends Component {
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
        };
        this.data = [
            {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ', circleColor: '#009688',lineColor:'#009688'},
            {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
            {time: '12:00', title: 'Lunch'},
            {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688'},
            {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688'}
        ]
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
                <Timeline
                    style={styles.list}
                    data={this.data}
                    circleSize={20}
                    circleColor='rgb(45,156,219)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{minWidth:52, marginTop: -5}}
                    timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                    descriptionStyle={{color:'gray'}}
                    options={{
            style:{paddingTop:5}
          }}
                />
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
    },
    list: {
        flex: 1,
        marginTop:20,
    },
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        counter: state.counter
    };
}

export default connect(mapStateToProps)(TimeLine);