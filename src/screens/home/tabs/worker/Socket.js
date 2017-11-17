/**
 * Created by turing on 2017/10/31.
 */
import React from 'react';
import {View, Text, AsyncStorage, Dimensions} from 'react-native';
import SocketIOClient from 'socket.io-client';
import {GiftedChat} from 'react-native-gifted-chat';
const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';

const USER_ID = '@userId';

class Socket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            userName: null
        };

        this.determineUser = this.determineUser.bind(this);
        this.onReceivedMessage = this.onReceivedMessage.bind(this);
        this.onSend = this.onSend.bind(this);
        this._storeMessages = this._storeMessages.bind(this);

        this.socket = SocketIOClient('http://localhost:3000');
        this.socket.on('message', this.onReceivedMessage);
        this.determineUser();
    }

    /**
     * When a user joins the chatroom, check if they are an existing user.
     * If they aren't, then ask the server for a userId.
     * Set the userId to the component's state.
     * 用户加入
     */
    determineUser() {
        AsyncStorage.getItem('userName').then(
            userName => {
                // If there isn't a stored userId, then fetch one from the server.
                if (!userName) {
                    this.socket.emit('userJoined', null);
                    this.socket.on('userJoined', (userName) => {
                        AsyncStorage.setItem('userName', userName);
                        this.setState({userName});
                    });
                } else {
                    this.socket.emit('userJoined', userName);
                    this.setState({userName});
                }
            })
            .catch((e) => alert(e));
    }

    // Event listeners
    /**
     * When the server sends a message to this.
     * 接受到消息
     */
    onReceivedMessage(messages) {
        this._storeMessages(messages);
    }

    /**
     * When a message is sent, send the message to the server
     * and store it in this component's state.
     * 发送消息
     */
    onSend(messages = []) {
        this.socket.emit('message', messages[0]);
        this._storeMessages(messages);
    }

    // Helper functions
    _storeMessages(messages) {
        // alert(JSON.stringify(messages));
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }

    render() {
        var user = {_id: this.state.userName || -1};

        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={user}
            />
        );
    }
}

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
    return {
        counter: state.counter
    };
}

export default connect(mapStateToProps)(Socket);