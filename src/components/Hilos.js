import React, { Component } from "react";

import { StyleSheet, Alert,TextInput,FlatList,AsyncStorage,TouchableHighlight,View,  ScrollView, Image,ActivityIndicator} from 'react-native';
import { Text,Textarea,CheckBox,ListItem,Button,Body} from 'native-base';


import HTML from 'react-native-render-html';
import moment from 'moment';
import "moment/min/locales";

import Ticket from './Ticket';
import CommentCons from './CommentCons';
import CommentUser from './CommentUser';



export default class Hilos extends Component {

   constructor(props) {
    super(props);
    moment.locale('es');
   

    this.state = {
      hilos: [],
      ticket: {},
      token: '',
      
      chkCerrar: false,
      chkTipo:  false,
      
      respuesta:'',
      tipo: 'e',
      estadoTicket: 'resolución',

      loading: false,


    }

    this.getHilos=this.getHilos.bind(this)
    this.getTicket=this.getTicket.bind(this)
    this.chkCerrarPress=this.chkCerrarPress.bind(this)
    this.chkTipoPress=this.chkTipoPress.bind(this)
    this.responder=this.responder.bind(this)
  }

  // tuve que hacer este bind sino getTickets no reconocia this.state
  //la otra forma es usar la funcion flecha



  componentDidMount() {
   this.checkAuth()
    
  }

  checkAuth() {
      AsyncStorage.getItem('access_token')
        .then((storageToken) => {
          this.setState({ 'token': storageToken })

            fetch('https://soporte.educaciondigitaltuc.gob.ar/api/oauth/user', {
               method: 'GET',
               headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + this.state.token
                }, 
            })
            .then((response) => response.json())
              .then((responseJson) => {

                if(responseJson.data != undefined)
                { 
                   this.getTicket()
                   this.getHilos() 
                }
                else
                { 
                    this.props.navigation.navigate('Login')  
                }
              })
              .catch((error) => {
                console.log('error')
                console.error(error);
              })
        })
}


getTicket(){

  let ticket_id = this.props.navigation.state.params.ticket.toString()

   fetch('https://soporte.educaciondigitaltuc.gob.ar/api/CEL/tickets/'+ticket_id, {
   method: 'GET',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      }, 
  })
  .then((response) => response.json())
    .then((responseJson) => {

       this.setState({ticket: responseJson.data})
    })
    .catch((error) => {
      console.error(error);
    })
  }

  getHilos(){
    let ticket_id = this.props.navigation.state.params.ticket.toString()
    console.log('https://soporte.educaciondigitaltuc.gob.ar/api/CEL/tickets/'+ticket_id+'/hilos')

     fetch('https://soporte.educaciondigitaltuc.gob.ar/api/CEL/tickets/'+ticket_id+'/hilos', {
   method: 'GET',
     headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      }, 
  })
  .then((response) => response.json())
    .then((responseJson) => {
        this.setState({hilos: responseJson.data})
    })
    .catch((error) => {
      console.error(error);
    })
  }

  chkCerrarPress() {

    // resulta q setstate es asyncrono o sea que cambia cuando se le canta el ...
    //por lo tanto usare logica negativa con el valor actual que tenga el estado
    //y al final cambiare el chk
    
     
        if (this.state.chkCerrar== false) {
          this.setState({estadoTicket: 'cerrado'});
        } else {
          this.setState({estadoTicket: 'resolución'});
        }

        this.setState({chkCerrar: !this.state.chkCerrar});      
  }


   chkTipoPress() {

        if (this.state.chkTipo==false) {
          this.setState({tipo: 'i'});
        } else {
          this.setState({tipo: 'e'});
        }
       this.setState({chkTipo: !this.state.chkTipo});
  }
  
responder(){

  if (this.state.respuesta=='' ) {
     Alert.alert(
         'La respuesta no puede ser vacia.'
      )
  }
  else
  {

  this.setState({ 'loading': true })
  let ticket_id = this.props.navigation.state.params.ticket.toString()

  fetch('https://soporte.educaciondigitaltuc.gob.ar/api/CEL/tickets/'+ticket_id+'/hilos', {
      method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.state.token
      }, 
      body: JSON.stringify({
        respuesta: this.state.respuesta,
        tipo: this.state.tipo,
        estadoTicket: this.state.estadoTicket,
      })
  })
   .then(response => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.getHilos()
      this.setState({ 'loading': false })
      this.setState({ 'respuesta': '' })
      this.setState({chkCerrar: false});    
      this.setState({chkTipo: false});    
      this._TextInput.clear()
      // console.log(this._textArea)
      
    })
    .catch((error) => {
      console.error(error);
    })

  }
}


  render() {

    return (
     
          <ScrollView>
                <View style={styles.container} >

                  <Ticket ticket={this.state.ticket}></Ticket>          


                   <FlatList
                        
                        data={this.state.hilos}
                        renderItem={
                        ({item}) => 
                        <View>
                                {this.tipoComment(item)}
                         </View>
                      }
                        keyExtractor={item => item.id.toString()}

                      />


                <View style={styles.respuesta}>
                    
                    <View style={styles.respuestaArea}>
                          <TextInput
                            multiline= {true}
                            style={{borderColor: '#ffcc66', borderWidth: 1}}
                            onChangeText={(respuesta) => this.setState({respuesta})}
                            ref={ (c) => this._TextInput = c }
                  
                          />
                
                         
                    </View>

                     <View style={styles.respuestaButton}>                 

                       {this.showActivity()}                  

                     </View>   
                   
   
                </View>


                 <ListItem>
                          <CheckBox checked={this.state.chkTipo}  onPress={this.chkTipoPress} />
                             <Body>
                         
                          <Text style={styles.textInterno} >Mensaje Interno</Text>
                              </Body>
                              <CheckBox checked={this.state.chkCerrar}  onPress={this.chkCerrarPress} />
                          <Body>
                             <Text style={styles.textCerrar} >Cerrar Ticket</Text>
                          </Body>
                  </ListItem>
                  
                
               

             </View>
         </ScrollView>
       
    
    );
  }

  showActivity() {

      if(this.state.loading)
      {
         return <ActivityIndicator  size="large" color="#0000ff" />  ;
      }
      else
      {
         return <TouchableHighlight style={styles.buttonContainer}  onPress={this.responder} >
                   <Image
                    
                   style={styles.iconSend}
                   source={require('/ticketApp/send.png')}
                   />
                </TouchableHighlight>  ;
      }
      
  }

  

  tipoComment(item) {

      if(item.userPublico=="1")
      {
         return <CommentUser item={item}>   </CommentUser>;
      }
      else
      {
         return <CommentCons item={item}>  </CommentCons>;
      }
      
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#F5FCFF',
  },

  respuesta: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#F5FCFF',
    borderTopWidth: 1,
    borderColor: '#EEE', 
  },

  cerrar: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between'  
  },

  textCerrar: {
    margin: 10,
    fontSize: 14 
  },

  interno: {
    flex: 1,
    flexDirection: 'row',
  },

  textInterno: {
   margin: 10,
   fontSize: 14
  },

  respuestaArea: {
    flex: 4,
    padding: 5,
  },

  respuestaButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  buttonContainer:{
    
  },

  iconSend: { 
    width: 45,
    height: 45
  },

})