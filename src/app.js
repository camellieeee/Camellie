/**
 * Created by turing on 2017/9/30.
 */
import {
    AsyncStorage
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import * as reducers from './reducers';
import * as appActions from "./reducers/app/actions";
import {registerScreens} from './screens';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

registerScreens(store, Provider);

export default class App {
    constructor() {
        store.subscribe(this.onStoreUpdate.bind(this));
        AsyncStorage.getItem('userName').then(
            userName=> {
                if (!userName) {
                    store.dispatch(appActions.appInitialized());
                } else {
                    AsyncStorage.getItem('password').then(
                        password=> {
                            store.dispatch(appActions.login(userName, password));
                        }
                    )
                }
            }
        )
    }

    onStoreUpdate() {
        const {root} = store.getState().app;
        // console.log(root);
        // console.log(this.currentRoot);
        if (this.currentRoot != root) {
            this.currentRoot = root;
            this.startApp(root);
        } else {
            this.currentRoot = root;
            this.startApp(root);
        }
        // this.startApp('after-login');
    }

    startApp(root) {
        switch (root) {
            case 'login':
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'example.Login',
                        title: 'Login',
                        navigatorStyle: {}
                    }
                });
                return;
            case 'after-login':
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: 'example.Home',
                        title: 'Home',
                        navigatorStyle: {
                            navBarHidden: true
                        }
                    }
                });
                return;
            default:
                // console.error('Unknown app root');
        }
    }
}