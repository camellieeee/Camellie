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
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from '../../../../components/DefaultTabBar';
// import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';

const interpolate = (value, opts) => {
    const x = value.interpolate(opts);
    x.toJSON = () => x.__getValue();
    return x;
};

const FirstRoute = ()=><View style={{width:width,height:1000,backgroundColor:'red'}}/>;
const SecondRoute = ()=><View style={{width:width,height:500,backgroundColor:'yellow'}}/>;

class AnimationTest extends Component {
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
            index: 0,
            fadeInOpacity: new Animated.Value(0),
            scrollY: new Animated.Value(0),
            pageHeight: [0, 0],
            pageNumber: 0
        };
        this._animatedValue = new Animated.Value(-100);
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

    animatedFun(bool) {
        Animated.timing(this._animatedValue, {
            toValue: 64,
            duration: 0,
            easing: Easing.linear
        }).start();
    }

    _onScroll(e) {
        const {scrollY} = this.state;
        const {nativeEvent: {contentOffset: {y: offsetY}}} = e;
        scrollY.setValue(offsetY);
        console.log(scrollY._value);
    }

    // _renderScene = SceneMap({
    //     '1': FirstRoute,
    //     '2': SecondRoute,
    // });

    // _renderHeader = props => <TabBar {...props} />;

    // _handleChangeTab = index => this.setState({ index });

    getPageHeight(e, index) {
        let {nativeEvent:{layout:{height}}}=e;
        this.state.pageHeight[index] = height;
        let arr = this.state.pageHeight.slice();
        this.setState({
            pageHeight: arr
        })
    }

    render() {
        var _opacityAnimation = this._animatedValue.interpolate({
            inputRange: [-100, 64],
            outputRange: [1, .2],
            extrapolate: 'clamp'
        });
        this._bgColorAnimation = _opacityAnimation.interpolate({
            inputRange: [.2, 1],
            outputRange: ['rgba(0,0,0,1)', 'rgba(255,255,255,1)']
        });
        return (
            <Animated.View style={[styles.container,{opacity:this.state.fadeInOpacity}]}>
                <ParallaxScrollView
                    backgroundColor="#ccc"
                    contentBackgroundColor="pink"
                    parallaxHeaderHeight={300}
                    // onChangeHeaderVisibility={(bool)=>{this.animatedFun(bool)}}
                    renderStickyHeader={()=>
                        <View style={{width:width,height:64,backgroundColor:'red'}}>
                            <Text>world hello</Text>
                        </View>}
                    stickyHeaderHeight={64}
                    renderForeground={() => (
                         <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Hello World!</Text>
                         </View>
                     )}
                    scrollEventThrottle={16}
                    onScroll={this._onScroll.bind(this)}>
                    <ScrollableTabView
                        renderTabBar={() => <DefaultTabBar activeTextColor="#fff" scrollY={this.state.scrollY}
                        underlineStyle={{backgroundColor:'#f5d500'}}
                        style={{borderBottomWidth:2/750*width,borderBottomColor:'rgb(37,37,37)',backgroundColor:'red'}}
                        textStyle={{fontSize:26/750*width,marginTop:20/750*width}}/>}

                        onChangeTab={(e)=>{this.setState({pageNumber:e.i})}}
                        style={{width:width,height:this.state.pageHeight[this.state.pageNumber]}}>
                        <View tabLabel="A" onLayout={(e)=>{this.getPageHeight(e,0)}}
                              style={{width:width,height:1000,backgroundColor:'violet'}}>
                        </View>
                        <View tabLabel="B" onLayout={(e)=>{this.getPageHeight(e,1)}}
                              style={{width:width,height:500,backgroundColor:'pink'}}>
                        </View>
                    </ScrollableTabView>
                </ParallaxScrollView>
                <Animated.View style={{
                        transform: [{
                          translateY: this.state.scrollY.interpolate({
                            inputRange: [236, 236],
                            outputRange: [-100, 64],
                            extrapolate: 'clamp'
                          })
                        }],
                    width:width,height:50,position:"absolute",top:0,backgroundColor:'red',flexDirection:'row'}}>
                    <View style={{flex:1,height:50,alignItems:'center',justifyContent:'center'}}>
                        <Text>A</Text>
                    </View>
                    <View style={{flex:1,height:50,alignItems:'center',justifyContent:'center'}}>
                        <Text>B</Text>
                    </View>
                </Animated.View>
                {/*<ParallaxScrollView
                 backgroundColor="#ccc"
                 contentBackgroundColor="pink"
                 parallaxHeaderHeight={300}
                 // onChangeHeaderVisibility={(bool)=>{this.animatedFun(bool)}}
                 renderStickyHeader={()=>{
                 <View style={{width:width,height:64,backgroundColor:'red'}}><Text>world hello</Text></View>
                 }}
                 stickyHeaderHeight={64}
                 renderForeground={() => (
                 <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                 <Text>Hello World!</Text>
                 </View>
                 )}>
                 <View style={{ height: 800 }}>
                 <Text>Scroll me</Text>
                 </View>
                 </ParallaxScrollView>*/}
                {/*<Animated.View style={{width:100,height:100,opacity:_opacityAnimation,backgroundColor:this._bgColorAnimation,left: this._animatedValue.x}}/>
                 <TouchableOpacity onPress={()=>{this.animatedFun()}} style={{width:50,height:50,backgroundColor:'red'}} />*/}
                <TouchableOpacity style={{width:width,height:60,backgroundColor:'yellow'}}
                                  onPress={()=>{this.props.navigator.pop()}}/>
                <Animated.View
                    style={{width:width,height:100,opacity:_opacityAnimation,backgroundColor:this._bgColorAnimation,position:'absolute',top: this._animatedValue}}/>
            </Animated.View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
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

export default connect(mapStateToProps)(AnimationTest);