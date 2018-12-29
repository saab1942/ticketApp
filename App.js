import React, { Component } from 'react';
import { AppRegistry, Text, View, Image } from 'react-native';
import { createStackNavigator,createBottomTabNavigator  } from 'react-navigation';


import Login from './src/components/Login'
import Tickets from './src/components/Tickets'
import MyTickets from './src/components/MyTickets'
import Hilos from './src/components/Hilos'
import test from './src/components/test'




const tabTickets = createBottomTabNavigator(
  {
    Tickets: Tickets,
    MyTickets: MyTickets,
  },

  {
    tabBarOptions: {
      activeTintColor: '#E18F34',
      inactiveTintColor : '#FFFACD',
      labelStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      tabStyle: {
        width: 100,
      },
      style: {
        backgroundColor: '#EDE5A6',
        padding: 12
      },
    }
  }
);


const RootStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Tickets: {
      screen: tabTickets,
    },
    Hilos: {
      screen: Hilos,
    },
     test: {
      screen: test,
    },
  },
  {
    initialRouteName: 'Tickets',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#46AFC4',
      },
      headerTitle: 'Sistema de Ticket',
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold',
      },
    },
  }
);


export default class App extends Component {
  render() {
    return (
   
     <RootStack/>

    );
  }
}