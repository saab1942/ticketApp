/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight
} from 'react-native';


type Props = {};


export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pass: ''
    };
    // tuve que hacer este bind sino aceptar no reconocia this.state
    //la otra forma es usar la funcion flecha
     this.aceptar=this.aceptar.bind(this);
  }



aceptar(){

  

  fetch('http://10.1.1.202/vuetify/public/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.pass,
      })
  })
  .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);

    })
    .catch((error) => {
      console.error(error);
    })

  

}


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Ingrese Al Sistema
        </Text>
         <Text> Email: </Text>
        <TextInput placeholder="email" onChangeText={(email) => this.setState({email})} />
         <Text> Contraseña: </Text>
        <TextInput placeholder="pass" onChangeText={(pass) => this.setState({pass})} />
        <TouchableHighlight
         style={styles.button}
         onPress={this.aceptar}
        >
         <Text> Ingresar </Text>
        </TouchableHighlight>

     
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
