import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from '../LoginScreens/LoginScreen';
import MainScreen from '../LoginScreens/MainScreen';
import RegisterScreen from '../LoginScreens/RegisterScreen';

const Router = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: { header: null }
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: { header: null }
  },
  MainScreen: {
    screen: MainScreen,
    navigationOptions: { header: null }
  }
},
  {
    initialRouteName: 'LoginScreen'
  });
export default createAppContainer(Router);
