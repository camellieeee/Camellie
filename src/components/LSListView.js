/**
 * Created by turing on 2017/11/3.
 */
import React, {Component} from 'react';
import {
    ListView,
    Platform,
    TouchableHighlight,
    View,
    Text,
    RefreshControl,
    ActivityIndicator,
    StyleSheet,
    NativeAppEventEmitter,
    Dimensions
} from 'react-native';
import _ from 'lodash';
import {px} from '../common/utils';
const {width, height}=Dimensions.get('window');
import PropTypes from 'prop-types';

// small helper function which merged two objects into one
function MergeRecursive(obj1, obj2) {
    for (var p in obj2) {
        try {
            if (obj2[p].constructor == Object) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);
            } else {
                obj1[p] = obj2[p];
            }
        } catch (e) {
            obj1[p] = obj2[p];
        }
    }
    return obj1;
}

export default class LSListView extends Component {
    constructor(props) {
        super(props);

        let ds = null;

        this._setPage(1);
        this._setRows([]);

        if (this.props.withSections === true) {
            ds = new ListView.DataSource({
                rowHasChanged: this.props.rowHasChanged ? this.props.rowHasChanged : (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            });
            this.state = {
                dataSource: ds.cloneWithRowsAndSections(this._getRows()),
                isRefreshing: false,
                paginationStatus: 'firstLoad',
                isMounted: false
            }
        } else {
            ds = new ListView.DataSource({
                rowHasChanged: this.props.rowHasChanged ? this.props.rowHasChanged : (row1, row2) => row1 !== row2,
            });
            this.state = {
                dataSource: ds.cloneWithRows(this._getRows()),
                isRefreshing: false,
                paginationStatus: 'firstLoad',
                isMounted: false
            }
        }
    }

    static defaultProps = {
        customStyles: {},
        initialListSize: 10,
        firstLoader: true,
        pagination: true,
        refreshable: true,
        refreshableColors: undefined,
        refreshableProgressBackgroundColor: undefined,
        refreshableSize: undefined,
        refreshableTitle: undefined,
        refreshableTitleColor: undefined,
        refreshableTintColor: undefined,
        renderRefreshControl: null,
        headerView: null,
        sectionHeaderView: null,
        scrollEnabled: true,
        withSections: false,
        onFetch(page, callback, options) {
            callback([]);
        },

        paginationFetchingView: null,
        paginationAllLoadedView: null,
        paginationWaitingView: null,
        emptyView: null,
        renderSeparator: null,
        rowHasChanged: null,
        distinctRows: null,
    };

    static propTypes = {
        customStyles: PropTypes.object,
        initialListSize: PropTypes.number,
        firstLoader: PropTypes.bool,
        pagination: PropTypes.bool,
        refreshable: PropTypes.bool,
        refreshableColors: PropTypes.array,
        refreshableProgressBackgroundColor: PropTypes.string,
        refreshableSize: PropTypes.string,
        refreshableTitle: PropTypes.string,
        refreshableTitleColor: PropTypes.string,
        refreshableTintColor: PropTypes.string,
        renderRefreshControl: PropTypes.func,
        headerView: PropTypes.func,
        sectionHeaderView: PropTypes.func,
        scrollEnabled: PropTypes.bool,
        withSections: PropTypes.bool,
        onFetch: PropTypes.func,

        paginationFetchingView: PropTypes.func,
        paginationAllLoadedView: PropTypes.func,
        paginationWaitingView: PropTypes.func,
        emptyView: PropTypes.func,
        renderSeparator: PropTypes.func,

        rowHasChanged: PropTypes.func,
        distinctRows: PropTypes.func,

        renderScrollComponent: PropTypes.func
    };

    _setPage(page) {
        this._page = page;
    }

    _getPage() {
        return this._page;
    }

    _setRows(rows) {
        this._rows = rows;
    }

    _getRows() {
        return this._rows;
    }


    _isMounted = () => {
        return this.state.isMounted;
    };


    //*********************第一次进去加载
    paginationFetchingView = () => {
        if (this.props.paginationFetchingView) {
            return this.props.paginationFetchingView();
        }

        return (
            <View style={[defaultStyles.paginationView, this.props.customStyles.paginationView]}>
                <ActivityIndicator />
            </View>
        );
    };

    //*********************已显示所有数据
    paginationAllLoadedView = () => {
        if (this.props.paginationAllLoadedView) {
            return this.props.paginationAllLoadedView();
        }

        return (
            <View style={{width:width,padding:px(20),alignItems:'center'}}>
                <Text style={{fontSize:px(26),color:'#ccc'}}>-- 我是有底线的 --</Text>
            </View>
        )
    };

    //*********************点击加载更多   //****************已作废
    paginationWaitingView = (paginateCallback) => {
        if (this.props.paginationWaitingView) {
            return this.props.paginationWaitingView(paginateCallback);
        }

        return (
            <TouchableHighlight
                underlayColor='#c8c7cc'
                onPress={paginateCallback}
                style={[defaultStyles.paginationView, this.props.customStyles.paginationView]}
            >
                <Text style={[defaultStyles.actionsLabel, this.props.customStyles.actionsLabel]}>
                    Load more
                </Text>
            </TouchableHighlight>
        );
    };

    //**********************列表头部
    headerView = () => {
        //todo:.........????
        if (this.state.paginationStatus === 'firstLoad' || !this.props.headerView) {
            return null;
        }
        return this.props.headerView();
    };

    //**********************没有数据/空状态
    emptyView = (refreshCallback) => {
        if (this.props.emptyView) {
            return this.props.emptyView(refreshCallback);
        }
        return (
            <View style={{width:width,padding:px(40),alignItems:'center'}}>
                <Text style={{fontSize:px(26),color:'#ccc'}}>暂无数据哦~~</Text>
            </View>
        )
    };

    //**********************每列的分割线
    renderSeparator = () => {
        if (this.props.renderSeparator) {
            return this.props.renderSeparator();
        }

        return (
            <View style={[defaultStyles.separator, this.props.customStyles.separator]}/>
        );
    };

    componentDidMount = () => {
        let _this = this;
        this.state.isMounted = true;
        // this.subscription = NativeAppEventEmitter.addListener('updateComment', _this._onRefresh.bind(this));
        this.props.onFetch(this._getPage(), this._postRefresh.bind(this), {firstLoad: true});
    };

    componentWillUnmount = () => {
        this.state.isMounted = false;
        // this.subscription.remove();
    };

    setNativeProps = (props) => {
        this.refs.listview.setNativeProps(props);
    };

    _refresh = () => {
        this._onRefresh({external: true});
    };

    //*************************数据重新刷新1
    _onRefresh = (options = {}) => {
        if (this._isMounted()) {
            this.setState({
                isRefreshing: true
            });
            this._setPage(1);
            this.props.onFetch(this._getPage(), this._postRefresh.bind(this), options);
            if(this.props.onLocalRefresh){
                this.props.onLocalRefresh();
            }
        }
    };

    //**************************数据重新刷新  回调1
    _postRefresh = (rows = [], options = {}) => {
        if (this._isMounted()) {
            this._updateRows(rows, options);
        }
    };

    //**************************上拉加载更多
    _onPaginate = () => {
        if (this.state.paginationStatus === 'allLoaded' || this.state.paginationStatus === 'firstLoad') {
            return null
        } else {
            this.setState({
                paginationStatus: 'fetching'
            });
            if(this.state.paginationStatus != 'fetching'){
                this.props.onFetch(this._getPage() + 1, this._postPaginate.bind(this), {});
            }
        }
    };

    //**************************上拉加载更多  回调1  数据拼接
    _postPaginate = (rows = [], options = {}) => {
        this._setPage(this._getPage() + 1);
        var mergedRows = null;
        if (this.props.withSections === true) {
            mergedRows = MergeRecursive(this._getRows(), rows);
        } else {
            mergedRows = this._getRows().concat(rows);
        }

        // if(this.props.distinctRows){
        //   mergedRows = this.props.distinctRows(mergedRows);
        // }
        this._updateRows(mergedRows, options);
    };

    //**************************数据重新刷新  回调2
    _updateRows = (rows = [], options = {}) => {
        if (rows !== null) {
            this._setRows(rows);
            var newRows = _.clone(rows);
            if (this.props.withSections === true) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(newRows),
                    isRefreshing: false,
                    paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
                });
            } else {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(newRows),
                    isRefreshing: false,
                    paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
                });
            }
        } else {
            // alert('rows is null');
            this.setState({
                isRefreshing: false,
                paginationStatus: (options.allLoaded === true ? 'allLoaded' : 'waiting'),
            });
        }
    };

    _updateWhichRows = (rows = {}, sectionID, rowID)=> {
        if (rows !== null) {
            if (this.props.withSections === true) {
                var ds = new ListView.DataSource({
                    rowHasChanged: this.props.rowHasChanged ? this.props.rowHasChanged : (row1, row2) => row1 !== row2,
                    sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
                });
                this._setRows(rows);
                this.setState({
                    dataSource: ds.cloneWithRowsAndSections(rows)
                });
            }
        }
    };

    // _renderPaginationView = () => {
    //     if ((this.state.paginationStatus === 'fetching' && this.props.pagination === true) || (this.state.paginationStatus === 'firstLoad' && this.props.firstLoader === true)) {
    //         // console.log(this.state.paginationStatus + '////' + this.props.pagination + '/////' + this.props.firstLoader);
    //         return this.paginationFetchingView();
    //     } else if (this.state.paginationStatus === 'waiting' && this.props.pagination === true && (this.props.withSections === true || this._getRows().length > 0)) {
    //         // console.log(2);
    //         return this.paginationWaitingView(this._onPaginate);
    //     } else if (this.state.paginationStatus === 'allLoaded' && this.props.pagination === true) {
    //         // console.log(3);
    //         return this.paginationAllLoadedView();
    //     } else if (this._getRows().length === 0) {
    //         // console.log(4);
    //         return this.emptyView(this._onRefresh);
    //     } else {
    //         return null;
    //     }
    // }

    //By:LQS
    _renderPaginationView = () => {
        if ((this.state.paginationStatus === 'fetching' && this.props.pagination === true) || (this.state.paginationStatus === 'firstLoad' && this.props.firstLoader === true)) {
            return this.paginationFetchingView();
        } else if (this.state.paginationStatus === 'waiting' && this.props.pagination === true && (this.props.withSections === true || this._getRows().length > 0)) {
            //手动点击加载，改为onEndReached事件自动触发
            //return this.paginationWaitingView(this._onPaginate);
            // return this._onPaginate();//直接调用的话，会在列表分页加载中递归将所有页的内容都加载完(目前是滑动快到底部时自动加载下一页，该行代码注释掉不会有功能影响)
        } else {
            var targetList = [];
            var _rows = this._getRows();
            if (_rows) {//{"Header 1":[]}
                //获取对象中第一个key
                var key = _.findKey(this._getRows());
                if (key) {
                    targetList = this._getRows()[_.findKey(this._getRows())];
                }
            }
            if (this.state.paginationStatus === 'allLoaded' && this.props.pagination === true && /*如果targetList.length为0，则数组数据为空*/targetList.length > 0) {
                return this.paginationAllLoadedView();
            } else if (targetList.length === 0) {
                return this.emptyView(this._onRefresh);
            } else {
                return null;
            }
        }
    };

    renderRefreshControl() {
        if (this.props.renderRefreshControl) {
            return this.props.renderRefreshControl({onRefresh: this._onRefresh});
        }
        return (
            <RefreshControl
                onRefresh={this._onRefresh}
                refreshing={this.state.isRefreshing}
                colors={this.props.refreshableColors}
                progressBackgroundColor={this.props.refreshableProgressBackgroundColor}
                size={this.props.refreshableSize}
                tintColor={this.props.refreshableTintColor?this.props.refreshableTintColor:'#ccc'}
                title={this.props.refreshableTitle?this.props.refreshableTitle:'HiRacer 嗨车手'}
                titleColor={this.props.refreshableTitleColor?this.props.refreshableTitleColor:'#ccc'}
            />
        );
    }

    render() {
        return (
            <ListView
                ref="listview"
                renderScrollComponent={this.props.renderScrollComponent}
                dataSource={this.state.dataSource}
                renderRow={this.props.rowView}
                renderSectionHeader={this.props.sectionHeaderView}
                renderHeader={this.headerView}
                renderFooter={this._renderPaginationView}
                renderSeparator={this.renderSeparator}

                onEndReachedThreshold={100}
                onEndReached={this._onPaginate}

                automaticallyAdjustContentInsets={false}
                scrollEnabled={this.props.scrollEnabled}
                canCancelContentTouches={true}
                refreshControl={this.props.refreshable === true ? this.renderRefreshControl() : null}
                enableEmptySections={this.props.enableEmptySections || true}

                contentContainerStyle={this.props.contentContainerStyle}


                {...this.props}

                style={this.props.style}
            />

        );
    }

}

const defaultStyles = StyleSheet.create({
    separator: {
        height: 10,
        backgroundColor: '#CCC'
    },
    actionsLabel: {
        fontSize: 20,
    },
    paginationView: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    defaultView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    defaultViewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },
})
