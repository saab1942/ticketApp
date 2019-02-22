import React, { Component } from "react";
import { StyleSheet,View,Text} from 'react-native';


import moment from 'moment';
import "moment/min/locales";


export default class TicketPrev extends Component {

  constructor(props) {
    super(props);
    moment.locale('es');

    this.estadoColor=this.estadoColor.bind(this)
   
  }

  render() {

   
    return (

    <View style={styles.container}>
     
      <View style={styles.ticketContainer} >
                   
            <View  style={styles.leftTicket} >
                <Text style={styles.nroTicket}>{this.props.ticket.nroTicket}</Text> 
            </View>

            <View  style={styles.rigthTicket} >

                <Text style={styles.asunto}> {this.props.ticket.asunto}</Text>
                <Text style={styles.topico}> {this.props.ticket.ntop}</Text>

                                   
                <View  style={styles.rigthTicketFooter} >
                                      
                      <View  style={styles.rigthTicketFooterL} >
                         <Text style={styles.created}>{moment(this.props.ticket.created_at).format('ll')} </Text>
                      </View>
                                     
                      <View  style={styles.rigthTicketFooterR} >
                          <Text> {this.estadoColor(this.props.ticket.estado)} </Text>
                      </View>

                </View>

            </View>
                     
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
     
  },
  
  rigthTicket: {
    flex: 8,
  },

  rigthTicketFooter:
  {
    flex: 1,
    flexDirection: 'row'
  },

   rigthTicketFooterL:
  {
    flex: 1,
  },
 
  rigthTicketFooterR:
  {
    flex: 1,
    alignItems: 'flex-end' 
  },
 
 
  nroTicket: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#03768C',  
  },

  asunto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },

  topico: {
    fontSize: 14,
    color: '#3D7068'
  },

  estado: {
    fontSize: 14,
    color: '#BBB',
  },

  created: {
    fontSize: 12,
    color: 'slategray',
  },

  estadoCerrado: {
    color: '#ff6656',
    fontSize: 11,
  },

   estadoResolucion: {
    color: '#f0ad4e',
    fontSize: 11,
  },

   estadoAbierto: {
    color: '#3C763D',
    fontSize: 11,
  },


})