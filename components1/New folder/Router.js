import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import MainTicket from './MainTicket';
import TicketDetail from './TicketDetail';
import EventsByCategory from './EventsByCategory';

const Router = createStackNavigator({

    MainTicket: {
        screen: MainTicket,
        navigationOptions: { header: null }
    },
    TicketDetail: {
        screen: TicketDetail,
        navigationOptions: { header: null }
    }
},
    {
        initialRouteName: 'MainTicket'
    });
export default createAppContainer(Router);