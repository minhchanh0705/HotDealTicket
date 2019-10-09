import React, { Component } from 'react';
import Router from './Router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

export default class ToDoList extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
const defaultState = {
  banners: [],
  categories: [],
  events: [],
  detailId: 0,
  done: "false",
  detail: {
    title: '',
    place: '',
    address: '',
    ward:'',
    district:'',    
    state:'',
    from: '',
    to: '',
    description: '',
    avatar: '',
    timeTicket:'',
    priceTicket:'',
    nameTicket:'',
    partnerImg:'',
    partnerName:'',
    partnerDesc:''
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
    case 'TOGGLE_DONE':
      return { ...state, done: action.done };
    case 'PASS_DETAIL':
      console.log('timeTicket: ' + action.timeTicket)
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
          timeTicket:action.timeTicket,
          priceTicket:action.priceTicket,
          nameTicket: action.nameTicket,
          partnerImg:action.partnerImg,
          partnerName:action.partnerName,
          partnerDesc: action.partnerDesc
        }
      };

  }
  return state;
}
const store = createStore(reducer);
