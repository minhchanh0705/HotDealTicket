import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MainTicket from './MainTicket';
import TicketDetail from './TicketDetail';

const Router = createStackNavigator({
  MainTicket: {
    screen: MainTicket,
    navigationOptions: {header: null}
  },

  TicketDetail: {
    screen: TicketDetail,
    navigationOptions: {header: null}
  }
},
  {
    initialRouteName: 'MainTicket'
  });
export default createAppContainer(Router);