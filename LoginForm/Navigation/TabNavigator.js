import React from 'react';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginScreen from '../LoginScreens/LoginScreen';
import RegisterScreen from '../LoginScreens/RegisterScreen';
import MainScreen from '../LoginScreens/MainScreen';
import { createStackNavigator, HeaderBackButton, HeaderTitle } from "react-navigation-stack";
import MainTicket from '../../components/Ticket/MainTicket';
import TicketDetail from '../../components/Ticket/TicketDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TicketStack = createStackNavigator({
  MainTicket: { screen: MainTicket },
  TicketDetail: { screen: TicketDetail }
});

const LoginStack = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  RegisterScreen: { screen: RegisterScreen },
  MainScreen: { screen: MainScreen }
});

export default createAppContainer(createBottomTabNavigator(
  {
    Ticket: { screen: TicketStack },
    Login: { screen: LoginStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Ticket') {
          iconName = `ios-home`;
        } else if (routeName === 'Login') {
          iconName = `ios-person`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    }
  },

));