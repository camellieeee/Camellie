/**
 * Created by turing on 2017/9/30.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    AsyncStorage,
    Image
} from 'react-native';
const {width, height}=Dimensions.get('window');
import {connect} from 'react-redux';

class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        return (
            <View>
                <Text>hello world!</Text>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        app: state.app
    };
}

export default connect(mapStateToProps)(Mine);