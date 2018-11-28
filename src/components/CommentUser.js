import React, { Component } from 'react';
import { StyleSheet,Image,Text, View } from 'react-native';

import HTML from 'react-native-render-html';
import moment from 'moment';
import "moment/min/locales";

export default class CommentUser extends Component {
  render() {
    return (
       <View  style={styles.respuesta}>

                                  <View  style={styles.leftRespuesta}>

                                      <View style={styles.respuestaHeader}>

                                        <View style={styles.respuestaHeaderLeft}>
                                          <Text style={styles.name}>{this.props.item.name}</Text>
                                        </View>

                                        <View style={styles.respuestaHeaderRight}>
                                         
                                        </View>


                                      </View>

                                       <View style={styles.respuestaBody}>
                                          <HTML html={this.props.item.respuesta}  />
                                          
                                        </View>
                                          
                                       
                                      <View style={styles.respuestaFooter}>
                                         <Text style={styles.fechaTicket}>{ moment(this.props.item.created_at).format('ll')}</Text>
                                          
                                      </View>
                                    

                                  </View>

                                 <View  style={styles.rightRespuesta} >


                                      <Image
                                        resizeMode="contain" 
                                        style={styles.logo}
                                        source={require('/ticketApp/user.png')}
                                      />

                                    
                                  </View>


                            </View>


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
    backgroundColor: '#F5FCFF',
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

  respuesta:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems:"center",
    padding: 3,
    margin: 4,
  },

  rightRespuesta:
  {
    flex: 1,

  },
  
  leftRespuesta: {
    flex: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1cad1',
    backgroundColor: '#CFFBFC',
    padding: 8,
  
  },

   respuestaHeader:{
    flex: 1,
    flexDirection: 'row',
  },

  respuestaHeaderLeft:
  {
    flex: 1,
  },
  
  respuestaHeaderRight: {
    flex: 1,
    alignItems: 'flex-end'
  },

  respuestaFooter: {
    flex: 1,
    alignItems: 'flex-end'
  },



  logo:{
    width: 70,
    height: 70
  },

  name:{
    color: 'red'
  }
 

})
