import React, { Component } from "react";

import { StyleSheet, Alert,TextInput,FlatList,AsyncStorage,TouchableHighlight,View,Text, Image,ActivityIndicator} from 'react-native';
import { CheckBox,ListItem,Body} from 'native-base';


export default class Hilos extends Component {

   constructor(props) {
    super(props);

    this.state = {
   
      token: '',
      
      chkCerrar: false,
      chkTipo:  false,
      
      respuesta:'',
      tipo: 'e',
      estadoTicket: 'resolución',

      loading: false,


    }

    this.chkCerrarPress=this.chkCerrarPress.bind(this)
    this.chkTipoPress=this.chkTipoPress.bind(this)
    this.responder=this.responder.bind(this)
    this.emitReload=this.emitReload.bind(this)
  }

  // tuve que hacer este bind sino getTickets no reconocia this.state
  //la otra forma es usar la funcion flecha



 componentDidMount() {
  
    
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

  if (this.state.respuesta!='' ) {

     AsyncStorage.getItem('access_token')
      .then((storageToken) => {

            this.setState({ 'token': storageToken })

            this.setState({ 'loading': true })
            let ticket_id = this.props.ticket.toString()

            console.log(ticket_id)

            fetch('http://192.168.2.102/tickets/public/api/CEL/tickets/'+ticket_id+'/hilos', {
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
              // this.getHilos()
              this.setState({ 'loading': false })
              this.setState({ 'respuesta': '' })
              this.setState({tipo: 'e'});
              this.setState({chkCerrar: false});    
              this.setState({chkTipo: false});    
              this._TextInput.clear()
              this.emitReload()
              
            })
            .catch((error) => {
              console.error(error);
            })
    })

  }
  else
  {
  Alert.alert('La respuesta no puede estar vacia.')
  }

}


  emitReload(){
        this.props.callbackFromParent();
  }

  render() {

    return (
     
        <View> 
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