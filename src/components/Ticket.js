import React, { Component } from "react";

import { StyleSheet, Alert,FlatList,AsyncStorage,TouchableHighlight,View,  ScrollView, Image} from 'react-native';
import { Text,Textarea, Form,CheckBox,ListItem,Button,Body} from 'native-base';

import HTML from 'react-native-render-html';
import moment from 'moment';
import "moment/min/locales";



export default class Ticket extends Component {

  render() {

   
    return (
     

                  <View style={styles.Container}>

                        <View  style={styles.Header}>

                            <View  style={styles.HeaderLeft}>
                               <Text style={styles.nroTicket}>{this.props.ticket.nroTicket}</Text>
                            </View>

                            <View  style={styles.HeaderRight}>
                                <Text style={styles.estado}>{this.estadoColor(this.props.ticket.estado)}</Text>
                            </View>

                        </View>


                        <View  style={styles.Header2}>

                            <View  style={styles.Header2Up}>
                              <Text style={styles.asunto}>{this.props.ticket.asunto}</Text>
                            </View >

                            <View  style={styles.Header2Down}>

                                  <View  style={styles.Header2DownLeft}>

                                    <Text style={styles.topico}> {
                                    this.props.ticket.ntop}
                                    </Text>
                                  
                                  </View>

                                   <View  style={styles.Header2DownRight}>
                                        <Text style={styles.fecha}>
                                           { moment(this.props.ticket.created_at).format('ll')}
                                        </Text>

                                    </View> 

                             </View>

                         </View>


                       <View  style={styles.Body}>
                          <HTML html={this.props.ticket.cuerpo}  />
                       </View>

                        <View  style={styles.Footer}>

                           <View >
                               <Text style={styles.nombre}> {this.props.ticket.nombre}</Text>
                            </View>

                             <View >
                                <Text style={styles.email}>
                                  {this.props.ticket.email}     
                                </Text>
                             </View >

                             <View >
                                <Text style={styles.telefono}>
                                  {this.props.ticket.telefono}     
                                </Text>
                             </View >

                         </View>

                  </View>
               
               
       
    
    );
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


    


}

 const styles = StyleSheet.create({
 

  Container: {
    flex: 1,
    padding: 5,
    margin: 10, 
    borderWidth: 2,
    borderColor: '#d1cad1',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0   
  },

  Header: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#EEE',  
  },

   HeaderLeft: {
    flex: 1,
   
  },
   HeaderRight: {
    flex: 1,
    alignItems: 'flex-end' 
   
  },

    Header2: {
    flex: 1,
    padding: 5
  },

    Header2Up: {
    flex: 1,
    flexDirection: 'row',
  },

  Header2Down: {
    flex: 1,
    flexDirection: 'row',
  },

  Header2DownLeft: {
    flex: 1, 
  },

  Header2DownRight: {
    flex: 1,
    alignItems: "flex-end",
  },

  
  Body: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#EEE',
  },
    
  Footer: {
    flex: 1,
    alignItems: 'flex-end',
  },

  nroTicket: {   
    fontWeight: 'bold',
    fontSize: 20,
    color: '#46AFC4',  
  },


 
  estadoCerrado: {
    color: '#ff6656',
    fontSize: 14,
  },

   estadoResolucion: {
    color: '#f0ad4e',
    fontSize: 14,
  },

   estadoAbierto: {
    color: '#3C763D',
    fontSize: 14,
  },

  asunto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },

  topico: {
    fontSize: 16, 
    color: '#3D7068'   
  },
  

  fecha: {
    fontSize: 13,
    color: 'slategray'    
  },

  




  nombre:
  {
    fontSize: 12
  },
  
  email: {
    fontSize: 12 
  },
 
 telefono: {
  fontSize: 12
 },

  




  

  name:{
    color: 'red'
  }
 

})