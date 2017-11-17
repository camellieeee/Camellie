/**
 * Created by turing on 2017/7/31.
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
    ImageBackground
}from 'react-native';
const {width, height}=Dimensions.get('window');
import {connect} from 'react-redux';
import {px} from '../../../../common/utils';
import Color from '../../../../common/Color';
const Screen = Dimensions.get('window');

import Interactable from 'react-native-interactable';
import Pop from '../../../../components/Pop';
import Icon from 'react-native-vector-icons/Ionicons';
import Animation from 'lottie-react-native';

class InteractionTest extends Component {
    static navigatorStyle = {
        navBarHidden: true,
        statusBarTextColorScheme: 'light',
        screenBackgroundColor: Color.whitePale
    };

    constructor(props) {
        super(props);
        this.state = {
            fadeInOpacity: new Animated.Value(0),
            _scrollEnabled: false
        };
        this._deltaY = new Animated.Value(0);
    }

    fetchData() {
    }

    componentDidMount() {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear
        }).start();
        this.animation.play();
        this.animation2.play()
    }

    componentWillUnmount() {
    }


    render() {
        let itemWidth = width - px(150);
        let _this = this;
        return (
            <View style={styles.container}>
                <View style={{width:width,height:px(460)}}>
                    <ImageBackground
                        style={{width:width,height:px(460)}}
                        source={{uri:'http://hiracerapp.oss-cn-hangzhou.aliyuncs.com/test.jpeg'}}/>
                </View>
                {/*<Animated.View style={[styles.filterContainer, {
                 transform: [{
                 translateY: this._deltaY.interpolate({
                 inputRange: [-130, -50],
                 outputRange: [-33, 0],
                 extrapolateRight: 'clamp'
                 })
                 }]
                 }]}>
                 <Animated.View style={[styles.filterTop, {
                 opacity: this._deltaY.interpolate({
                 inputRange: [-90, -20],
                 outputRange: [0, 1],
                 extrapolateLeft: 'clamp',
                 extrapolateRight: 'clamp'
                 })
                 }]}>
                 <TouchableOpacity onPress={() => alert('Tip: drag content up to see the filter collapse')}>
                 <Image style={styles.filterUp} source={require('../../../../../img/icon-up.png')}/>
                 </TouchableOpacity>
                 </Animated.View>

                 <TouchableOpacity onPress={() => {
                 _this.refs['instance'].snapTo({index:0});
                 this._scroll._component.scrollTo({x:0,y:0,animated:true})
                 }}>
                 <View style={styles.filterField}>
                 <Text style={styles.filterFieldText}>Anywhere</Text>
                 </View>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => alert('Anytime pressed')}>
                 <Animated.View style={[styles.filterField, {
                 opacity: this._deltaY.interpolate({
                 inputRange: [-70, -50],
                 outputRange: [0, 1],
                 extrapolateLeft: 'clamp',
                 extrapolateRight: 'clamp'
                 })
                 }]}>
                 <Text style={styles.filterFieldText}>Anytime</Text>
                 </Animated.View>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() => alert('Anything pressed')}>
                 <Animated.View style={[styles.filterField, {
                 opacity: this._deltaY.interpolate({
                 inputRange: [-20, 0],
                 outputRange: [0, 1],
                 extrapolateLeft: 'clamp',
                 extrapolateRight: 'clamp'
                 })
                 }]}>
                 <Text style={styles.filterFieldText}>Anything</Text>
                 </Animated.View>
                 </TouchableOpacity>
                 </Animated.View>*/}
                <View style={styles.filterContainer}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{paddingLeft:20,paddingRight:20}}>
                        <Text style={[styles.panelTitle,{color:'#fff'}]}>San Francisco Airport</Text>
                        <Text style={[styles.panelSubtitle,{color:'#fff'}]}>International Airport - 40 miles away</Text>
                        <Image style={styles.photo} source={require('../../../../../img/airport-photo.jpg')}/>
                        <View style={styles.panelButton}>
                            <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                        </View>
                        <View style={styles.panelButton}>
                            <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                        </View>
                        <View style={styles.panelButton}>
                            <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                        </View>
                        <View style={styles.panelButton}>
                            <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                        </View>
                        <View style={styles.panelButton}>
                            <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                        </View>
                        <View style={styles.panelButton}>
                            <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                        </View>
                        <View style={styles.panelButton}>
                            <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                        </View>
                        <View style={{height:px(180)}}/>
                    </ScrollView>
                    <Interactable.View
                        ref="instance"
                        style={{position:'absolute',top:height-px(640),width:width,height:height-px(460),backgroundColor:'#fff'}}
                        verticalOnly={true}
                        snapPoints={[{y: 0}, {y: -height+px(640)}]}
                        boundaries={{top: -height+px(640)}}//-200
                        animatedValueY={this._deltaY}>
                        <Animated.ScrollView
                            ref={(ref)=>{this._scroll=ref}}
                            scrollEnabled={this._deltaY.interpolate({
                                          inputRange: [-height+px(640),-height+px(690),-30,0],
                                          outputRange: [true,true,false,false],
                                          extrapolateLeft: 'clamp',
                                          extrapolateRight: 'clamp'
                                        })
                                    }>
                            <View style={styles.content}>
                                <Text style={styles.panelTitle}>San Francisco Airport</Text>
                                <Text style={styles.panelSubtitle}>International Airport - 40 miles away</Text>
                                <Image style={styles.photo} source={require('../../../../../img/airport-photo.jpg')}/>
                                <TouchableOpacity
                                    onPress={()=>{}}
                                    style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>Directions</Text>
                                </TouchableOpacity>
                                <View style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                                </View>
                                <View style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                                </View>
                                <View style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                                </View>
                                <View style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                                </View>
                                <View style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                                </View>
                                <View style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                                </View>
                                <View style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                                </View>
                                <View style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                                </View>
                                <View style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                                </View>
                                <View style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                                </View>
                                <View style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                                </View>
                                <View style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>Search Nearby</Text>
                                </View>
                            </View>
                        </Animated.ScrollView>
                        <Animated.View style={[styles.dismissView,{ transform: [{
                                                 translateX: this._deltaY.interpolate({
                                                     inputRange: [-height+px(640),0],
                                                     outputRange: [0, 50],
                                                     extrapolateRight: 'clamp'
                                                     })
                                                    }]
                                                 }]}>
                            <View style={{width:px(2),height:px(60),marginLeft:px(34),backgroundColor:'#aaa'}}/>
                            <TouchableOpacity onPress={()=>{
                                            _this.refs['instance'].snapTo({index:0});
                                            this._scroll._component.scrollTo({x:0,y:0,animated:true})
                                          }}
                                              activeOpacity={0.8}
                                              style={styles.dismiss}>
                                <Animation ref={animation => { this.animation = animation; }}
                                           loop={true}
                                           style={{width:px(70),height:px(70),backgroundColor:Color.white}}
                                    // progress={this.state.progress}
                                           source={require('../../../../common/path/animations/x_pop.json')}/>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View style={[styles.dismissView,{right:0, transform: [{
                                                 translateX: this._deltaY.interpolate({
                                                     inputRange: [-height+px(640),0],
                                                     outputRange: [100, 0],
                                                     extrapolateRight: 'clamp'
                                                     })
                                                    }]
                                                 }]}>
                            <View style={styles.dismiss2}>
                                <Animation ref={animation => { this.animation2 = animation; }}
                                           loop={true}
                                           style={{width:px(180),height:px(180),backgroundColor:'transparent'}}
                                    // progress={this.state.progress}
                                           source={require('../../../../common/path/animations/pulse_loader.json')}/>
                            </View>
                        </Animated.View>
                    </Interactable.View>
                </View>

                <Pop navigator={this.props.navigator}/>

            </View>
        );
        // return (
        //     <Animated.View style={[styles.container,{opacity:this.state.fadeInOpacity}]}>
        //         <View style={{backgroundColor: 'red', height: 250, alignItems: 'center'}}>
        //             <Animated.View style={{
        //                   transform: [
        //                     {
        //                       translateY: this._deltaY.interpolate({
        //                         inputRange: [-150, -150, 0, 0],
        //                         outputRange: [-58, -58, 0, 0]
        //                       })
        //                     },
        //                     {
        //                       scale: this._deltaY.interpolate({
        //                         inputRange: [-150, -150, 0, 0],
        //                         outputRange: [0.35, 0.35, 1, 1]
        //                       })
        //                     }
        //                   ]
        //                 }}>
        //                 <TouchableOpacity
        //                     onPress={()=>{if(Math.abs(this._deltaY._value)>149){this.refs['scroll'].setNativeProps({scrollEnabled:true})}}}
        //                     style={{width: 150, height: 150, backgroundColor: 'blue', borderRadius: 75, marginTop: 50}}/>
        //             </Animated.View>
        //         </View>
        //
        //         <Interactable.View
        //             // dragEnabled={this._deltaY}
        //             onDrag={()=>{if(Math.abs(this._deltaY._value)==150){this.refs['scroll'].setNativeProps({scrollEnabled:true})}}}
        //             verticalOnly={true}
        //             snapPoints={[{y: 0}, {y: -150}]}
        //             boundaries={{top: -150}}
        //             animatedValueY={this._deltaY}>
        //             <ScrollView
        //                 ref="scroll"
        //                 style={{flex:1}}
        //                 scrollEnabled={false}
        //                 style={{left: 0, right: 0, backgroundColor: '#e0e0e0'}}>
        //                 <View style={{width:width,height:100,backgroundColor:'yellow'}}/>
        //                 <View style={{width:width,height:100,backgroundColor:'red'}}/>
        //                 <View style={{width:width,height:100,backgroundColor:'green'}}/>
        //                 <View style={{width:width,height:100,backgroundColor:'yellow'}}/>
        //                 <View style={{width:width,height:100,backgroundColor:'red'}}/>
        //                 <View style={{width:width,height:100,backgroundColor:'yellow'}}/>
        //                 <View style={{width:width,height:100,backgroundColor:'green'}}/>
        //                 <View style={{width:width,height:100,backgroundColor:'yellow'}}/>
        //                 <View style={{width:width,height:100,backgroundColor:'red'}}/>
        //                 <View style={{width:width,height:100,backgroundColor:'green'}}/>
        //             </ScrollView>
        //         </Interactable.View>
        //     </Animated.View>
        // )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'white'
    },
    filterContainer: {
        backgroundColor: '#278485',
        // paddingTop: 10,
        // paddingLeft: 20, paddingRight: 20,
        height: height - px(460)
    },
    filterTop: {
        height: 36
    },
    filterUp: {
        marginLeft: 24,
        width: 26,
        height: 26
    },
    filterField: {
        height: 40,
        backgroundColor: '#3a969a',
        marginHorizontal: 10,
        marginBottom: 10,
        borderRadius: 4,
        justifyContent: 'center'
    },
    filterFieldText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 30
    },
    content: {
        padding: 20,
        backgroundColor: 'white',
        marginBottom: 70
    },
    panelTitle: {
        fontSize: 27,
        height: 35
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10
    },
    panelButton: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#de6d77',
        alignItems: 'center',
        marginVertical: 10
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white'
    },
    photo: {
        width: Screen.width - 40,
        height: 190,
        marginBottom: 20
    },
    dismissView: {
        position: 'absolute',
        right: px(20)
    },
    dismiss: {
        width: px(70),
        height: px(70),
        paddingLeft: px(2),
        borderRadius: px(35),
        backgroundColor: Color.white,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dismiss2: {
        width: px(180),
        height: px(180),
        borderRadius: px(90),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'transparent'
    }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        counter: state.counter
    };
}

export default connect(mapStateToProps)(InteractionTest);