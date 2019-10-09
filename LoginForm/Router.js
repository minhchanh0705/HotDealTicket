import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import RegisterScreen from './RegisterScreen';

const Router = createStackNavigator({
    LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {header: null}
  },
  RegisterScreen: {
    screen: RegisterScreen,
    navigationOptions: {header: null}
  }, 
  MainScreen: {
    screen: MainScreen,
    navigationOptions: {header: null}
  }
},
  {
    initialRouteName: 'LoginScreen'
  });
export default createAppContainer(Router);
