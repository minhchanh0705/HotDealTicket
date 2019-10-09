import { AppRegistry } from 'react-native';
// import App from './components/App';
// import App from './LoginForm/App';
import App from './src/App';
import { name as appName } from './app.json';
import React, { Component } from 'react';

export default class ToDoList extends Component {
    render() {
        return <App />;
    }
}

AppRegistry.registerComponent(appName, () => App);