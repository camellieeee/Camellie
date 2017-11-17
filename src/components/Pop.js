/**
 * Created by turing on 2017/11/7.
 */
import React, {Component} from 'react';
import {
    TouchableOpacity,
}from 'react-native';
import {px} from '../common/utils';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Pop extends Component {
    render() {
        return (
            <TouchableOpacity
                onPress={()=>{this.props.navigator.pop()}}
                style={{position:'absolute',top:px(64),left:px(32),width:px(70),height:px(70),borderRadius:px(35),alignItems:'center',justifyContent:'center',backgroundColor:'rgba(255,255,255,0.4)'}}>
                <Icon name="ios-arrow-back" size={px(50)} style={{marginRight:px(6),marginTop:px(2)}}/>
            </TouchableOpacity>
        )
    }
}