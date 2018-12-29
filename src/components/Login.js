
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
  Image,
  ActivityIndicator 
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
      token: '',
      loading: false,
    };
    // tuve que hacer este bind sino aceptar no reconocia this.state
    //la otra forma es usar la funcion flecha
     this.login=this.login.bind(this);
  }


  _storeToken = async (value) => {
  try {
    await AsyncStorage.setItem('access_token', value);
  } catch (error) {
    // Error saving data
  }
 }

 



login(){

  if (this.state.email=='' || this.state.pass=='') {
     Alert.alert(
         'Email y/o Contraseña no puede/n estar vacio/s'
      )
  } else 
  {

  // http://10.1.3.10/tickets/public/api/oauth/login
  this.setState({ 'loading': true })
  fetch('https://soporte.educaciondigitaltuc.gob.ar/api/oauth/login', {
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
      // si no esta autorizado devuelve {message: "Unauthorized"}
      //pero entra por success no por error asi que tengo q tomarlo de esta forma
      // console.log(responseJson)
      this.setState({ 'loading': false })

      // {access_token: "eyJ..", token_type: "Bearer", expires_at: "2019-12-06 16:26:46"}
      if(responseJson.access_token != undefined)
        { 
            this._storeToken(responseJson.access_token)
            this.props.navigation.navigate('Tickets')
        }
      else
        // Los errores de validacion tambien entran por aqui
        //{message: "The given data was invalid.", errors: { email: ["El campo email no corresponde con una dirección de e-mail válida."]}}


        {
            Alert.alert(
           'Usuario y/o Contraseña incorrecto/s'
           )

            
        }

    })
    .catch((error) => {
       //el backend nunca devuelve error siempre entra por success
       Alert.alert(
         'Error'
      )

      console.log(error);
    })


  } //else

  

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
                      onChangeText={(email) => this.setState({email})} 
                    />
                   
                    <TextInput 
                      style = {styles.input}    
                      placeholder="Contraseña" 
                      placeholderTextColor='rgba(225,225,225,0.7)'
                      secureTextEntry={true}
                      onChangeText={(pass) => this.setState({pass})} 
                    />

                    {this.showActivity()}
                   

                   

            </View>

     
      </View>
    );
  }

  showActivity() {

      if(this.state.loading)
      {
         return <ActivityIndicator  size="large" color="#0000ff" />  ;
      }
      else
      {
         return  <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
                        <Text style={styles.buttonText}> Ingresar </Text>
                    </TouchableOpacity >  ;
      }
      
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
