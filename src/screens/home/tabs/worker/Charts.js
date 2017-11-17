/**
 * Created by turing on 2017/11/16.
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
import {px} from '../../../../common/utils';
import Color from '../../../../common/Color';
import Pop from '../../../../components/Pop';
import {Pie} from 'react-native-pathjs-charts'

class Charts extends Component {
    static navigatorStyle = {
        navBarHidden: true,
        statusBarTextColorScheme: 'light',
        screenBackgroundColor: Color.whitePale
    };

    constructor(props) {
        super(props);
        this.state = {
            fadeInOpacity: new Animated.Value(0),
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

    render() {
        let data = [{
            "name": "Washington",
            "population": 7694980
        }, {
            "name": "Oregon",
            "population": 2584160
        }, {
            "name": "Minnesota",
            "population": 6590667,
            "color": {'r': 223, 'g': 154, 'b': 20}
        }, {
            "name": "Alaska",
            "population": 7284698
        }];

        let options = {
            margin: {
                top: 20,
                left: 20,
                right: 20,
                bottom: 20
            },
            width: 350,
            height: 350,
            color: '#2980B9',
            r: 50,
            R: 150,
            legendPosition: 'topLeft',
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            label: {
                fontFamily: 'Arial',
                fontSize: 8,
                fontWeight: true,
                color: '#ECF0F1'
            }
        };
        return (
            <Animated.View style={[styles.container,{opacity:this.state.fadeInOpacity}]}>
                <Pie data={data}
                     options={options}
                     accessorKey="population"
                     margin={{top: 20, left: 20, right: 20, bottom: 20}}
                     color="#2980B9"
                     pallete={[{'r':25,'g':99,'b':201},
                              {'r':24,'g':175,'b':35},
                              {'r':190,'g':31,'b':69},
                              {'r':100,'g':36,'b':199},
                              {'r':214,'g':207,'b':32},
                              {'r':198,'g':84,'b':45}]}
                     r={50}
                     R={150}
                     legendPosition="topLeft"
                     label={{
            fontFamily: 'Arial',
            fontSize: 8,
            fontWeight: true,
            color: '#ECF0F1'
          }}
                />
                <Pop navigator={this.props.navigator}/>
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

export default connect(mapStateToProps)(Charts);