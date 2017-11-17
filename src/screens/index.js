/**
 * Created by turing on 2017/9/30.
 */
import {Navigation} from 'react-native-navigation';

import Home from './home/Home';
import Mine from './mine/Mine';
import Login from './login/Login';
import ReaderDetail from './home/tabs/ReaderDetail';
import InteractionTest from './home/tabs/worker/InteractionTest';
import FontList from './home/tabs/worker/FontList';
import WebViewTest from './home/tabs/worker/WebViewTest';
import Location from './home/tabs/worker/Location';
import TimeLine from './home/tabs/worker/TimeLine';
import Socket from './home/tabs/worker/Socket';
import Charts from './home/tabs/worker/Charts';

import AnimationTest from './home/tabs/worker/AnimationTest';
import ScrollTest from './home/tabs/ScrollTest';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('example.Home', ()=>Home, store, Provider);
    Navigation.registerComponent('example.Mine', ()=>Mine, store, Provider);
    Navigation.registerComponent('example.Login', ()=>Login, store, Provider);
    Navigation.registerComponent('example.ReaderDetail', ()=>ReaderDetail, store, Provider);
    Navigation.registerComponent('example.InteractionTest', ()=>InteractionTest, store, Provider);
    Navigation.registerComponent('example.FontList', ()=>FontList, store, Provider);
    Navigation.registerComponent('example.WebViewTest', ()=>WebViewTest, store, Provider);
    Navigation.registerComponent('example.Location', ()=>Location, store, Provider);
    Navigation.registerComponent('example.TimeLine', ()=>TimeLine, store, Provider);
    Navigation.registerComponent('example.Socket', ()=>Socket, store, Provider);
    Navigation.registerComponent('example.Charts', ()=>Charts, store, Provider);

    Navigation.registerComponent('example.ScrollTest', ()=>ScrollTest, store, Provider);
    Navigation.registerComponent('example.AnimationTest', ()=>AnimationTest, store, Provider);
}