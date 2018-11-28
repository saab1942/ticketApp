
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View,FlatList,Alert,AsyncStorage } from 'react-native';
import { List, ListItem } from 'native-base';

import moment from 'moment';
import "moment/min/locales";




export default class Tickets extends Component {

  constructor(props) {
    super(props);
    moment.locale('es');

    this.state = {
      tickets: [],  
      token: '' 
    }
    this.getTickets=this.getTickets.bind(this)
    this.estadoColor=this.estadoColor.bind(this)
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

                if(responseJson.data != undefined)
                { 
                  this.getTickets()
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

  getTickets(){

      fetch('http://10.1.1.241/tickets/public/api/CEL/tickets', {
       method: 'GET',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.state.token
          }, 
      })
      .then((response) => response.json())
        .then((responseJson) => {   
          this.setState({tickets: responseJson.data})
        })
        .catch((error) => {
          console.error(error);
        })
  }


  render() {
    return (
      <View style={styles.container}>
           
      <List>
               <FlatList
                  
                  data={this.state.tickets}
                  renderItem={
                  ({item}) => 

                  <ListItem onPress={() => this.props.navigation.navigate('Hilos',{ ticket: item.id})}>

                   <View  style={styles.ticketContainer} >
                   
                         <View  style={styles.leftTicket} >
                            <Text style={styles.nroTicket}>{item.nroTicket}</Text>

                            <Text> {this.estadoColor(item.estado)} </Text>

                          
                             
                           
                        </View>

                        <View  style={styles.rigthTicket} >

                            <Text style={styles.asunto}> {item.asunto}</Text>
                            <Text style={styles.topico}> {item.ntop}</Text>

                            <Text style={styles.created}>
                            {moment(item.created_at).format('ll')} 
                            </Text>
                             
                       </View>
                     
                    </View>

                    </ListItem>
   
                }
                  keyExtractor={item => item.id.toString()}

                />

            

           
      </List>     
      </View>

        

    )
  }




  estadoColor(estado) {

        if(estado=='cerrado'){
                return <Text style={styles.estadoCerrado}> {estado} </Text>;
        }

        if(estado =='resolución'){
                return <Text style={styles.estadoResolucion}> {estado} </Text>;
        }

        if(estado=='abierto'){
                return <Text style={styles.estadoAbierto}> {estado} </Text>;
        }
       
    }


}//fin component

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#F5FCFF',
  },

   ticketContainer: {
     
    flex: 1,
    flexDirection: 'row',
    
    justifyContent: "space-between",
    
    alignItems:"center",
    paddingRight: 5
  },


  leftTicket:
  {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center' 

  },
  
 
  rigthTicket: {
    flex: 8,
  
  },


 
  nroTicket: {
    

    fontWeight: 'bold',
    fontSize: 16,
    color: '#2196F3',
    
  },

  asunto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },

   topico: {
    fontSize: 14,
    color: '#000'
  },

  estado: {
    fontSize: 12,
    color: '#BBB',
  },


  created: {
    fontSize: 12,
    color: '#EEAC14',
  },

  estadoCerrado: {
    color: '#ff6656',
    fontSize: 10,
  },

   estadoResolucion: {
    color: '#f0ad4e',
    fontSize: 10,
  },

   estadoAbierto: {
    color: '#3C763D',
    fontSize: 10,
  },

  
  
})





