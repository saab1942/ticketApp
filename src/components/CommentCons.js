import React, { Component } from 'react';
import { StyleSheet,Image,Text, View } from 'react-native';

import HTML from 'react-native-render-html';
import moment from 'moment';
import "moment/min/locales";

export default class CommentCons extends Component {
  render() {
    return (
		
		<View  style={styles.respuesta}>

			<View  style={styles.leftRespuesta}>

				<Image 
				resizeMode="contain" 
				style={styles.logo}
				source={require('/ticketApp/consultor.png')}
				/>

			</View>


			<View  style={this.getRespStyle(this.props.item.tipo)} >

				<View style={styles.Header}>

					<View style={styles.HeaderLeft}>
						<Text style={styles.name}>{this.props.item.name}</Text>
					</View>

					<View style={styles.HeaderRight}>
					  {this.getTipoText(this.props.item.tipo)}

					</View>

				</View>

				<View style={styles.Body}>
					<HTML html={this.props.item.respuesta}  />
				</View>


				<View style={styles.Footer}>
					<Text style={styles.fechaTicket}>{ moment(this.props.item.created_at).format('ll')}</Text>
				</View>

			</View>


		</View>

    );
  }

   getRespStyle(tipo) {

        if(tipo=='e'){
                return styles.rightRespuestaExt;
        }
        else
        {
        	return styles.rightRespuestaInt;
        }
       
    }

    getTipoText(tipo) {

        if(tipo=='i'){
                return <Text style={styles.textInterno} >Mensaje Interno</Text>;
        }
        else
        {
        	return  <Text></Text>;
        }
       
    }



}


const styles = StyleSheet.create({
 

  respuesta:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems:"center",
    padding: 3,
    margin: 4,
  },

  leftRespuesta:
  {
    flex: 1,

  },
  
  rightRespuestaExt: {
    flex: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1cad1',
    backgroundColor: '#E1FFD6',
    padding: 8,
  
  },

  rightRespuestaInt: {
    flex: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1cad1',
    backgroundColor: '#EDEDED',
    padding: 8,
  
  },

   Header:{
    flex: 1,
    flexDirection: 'row',
  },

  HeaderLeft:
  {
    flex: 1,
  },
  
  HeaderRight: {
    flex: 1,
    alignItems: 'flex-end'
  },

   textInterno: {
    color: 'red',
    fontSize: 12
  },

  Body: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 7 
  },

  Footer: {
    flex: 1,
    alignItems: 'flex-end'
  },



  logo:{
    width: 50,
    height: 50
  },

  name:{
    color: 'red'
  }
 

})
