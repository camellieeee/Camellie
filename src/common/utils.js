/**
 * Created by turing on 2017/5/13.
 */
import React, {Component} from 'react';
import {
    Dimensions
}from 'react-native';
const scale = Dimensions.get('window').width / 750;

module.exports = {
    px(size:number): number{
        return Math.round(scale * size);
    },

    post(uri, params = {}) {
        let formdata = new FormData();
        for (var key in params) {
            formdata.append(key, params[key]);
        }
        if (formdata._parts.length == 0) {//Multipart body must have at least one part.
            formdata.append("key", "value");
        }
        return fetch('http://114.115.218.220:8080' + uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded'
                // 'Content-Type': 'multipart/form-data'//兼容Android okhttp网络组件
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
            timeout: 10000,
        }).then(response=>response.text())
    },

    //114.115.218.220:8080
    get(uri) {
        return fetch('http://114.115.218.220:8080' + uri, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded'
                'Content-Type': 'multipart/form-data'//兼容Android okhttp网络组件
            },
            timeout: 10000,
        }).then(response=>response.text())
    }
};