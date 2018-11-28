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

                        <View  style={styles.ticketHeader}>

                            <View  style={styles.ticketHeaderLeft}>
                               <Text style={styles.nroTicket}>{this.props.ticket.nroTicket}</Text>
                            </View>

                            <View  style={styles.ticketHeaderRight}>
                                <Text style={styles.estado}>{this.estadoColor(this.props.ticket.estado)}</Text>
                            </View>

                        </View>


                        <View  style={styles.ticketHeader2}>

                            <View  style={styles.ticketHeader2Up}>
                              <Text style={styles.asunto}>{this.props.ticket.asunto}</Text>
                            </View >

                            <View  style={styles.ticketHeader2Down}>

                                  <View  style={styles.ticketHeader2DownLeft}>

                                    <Text style={styles.topicoTicket}> {
                                    this.props.ticket.ntop}
                                    </Text>
                                  
                                  </View>

                                   <View  style={styles.ticketHeader2DownRight}>
                                        <Text style={styles.fechaTicket}>
                                           { moment(this.props.ticket.created_at).format('ll')}
                                        </Text>

                                    </View> 

                             </View>

                         </View>


                       <View  style={styles.ticketBody}>
                          <HTML html={this.props.ticket.cuerpo}  />
                       </View>

                        <View  style={styles.ticketFooter}>

                           <View >
                               <Text style={styles.nombreTicket}> {this.props.ticket.nombre}</Text>
                            </View>

                             <View >
                                <Text style={styles.emailTicket}>
                                  {this.props.ticket.email}     
                                </Text>
                             </View >

                             <View >
                                <Text style={styles.telefonoTicket}>
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

  ticketHeader: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#EEE',  
  },

   ticketHeaderLeft: {
    flex: 1,
   
  },
   ticketHeaderRight: {
    flex: 1,
    alignItems: 'flex-end' 
   
  },

    ticketHeader2: {
    flex: 1,
    padding: 5
  },

    ticketHeader2Up: {
    flex: 1,
    flexDirection: 'row',
  },

  ticketHeader2Down: {
    flex: 1,
    flexDirection: 'row',
  },

  ticketHeader2DownLeft: {
    flex: 1, 
  },

  ticketHeader2DownRight: {
    flex: 1,
    alignItems: "flex-end",
  },

  fechaTicket: {
    fontSize: 13,
    color: '#EEAC14'    
  },

  topicoTicket: {
    fontSize: 14,    
  },
  
  ticketBody: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#EEE',
  },
    
  ticketFooter: {
    flex: 1,
    alignItems: 'flex-end',
  },

  nombreTicket:
  {
    fontSize: 12
  },
  
  emailTicket: {
    fontSize: 12 
  },
 
 telefonoTicket: {
  fontSize: 12
 },

  nroTicket: {   
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2196F3',  
  },

  estado: {
    fontSize: 14,
    color: '#000',
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
    fontWeight: 'bold',
    color: '#000'
  },

   topico: {
    fontSize: 15,
    color: '#000'
  },

  created: {
    fontSize: 12,
    color: '#777777',
  },

  

  name:{
    color: 'red'
  }
 

})