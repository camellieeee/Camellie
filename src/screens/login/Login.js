/**
 * Created by turing on 2017/10/22.
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    Dimensions
} from 'react-native';
import {connect} from 'react-redux';
import * as changeAppRoot from '../../reducers/app/actions';
import {px, get, post} from '../../common/utils';
import Color from '../../common/Color';
import {Fumi} from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Toast, {DURATION} from 'react-native-easy-toast'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import _ from 'lodash';

const {width, height} = Dimensions.get('window');
class Login extends Component {
    static navigatorStyle = {
        navBarHidden: true,
        tabBarHidden: true,
        statusBarTextColorScheme: 'light',
        screenBackgroundColor: Color.grey
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            passwordVerify: '',
            register: false
        }
    }

    signIn() {
        post('/data/writeUser', {username: this.state.userName, password: this.state.password}).then(
            data => {
                var _data = JSON.parse(data);
                if (_data.status == 1) {
                    this.props.dispatch(changeAppRoot.login())
                }
            }
        )
    }

    verifyForm() {
        if (_.isEmpty(this.state.userName)) {
            this.refs.toast.show('用户名不能为空');
            this.refs['username'].focus();
        } else if (_.isEmpty(this.state.password)) {
            this.refs.toast.show('密码不能为空');
            this.refs['password'].focus();
        } else if (this.state.password != this.state.passwordVerify) {
            this.refs.toast.show('两次输入的密码不同,请重新输入');
            this.refs['passwordverify'].focus();
        } else {
            this.signIn()
        }
    }

    verifyFormLogin() {
        if (_.isEmpty(this.state.userName)) {
            this.refs.toast.show('用户名不能为空');
            this.refs['username'].focus();
        } else if (_.isEmpty(this.state.password)) {
            this.refs.toast.show('密码不能为空');
            this.refs['password'].focus();
        } else {
            this.props.dispatch(changeAppRoot.login(this.state.userName, this.state.password, this.refs))
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'}
                                     style={{flex:1,backgroundColor:Color.grey}}>
                <Text
                    style={{fontSize:px(60),fontWeight:'bold',color:Color.white,alignSelf:'center',margin:px(100)}}>Camellie</Text>
                <Fumi
                    ref='username'
                    label={'UserName'}
                    iconClass={FontAwesomeIcon}
                    iconName={'slideshare'}
                    iconColor={Color.grey}
                    autoFocus={true}
                    maxLength={18}
                    style={{height:px(132),justifyContent:'center'}}
                    onChangeText={(text)=>{this.setState({userName:text})}}
                />
                <Fumi
                    ref='password'
                    label={'PassWord'}
                    iconClass={FontAwesomeIcon}
                    iconName={'envira'}
                    iconColor={'#f95a25'}
                    maxLength={18}
                    style={{marginTop:10,height:px(132),justifyContent:'center'}}
                    onChangeText={(text)=>{this.setState({password:text})}}
                    secureTextEntry={true}
                />
                {
                    this.state.register &&
                    <Fumi
                        ref='passwordverify'
                        label={'PassWord Verify'}
                        iconClass={FontAwesomeIcon}
                        iconName={'eercast'}
                        iconColor={Color.orangePale}
                        maxLength={18}
                        style={{marginTop:10,height:px(132),justifyContent:'center'}}
                        onChangeText={(text)=>{
                            this.setState({passwordVerify:text})
                        }}
                        secureTextEntry={true}
                    />
                }
                {/*登录注册按钮*/}
                {
                    this.state.register ?
                        <TouchableHighlight underlayColor={Color.greenPale}
                                            onPress={()=>{
                                                this.verifyForm();
                                            }}
                                            style={styles.button}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableHighlight> :
                        <TouchableHighlight underlayColor={Color.greenPale}
                                            onPress={()=>{this.verifyFormLogin()}}
                                            style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableHighlight>
                }
                <View style={{width:width,flexDirection:'row',padding:px(25)}}>
                    {
                        this.state.register ?
                            <Text onPress={()=>{this.setState({register:false})}}
                                  style={{fontSize:px(33),color:Color.white,flex:1}}>去登陆</Text> :
                            <Text onPress={()=>{this.setState({register:true})}}
                                  style={{fontSize:px(33),color:Color.white,flex:1}}>注册</Text>
                    }

                    <Text onPress={()=>{this.setState({register:true})}}
                          style={{fontSize:px(30),color:Color.white}}>忘记密码?</Text>
                </View>

                {/*<Text style={{fontSize:20,color:'yellow'}}>Turing : Hello Camellie</Text>
                 <Text style={{fontSize:20,color:'pink'}}>Camellie : Hello Turing</Text>
                 <Text style={{fontSize:20,color:'pink'}}>{this.props.app.root}</Text>
                 <Text onPress={()=>{this.props.dispatch(changeAppRoot.login())}}
                 style={{fontSize:20,color:'pink'}}>I`m Login</Text>
                 <Text onPress={()=>{this.fetchData()}} style={{fontSize:40,color:'red'}}>POST</Text>*/}
                <Toast ref="toast" position='center'/>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: px(700),
        height: px(100),
        backgroundColor: Color.green,
        borderRadius: px((12)),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: px(50)
    },
    buttonText: {
        fontSize: px(40),
        color: Color.whitePale,
        fontWeight: 'bold'
    }
});

function mapStateToProps(state) {
    return {
        app: state.app
    };
}

export default connect(mapStateToProps)(Login);