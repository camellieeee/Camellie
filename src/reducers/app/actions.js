/**
 * Created by turing on 2017/9/30.
 */
import * as types from './actionTypes';
import React, {Component} from 'react';
import {
    AsyncStorage
} from 'react-native';
import {get, post} from '../../common/utils';

export function appInitialized() {
    return async function (dispatch, getState) {
        // since all business logic should be inside redux actions
        // this is a good place to put your app initialization code
        AsyncStorage.multiRemove(['userName','password']);
        dispatch(changeAppRoot('login'));
    };
}

export function changeAppRoot(root) {
    return {type: types.ROOT_CHANGED, root: root};
}

export function login(userName, password, refs) {
    return async function (dispatch, getState) {
        var url = '/data/findByUsernameAndPassword/' + userName + '/' + password;
        get(url).then(
            data => {
                var _data = JSON.parse(data);
                if (_data.status == 1 && _data.data != null) {
                    AsyncStorage.setItem('userId', _data.data.id);
                    AsyncStorage.setItem('userName', _data.data.username);
                    AsyncStorage.setItem('password', _data.data.password);
                    // login logic would go here, and when it's done, we switch app roots
                    dispatch(changeAppRoot('after-login'));
                } else {
                    refs && refs.toast.show('账号或者密码输入错误');
                    refs && refs['username'].focus();
                    // dispatch(changeAppRoot('login'));
                }
            }
        );
    };
}