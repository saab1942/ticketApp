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
  TouchableHighlight,
  TouchableOpacity ,
  Alert,
  AsyncStorage,
  Image 
} from 'react-native';





export default class Login extends Component {

  constructor(props) {
     //When implementing the constructor for a React.Component subclass, 
     //you should call super(props) before any other statement. Otherwise, 
     //this.props will be undefined in the constructor, which can lead to bugs.
    super(props);
    this.state = {
      email: '',
      pass: '',
      token: ''
    };
    // tuve que hacer este bind sino aceptar no reconocia this.state
    //la otra forma es usar la funcion flecha
     this.login=this.login.bind(this);
  }

  componentDidMount() {
    this.checkAuth()
  }

  checkAuth() {
      AsyncStorage.getItem('access_token')
        .then((storageToken) => {
          this.setState({ 'token': storageToken })
          console.log(storageToken)

         

            fetch('http://10.1.1.241/tickets/public/api/oauth/user', {
               method: 'GET',
               headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + this.state.token
                }, 
            })
            .then((response) => response.json())
              .then((responseJson) => {
                console.log('success')


                console.log(responseJson)
                console.log(responseJson.data)
                if(responseJson.data != undefined)
                {
                  console.log('estas authenticado' + storageToken)

                 
                  this.props.navigation.navigate('Tickets')
                }
                else
                {
                   console.log('debes logearte')
                   this.setState({ 'token': '' })
                }
               

              })
              .catch((error) => {
                console.log('error')
                console.error(error);
              })
        })

 


  }

  _storeToken = async (value) => {
  try {
    await AsyncStorage.setItem('access_token', value);
  } catch (error) {
    // Error saving data
  }
 }

 



login(){


  fetch('http://10.1.1.241/tickets/public/api/oauth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
       
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.pass,
      })
  })
   .then(response => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this._storeToken(responseJson.access_token)
      this.props.navigation.navigate('Ticket')
      // this.props.navigation.navigate('Ticket',{access_token: access_token})

    })
    .catch((error) => {
      console.error(error);
    })



  

}


  render() {
    return (
      <View style={styles.container}>

        <View style={styles.loginContainer}>
                   <Image
                   resizeMode="contain" 
                   style={styles.logo}
                   source={require('/ticketApp/soporte.jpg')}
          
          
        />


                
         </View>

            <View style={styles.formContainer}>
                             
                    <TextInput  
                    style = {styles.input}   
                    placeholder="Email"
                    placeholderTextColor='rgba(225,225,225,0.7)'
                    keyboardType='email-address'
                     onChangeText={(email) => this.setState({email})} />
                   
                    <TextInput 
                     style = {styles.input}    
                     placeholder="Contraseña" 
                    placeholderTextColor='rgba(225,225,225,0.7)'
                     onChangeText={(pass) => this.setState({pass})} />
                   

                    <TouchableOpacity 
                     style={styles.buttonContainer} 
                     onPress={this.login}
                    >
                     <Text style={styles.buttonText}> Ingresar </Text>
                    </TouchableOpacity >

            </View>

       

     
      </View>
    );
  }
}

const styles = StyleSheet.create({
   container: {
        flex: 1,
        backgroundColor: '#3BA4ED',
    },
    loginContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 200,
        height: 200
    },
     formContainer: {
     padding:40
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },

    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '800'
    }



});
