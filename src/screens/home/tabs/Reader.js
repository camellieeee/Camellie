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
    ImageBackground,
    Dimensions,
    Platform,
    Animated,
    Easing,
    FlatList
}from 'react-native';
const {width, height}=Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import {px, get, post} from '../../../common/utils';
import Color from '../../../common/Color';
import SafariView from 'react-native-safari-view';

export default class Reader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeInOpacity: new Animated.Value(0),
            reader: [],
            refreshing: false
        }
    }

    componentDidMount() {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear
        }).start();
        this.fetchData()
    }

    fetchData() {
        get('/data/read/it').then(
            data=> {
                var _data = JSON.parse(data);
                if (_data.status == 1 && _data.data != null) {
                    this.setState({
                        reader: _data.data
                    })
                }
            }
        )
    }

    renderItem(item) {
        return (
            <TouchableHighlight
                // onPress={()=>{this.props.navigator.push({screen:'example.ReaderDetail',passProps:{url:item.url}})}}
                onPress={()=>{
                        SafariView.show({
                          url: item.url,
                          tintColor:Color.violet,
                          barTintColor:Color.whitePale
                        });}}
                style={styles.shadow}>
                <ImageBackground
                    style={styles.item}
                    source={{uri:item.img}}>
                    <LinearGradient
                        start={{x: 0.2, y: 0.2}} end={{x: 1, y: 1}}
                        colors={['rgba(0,0,0,0)','rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
                        style={{flex:1}}>
                        <View style={{flex:1}}/>
                        <View
                            style={{backgroundColor:'transparent',alignItems:'flex-end',padding:px(20)}}>
                            <Text style={{fontSize:px(24),color:Color.white,marginTop:px(10)}}>{item.time}</Text>
                            <Text numberOfLines={1} style={{fontSize:px(40),color:Color.whitePale}}>{item.title}</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <Animated.View style={[styles.container,{opacity:this.state.fadeInOpacity}]}>
                <FlatList keyExtractor={(item,index)=>item.id}
                          data={this.state.reader}
                          renderItem={({item})=>this.renderItem(item)}
                          onRefresh={()=>{
                              this.setState({refreshing:true});
                              setTimeout(()=>{this.fetchData();this.setState({refreshing:false})},1500);
                          }}
                          refreshing={this.state.refreshing}
                />
            </Animated.View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        width: width - 20,
        height: px(300),
        backgroundColor: 'transparent',
        borderRadius: px(10)
    },
    shadow: {
        width: width - 20,
        alignSelf: 'center',
        height: px(300),
        marginTop: px(20),
        borderRadius: px(10),
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 5, height: 8
        },
        shadowColor: '#000',
        shadowRadius: 4
    }
});