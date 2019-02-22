import React, { Component } from "react";

import { StyleSheet,FlatList,AsyncStorage,View,Text, ScrollView} from 'react-native';


import Ticket from './Ticket';
import CommentCons from './CommentCons';
import CommentUser from './CommentUser';
import Respuesta from './Respuesta';



export default class Hilos extends Component {

   constructor(props) {
    super(props);

    this.state = {
      hilos: [],
      ticket: {},
      token: '',
    }

    this.getHilos=this.getHilos.bind(this)
    this.getTicket=this.getTicket.bind(this)
    this.eventReload=this.eventReload.bind(this)

  }

  // tuve que hacer este bind sino getTickets no reconocia this.state
  //la otra forma es usar la funcion flecha



  componentDidMount() {
   this.getTicket()
  }


getTicket(){

    let ticket_id = this.props.navigation.state.params.ticket.toString()

    AsyncStorage.getItem('access_token')
      .then((storageToken) => {
            this.setState({ 'token': storageToken })
      

             fetch('http://192.168.2.102/tickets/public/api/CEL/tickets/'+ticket_id, {
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
                   this.setState({ticket: responseJson.data})
                   this.getHilos() 
                }
                else
                { 
                    this.props.navigation.navigate('Login')  
                }
              })
              .catch((error) => {
                console.error(error);
              })
    })
  }

  getHilos(){
     let ticket_id = this.props.navigation.state.params.ticket.toString()
  

     fetch('http://192.168.2.102/tickets/public/api/CEL/tickets/'+ticket_id+'/hilos', {
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

   eventReload(){
    this.getHilos()
        
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

                    <Respuesta ticket={this.props.navigation.state.params.ticket.toString()} callbackFromParent={this.eventReload} ></Respuesta>   

             </View>
         </ScrollView>
       
    
    );
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
})