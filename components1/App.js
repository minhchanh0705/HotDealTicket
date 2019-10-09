import React, { Component } from 'react';
import Router from './Router';
import { Provider } from 'react-redux';
import store from '../redux/store'

export default class ToDoList extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
 
