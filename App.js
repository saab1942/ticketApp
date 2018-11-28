import React, { Component } from 'react';
import { AppRegistry, Text, View, Image } from 'react-native';
import { createStackNavigator  } from 'react-navigation';


import Login from './src/components/Login'
import Tickets from './src/components/Tickets'
import Hilos from './src/components/Hilos'
import Index from './src/components/Index'
import test from './src/components/test'


const RootStack = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Tickets: {
      screen: Tickets,
    },
    Hilos: {
      screen: Hilos,
    },
     Index: {
      screen: Index,
    },
     test: {
      screen: test,
    },
  },
  {
    initialRouteName: 'Tickets',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3BA4ED',
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