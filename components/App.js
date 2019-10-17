import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import TabNavigator from '../LoginForm/Navigation/TabNavigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TabNavigator />
      </Provider>
    );
  }
}
const defaultState = {
  language:'vi',
  banners: [],
  categories: [],
  events: [],
  detailId:0,
  done: "false",
  detail: {
    title: '',
    place: '',
    address: '',
    ward: '',
    district: '',
    state: '',
    from: '',
    to: '',
    description: '',
    avatar: '',
    timeTicket: '',
    priceTicket: '',
    nameTicket: '',
    partnerImg: '',
    partnerName: '',
    partnerDesc: ''
  }

};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'PASS_BANNER':
      return { ...state, banners: action.banners };
    case 'PASS_CATEGORIES':
      return { ...state, categories: action.categories };
    case 'PASS_EVENTS':
      return { ...state, events: action.events };
    case 'NAV':
      return { ...state, detailId: action.detailId };
    case 'CHANGE_LANGUAGE':
      return { ...state, language: action.language };
    case 'TOGGLE_DONE':
      return { ...state, done: action.done };
    case 'PASS_DETAIL':
      return {
        ...state,
        detail: {
          title: action.title,
          place: action.place,
          address: action.address,
          ward: action.ward,
          district: action.district,
          state: action.state,
          description: action.description,
          avatar: action.avatar,
          from: action.from,
          to: action.to,
          timeTicket: action.timeTicket,
          priceTicket: action.priceTicket,
          nameTicket: action.nameTicket,
          partnerImg: action.partnerImg,
          partnerName: action.partnerName,
          partnerDesc: action.partnerDesc
        }
      };

  }
  return state;
}
const store = createStore(reducer);
