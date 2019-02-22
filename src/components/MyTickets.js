
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View,FlatList,Alert,AsyncStorage } from 'react-native';
import { List, ListItem } from 'native-base';

import TicketPrev from './TicketPrev';

export default class MyTickets extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tickets: [],  
      token: '' 
    }
    this.getTickets=this.getTickets.bind(this)
  }

  //tuve que hacer este bind sino getTickets no reconocia this.state
  //la otra forma es usar la funcion flecha


  componentDidMount() {
    this.getTickets()
  }

  

  getTickets(){

    AsyncStorage.getItem('access_token')
      .then((storageToken) => {

        this.setState({ 'token': storageToken })

        fetch('http://192.168.2.102/tickets/public/api/CEL/mytickets', {
              method: 'GET',
              headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + this.state.token
              }, 
        })
        .then((response) => response.json())
        .then((responseJson) => {  
              //Si no esta authenticado recibe {message: "Unauthenticated."}
              //El error de autenticacion no pasa por el error sino en el success
              if(responseJson.data != undefined)
              { 
                this.setState({tickets: responseJson.data})
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

 render() {
    return (
      
      <View style={styles.container}>
           
      <List>
              <FlatList
                  
                  data={this.state.tickets}
                  renderItem=
                  {
                        ({item}) => 
                                <ListItem onPress={() => this.props.navigation.navigate('Hilos',{ ticket: item.id})}>
                                   <TicketPrev ticket={item}></TicketPrev>       
                                </ListItem>
                  }
                  keyExtractor={item => item.id.toString()}
              />     
      </List>     
      </View>

    )
  }


}//fin component

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#F5FCFF',
  },

})





