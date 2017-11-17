/**
 * Created by turing on 2017/5/13.
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
    FlatList,
    Image
} from 'react-native';
const {width, height}=Dimensions.get('window');
import {connect} from 'react-redux';
import * as changeAppRoot from '../../reducers/app/actions';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollTabBar from '../../components/ScrollTabBar';
import {px, get, post} from '../../common/utils';
import Color from '../../common/Color';
import Reader from './tabs/Reader';
import Lifer from './tabs/Lifer';
import CardView from 'react-native-cardview'

class Home extends Component {
    static navigatorStyle = {
        nabBarHidden: true,
        screenBackgroundColor: Color.whitePale
    };

    constructor(props) {
        super(props);
        this.state = {
            title: 'Reader'
        }
    }

    updateTitle(obj) {
        const {i} = obj;
        let title = '';
        switch (i) {
            case 0:
                title = 'Reader';
                break;
            case 1:
                title = 'Lifer';
                break;
            case 2:
                title = 'Worker';
                break;
            case 3:
                title = 'Camellie';
                break;
        }
        this.setState({
            title: title
        })
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.navbar}>
                    <Text style={styles.title}>{this.state.title}</Text>
                </View>
                <ScrollableTabView
                    onChangeTab={(obj)=>{this.updateTitle(obj)}}
                    renderTabBar={() => <ScrollTabBar style={{backgroundColor:Color.greyPale}}/>}>
                    <Reader
                        navigator={this.props.navigator}
                        tabLabel="ios-bonfire"/>

                    <Lifer
                        navigator={this.props.navigator}
                        tabLabel="ios-boat"/>

                    <ScrollView tabLabel="logo-usd">
                        <CardView cardElevation={2}
                                  cardMaxElevation={5}
                                  cornerRadius={5} style={{margin:10}}>
                            <TouchableHighlight underlayColor="transparent"
                                                onPress={()=>{this.props.navigator.push({screen:'example.Charts'})}}>
                                <Image
                                    style={styles.image}
                                    source={{uri:'http://hiracerapp.oss-cn-hangzhou.aliyuncs.com/test.jpeg'}}/>
                            </TouchableHighlight>
                        </CardView>

                        <CardView cardElevation={2}
                                  cardMaxElevation={5}
                                  cornerRadius={5} style={{margin:10}}>
                            <TouchableHighlight underlayColor="transparent"
                                                onPress={()=>{this.props.navigator.push({screen:'example.Socket'})}}>
                                <Image
                                    style={styles.image}
                                    source={{uri:'http://hiracerapp.oss-cn-hangzhou.aliyuncs.com/test.jpeg'}}/>
                            </TouchableHighlight>
                        </CardView>

                        <CardView cardElevation={2}
                                  cardMaxElevation={5}
                                  cornerRadius={5} style={{margin:10}}>
                            <TouchableHighlight underlayColor="transparent"
                                                onPress={()=>{this.props.navigator.push({screen:'example.Location'})}}>
                                <Image
                                    style={styles.image}
                                    source={{uri:'http://hiracerapp.oss-cn-hangzhou.aliyuncs.com/test.jpeg'}}/>
                            </TouchableHighlight>
                        </CardView>

                        <CardView cardElevation={2}
                                  cardMaxElevation={5}
                                  cornerRadius={5} style={{margin:10}}>
                            <TouchableHighlight underlayColor="transparent"
                                                onPress={()=>{this.props.navigator.push({screen:'example.InteractionTest'})}}>
                                <Image
                                    style={styles.image}
                                    source={{uri:'http://hiracerapp.oss-cn-hangzhou.aliyuncs.com/test.jpeg'}}/>
                            </TouchableHighlight>
                        </CardView>

                        <CardView cardElevation={2}
                                  cardMaxElevation={5}
                                  cornerRadius={5} style={{margin:10}}>
                            <TouchableHighlight underlayColor="transparent"
                                                onPress={()=>{this.props.navigator.push({screen:'example.FontList'})}}>
                                <Image
                                    style={styles.image}
                                    source={{uri:'http://hiracerapp.oss-cn-hangzhou.aliyuncs.com/test.jpeg'}}/>
                            </TouchableHighlight>
                        </CardView>

                        <CardView cardElevation={2}
                                  cardMaxElevation={5}
                                  cornerRadius={5} style={{margin:10}}>
                            <TouchableHighlight underlayColor="transparent"
                                                onPress={()=>{this.props.navigator.push({screen:'example.ScrollTest'})}}>
                                <Image
                                    style={styles.image}
                                    source={{uri:'http://hiracerapp.oss-cn-hangzhou.aliyuncs.com/test.jpeg'}}/>
                            </TouchableHighlight>
                        </CardView>

                        <CardView cardElevation={2}
                                  cardMaxElevation={5}
                                  cornerRadius={5} style={{margin:10}}>
                            <TouchableHighlight underlayColor="transparent"
                                                onPress={()=>{this.props.navigator.push({screen:'example.WebViewTest'})}}>
                                <Image
                                    style={styles.image}
                                    source={{uri:'http://hiracerapp.oss-cn-hangzhou.aliyuncs.com/test.jpeg'}}/>
                            </TouchableHighlight>
                        </CardView>

                        <CardView cardElevation={2}
                                  cardMaxElevation={5}
                                  cornerRadius={5} style={{margin:10}}>
                            <TouchableHighlight underlayColor="transparent"
                                                onPress={()=>{this.props.navigator.push({screen:'example.TimeLine'})}}>
                                <Image
                                    style={styles.image}
                                    source={{uri:'http://hiracerapp.oss-cn-hangzhou.aliyuncs.com/test.jpeg'}}/>
                            </TouchableHighlight>
                        </CardView>

                        <CardView cardElevation={2}
                                  cardMaxElevation={5}
                                  cornerRadius={5} style={{margin:10}}>
                            <TouchableHighlight underlayColor="transparent"
                                                onPress={()=>{this.props.navigator.push({screen:'example.AnimationTest'})}}>
                                <Image
                                    style={styles.image}
                                    source={{uri:'http://hiracerapp.oss-cn-hangzhou.aliyuncs.com/test.jpeg'}}/>
                            </TouchableHighlight>
                        </CardView>

                    </ScrollView>

                    <View tabLabel="logo-freebsd-devil" style={{flex:1}}>
                        <TouchableOpacity activeOpacity={0.8}
                                          onPress={()=>{
                                              this.props.dispatch(changeAppRoot.appInitialized());
                                          }}
                                          style={styles.exitButton}>
                            <Text style={{fontSize:px(40),color:Color.whitePale}}>Exit App</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollableTabView>
                {/*<Text style={{fontSize:20,color:'yellow'}}>Turing : Hello Camellie</Text>
                 <Text style={{fontSize:20,color:'pink'}}>Camellie : Hello Turing</Text>
                 <Text style={{fontSize:20,color:'pink'}}>{this.props.app.root}</Text>
                 <Text onPress={()=>{this.props.dispatch(changeAppRoot.appInitialized())}}
                 style={{fontSize:20,color:'pink'}}>I`m Camellie, I want to login</Text>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    navbar: {
        width: width,
        height: px(150),
        justifyContent: 'center',
        backgroundColor: Color.greyPale,
        paddingLeft: 20,
        paddingTop: px(60)
    },
    title: {
        fontSize: px(42),
        color: Color.whitePale,
        fontFamily: 'Zapfino'
    },
    exitButton: {
        position: 'absolute',
        bottom: 0,
        width: width,
        height: px(100),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.greenPale
    },
    image: {
        width: width - 20, height: px(200), borderRadius: 5
    }
});

function mapStateToProps(state) {
    return {
        app: state.app
    };
}

export default connect(mapStateToProps)(Home);