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
    ImageBackground,
    Dimensions,
    Platform,
    Animated,
    Easing,
    ActionSheetIOS,
    Linking
}from 'react-native';
const {width, height}=Dimensions.get('window');
import {connect} from 'react-redux';
import {px} from '../../../../common/utils';
import Color from '../../../../common/Color';
import Carousel from 'react-native-snap-carousel';

import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';

import Interactable from 'react-native-interactable';
import PopupDialog, {DialogTitle, ScaleAnimation, DialogButton} from 'react-native-popup-dialog';
import Pop from '../../../../components/Pop';
import Icon from 'react-native-vector-icons/Ionicons';

const scaleAnimation = new ScaleAnimation();

class Location extends Component {
    static navigatorStyle = {
        navBarHidden: true,
        statusBarTextColorScheme: 'light',
        screenBackgroundColor: Color.whitePale
    };

    constructor(props) {
        super(props);
        this.state = {
            fadeInOpacity: new Animated.Value(0),
            zoom: 15,
            marker: {
                longitude: 120.187232,//data.longitude,经度
                latitude: 30.193955,//data.latitude 纬度
                title: 'Your Company Location'
            },
            data: [
                {
                    title: 'HiRacer',
                    description: 'HiRacer is a very NIUBI`s company',
                    img: 'http://hiracerapp.oss-cn-hangzhou.aliyuncs.com/test.jpeg',
                    longitude: 120.187232,
                    latitude: 30.193955,
                    info: 'HiRacer嗨车手杭州乐速网络科技有限公司旗下汽车运动品牌，致力于推广运动驾驶和赛车文化，使汽车运动普及化、大众化。 Hi Racer 将会以满足运动驾驶爱好者的所有需求为核心目标，提供一个真正属于运动驾驶爱好者自己的平台。'
                },
                {
                    title: 'Home',
                    description: 'Home is a very important place',
                    img: 'http://hiracerapp.oss-cn-hangzhou.aliyuncs.com/test.jpeg',
                    longitude: 120.187232,
                    latitude: 32.193955,
                    info: '故事发生在成都一家姓高的大公馆里，高觉新是这个大家庭里的长孙，就是因为这个缘故，他被剥夺了学业与爱情。在中学毕业那天被迫放弃了自己所爱的能够了解他、安慰他的钱家表姐——钱梅芬，和父亲指定的姑娘结了婚，结婚后，觉新在父亲的安排下进入西蜀实业公司事务所上班，尔后不久父亲死去，觉新成为家中事物的承重者。 觉新的二弟觉民和三弟觉慧就不同了，他们接受西方文化知识的熏陶，有着先进的思想、昂扬的斗志，是新时代的新青年。觉新也跟他俩一起接受新思想，但是他依旧还是“作揖主义”和“无抵抗主义”的拥护者。一日，觉慧和觉民跟往常一样，买了几本新书，来到觉新的办公室里，这时张太太和琴小姐来了。琴是高家亲戚里面最美丽、最活泼的姑娘，她也是一个有着理想、有着抱负的勇敢的新青年。她给大家带来了一个不寻常的消息，钱家大姨妈回省城来了，梅表姐嫁了不到一年就守了寡，婚后变得有点憔悴。这个梅表姐就是大哥觉新所挚爱的钱家表妹，而这时觉新正陪着张太太买衣料，他并没有听到这个消息。 觉慧和觉民离开了觉新的事务所，觉民去了琴的家里，而觉慧在路上遇见同学张惠如，并从他口中了解到当兵的打了学生。觉慧义愤填膺地和一些学生们参加了向总督示威游行的队伍。祖父高老太爷很快知道了他游行的事，便让觉新把他囚禁在家里，为了觉新，觉慧只能留在家里，不久后，他又出去了。'
                }],
            panelTitle: '',
            panelSubtitle: '',
            index: 0,
            distance: '',
            button: ['百度地图', '苹果地图', '取消'],
            origin: {}
        };
        this._deltaY = new Animated.Value(height - 100);
    }

    fetchData() {
    }

    componentDidMount() {
        Animated.timing(this.state.fadeInOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.linear
        }).start();
        Geolocation.getCurrentPosition().then(data=> {
            this.setState({
                zoom: 15,
                origin: {
                    longitude: data.longitude,
                    latitude: data.latitude,
                    title: 'HiRacer'
                }
            })
        });
        this.setState({
            marker: this.state.data[0],
            panelTitle: this.state.data[0].title,
            panelSubtitle: this.state.data[0].description
        });
        this.getDistance(0)
    }

    componentWillUnmount() {
    }

    changeMarker() {
        this.setState({
            marker: {
                longitude: 120.187232,//data.longitude,
                latitude: 35.193955,//data.latitude
                title: 'Your Random'
            }
        })
    }

    _renderItem({item, index}) {
        return (
            <TouchableHighlight activeOpacity={0.8}
                                onPress={()=>{this.scaleAnimationDialog.show()}}
                                style={{width: width - px(150),height: px(400),borderRadius: px(20)}}>
                <ImageBackground style={styles.item}
                                 source={{uri:item.img}}/>
            </TouchableHighlight>
        )
    };

    //获取当前位置距离目标点的位置
    getDistance(index) {
        var _this = this;
        Geolocation.getCurrentPosition().then(data=> {
            var latNow = data.latitude;
            var lngNow = data.longitude;
            var latFocus = _this.state.data[index].latitude;
            var lngFocus = _this.state.data[index].longitude;
            var radLat1 = toRadians(latNow);
            var radLat2 = toRadians(latFocus);
            var deltaLat = radLat1 - radLat2;
            var deltaLng = toRadians(lngNow) - toRadians(lngFocus);
            var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
            _this.setState({
                index: index,
                distance: Math.floor(dis * 6378137 * 100) / 100,
                zoom: 15
            });

            function toRadians(d) {
                return d * Math.PI / 180;
            }
        })
    }

    showActionSheet() {
        let _this = this;
        //直接导航 let baiduUrl = 'baidumap://map/direction?origin=' + this.state.origin.latitude + ',' + this.state.origin.longitude + '&destination=' + this.state.data[this.state.index].latitude + ',' + this.state.data[this.state.index].longitude + '&mode=driving&src=webapp.navi.HiRacer.HiRacer';
        let baiduUrl = 'baidumap://map/marker?location=' + this.state.data[this.state.index].latitude + ',' + this.state.data[this.state.index].longitude + '&title=' + this.state.data[this.state.index].title + '&content=' + this.state.data[this.state.index].description + '&src=webapp.marker.HiRacer.HiRacer';
        let appleUrl = 'maps:http://maps.apple.com/?ll=' + this.state.data[this.state.index].latitude + ',' + this.state.data[this.state.index].longitude;
        ActionSheetIOS.showActionSheetWithOptions({
                options: _this.state.button,
                cancelButtonIndex: 2
            },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        Linking.openURL(baiduUrl);
                        break;
                    case 1:
                        Linking.openURL(appleUrl);
                        break;
                }

                // this.setState({clicked: _this.state.button[buttonIndex]});
            });
    }

    render() {
        let itemWidth = width - px(150);
        var _index = this.state.index;
        var marker = this.state.data[_index];
        return (
            <Animated.View style={[styles.container,{opacity:this.state.fadeInOpacity}]}>
                <View style={[styles.panelContainer]}>
                    {/*<Animated.View style={[styles.panelContainer, {
                     backgroundColor: 'black',
                     opacity: this._deltaY.interpolate({
                     inputRange: [0, height-100],
                     outputRange: [0.5, 0],
                     extrapolateRight: 'clamp'
                     })
                     }]}/>*/}
                    <MapView
                        style={{width:width,height:height-64,position:'absolute',top:0}}
                        // onMapStatusChangeFinish={this._onMapStatusChangeFinish4Android.bind(this)}
                        // onRegionDidChangeAnimated={this._onRegionDidChangeAnimated4Ios.bind(this)}
                        center={marker?marker:this.state.marker}
                        marker={marker?marker:this.state.marker}
                        zoom={this.state.zoom}
                    />
                    <Interactable.View
                        verticalOnly={true}
                        snapPoints={[{y: height-px(980)}, {y: height-px(650)}, {y: height-px(200)}]}
                        boundaries={{top: -100}}//往上拉,卡片顶部距离页面顶部的最高点
                        initialPosition={{y: height-px(200)}}
                        animatedValueY={this._deltaY}>
                        <View style={styles.panel}>
                            <View style={{padding:px(40),paddingBottom:0,width:width,height:px(200)}}>
                                <View style={styles.panelHeader}>
                                    <View style={styles.panelHandle}/>
                                </View>
                                <Text
                                    style={styles.panelTitle}>{marker.title ? marker.title : 'San Francisco Airport'}</Text>
                                <Text
                                    style={styles.panelSubtitle}>{marker.description ? marker.description : 'International Airport - 40 miles away'}</Text>
                            </View>

                            <View style={{width:width,height:px(400),/*position:'absolute',bottom:15*/}}>
                                <Carousel
                                    ref={(carousel) => { this._carousel = carousel; }}
                                    inactiveSlideOpacity={0.85}
                                    removeClippedSubviews={true}
                                    sliderWidth={width}
                                    itemWidth={itemWidth}
                                    onSnapToItem={(index)=>{
                                        this.getDistance(index);
                                    }}
                                    data={this.state.data}
                                    renderItem={this._renderItem.bind(this)}
                                />
                            </View>

                            <View style={{padding:px(40),width:width,height:px(390)}}>
                                <TouchableOpacity onPress={()=>{alert('THANK U')}} style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>LOVE</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{alert('SO SAD')}} style={styles.panelButton}>
                                    <Text style={styles.panelButtonTitle}>HATE</Text>
                                </TouchableOpacity>
                            </View>

                            {/*<ImageBackground style={styles.photo}
                             source={{uri:'https://facebook.github.io/react/img/logo_og.png'}}/>*/}
                        </View>
                    </Interactable.View>
                </View>


                {/*<View style={{width:width,height:100,flexDirection:'row'}}>
                 <TouchableOpacity style={{width:100,height:100,backgroundColor:'pink'}}
                 onPress={()=>{
                 Geolocation.getCurrentPosition().then(data=>{
                 alert(JSON.stringify(data))
                 })
                 }}/>
                 <View style={{width: 100, height: 100}}>
                 <TouchableOpacity style={{width:100,height:50,backgroundColor:'violet'}}
                 onPress={()=>{this.setState({zoom:this.state.zoom+1})}}/>
                 <TouchableOpacity style={{width:100,height:50,backgroundColor:'yellow'}}
                 onPress={()=>{this.setState({zoom:this.state.zoom-1})}}/>
                 </View>
                 <TouchableOpacity style={{width:100,height:100,backgroundColor:'green'}}
                 onPress={()=>{this.changeMarker()}}/>

                 </View>*/}

                <Pop navigator={this.props.navigator}/>

                <View
                    style={{position:'absolute',top:0,right:-width/2+px(50),width:width,height:px(100),transform:[{rotate:'-90deg'}],justifyContent:'center'}}>
                    <Text
                        style={{backgroundColor:'transparent',fontSize:px(38),color:'#000',fontFamily:'SnellRoundhand-Black'}}>{this.state.distance ? this.state.distance : 0}
                        &nbsp;m</Text>
                </View>

                <TouchableOpacity
                    style={{position:'absolute',top:px(64),right:px(32),width:px(100),height:px(100),borderRadius:px(10),backgroundColor:'rgba(255,255,255,0.5)',alignItems:'center',justifyContent:'center'}}
                    onPress={()=>{this.showActionSheet()}}
                >
                    <Icon name="md-navigate" size={px(60)}/>
                </TouchableOpacity>

                <PopupDialog
                    ref={(popupDialog) => {
                    this.scaleAnimationDialog = popupDialog;
                  }}
                    width={width-px(150)}
                    height={height-px(380)}
                    dialogTitle={<DialogTitle title={marker.title} />}
                    dialogAnimation={scaleAnimation}
                    actions={[
                    <DialogButton
                      text="CLOSE"
                      onPress={() => {
                        this.scaleAnimationDialog.dismiss();
                      }}
                      key="button-1"
                    />
                  ]}
                >
                    <ScrollView style={{width:width-px(150)}}>
                        <ImageBackground style={{width: width - px(150),height: px(400)}}
                                         source={{uri:marker.img}}/>
                        <Text
                            style={{fontSize: px(28),color: 'gray',margin:px(30),lineHeight:px(40)}}>{marker.info}</Text>
                    </ScrollView>
                </PopupDialog>
            </Animated.View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: width, height: height
    },
    item: {
        width: width - px(150),
        height: px(400),
        borderRadius: px(20),
        overflow: 'hidden'
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    panel: {
        height: height + 200,
        // padding: 20,
        backgroundColor: '#f7f5eee8',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,
        shadowOpacity: 0.4
    },
    panelHeader: {
        alignItems: 'center'
    },
    panelHandle: {
        width: px(80),
        height: px(16),
        borderRadius: px(8),
        backgroundColor: '#00000040',
        marginBottom: px(20)
    },
    panelTitle: {
        fontSize: px(54),
        height: px(70)
    },
    panelSubtitle: {
        fontSize: px(28),
        color: 'gray',
        height: px(50)
        // marginBottom: 10
    },
    panelButton: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#318bfb',
        alignItems: 'center',
        marginVertical: 10
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white'
    },
    photo: {
        width: width - 40,
        height: 225,
        marginTop: 30
    },
    map: {
        height: height,
        width: width
    }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        counter: state.counter
    };
}

export default connect(mapStateToProps)(Location);