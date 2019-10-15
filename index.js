import { AppRegistry } from 'react-native';
// import LoginScreencopy from './LoginForm/LoginScreens/LoginScreencopy';
import App from './components/App';
// import App from './App';
import { name as appName } from './app.json';
import React, { Component } from 'react';

export default class HotDeal extends Component {
    render() {
        return <App/>;
        // return <LoginScreencopy/>;
    }
}

AppRegistry.registerComponent(appName, () => App);