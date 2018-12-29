import React, { Component } from 'react';
import { AppRegistry,AsyncStorage } from 'react-native';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';


export default class Index extends Component {
    constructor(props) {
    super(props);

    this.state = {
      token: '' 
    }
  }


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
                  this.props.navigation.navigate('Tickets') 
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

  render() {
    return (
    
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="camera" /><Text>Mis Tickets</Text></TabHeading>}>
          
          </Tab>
          <Tab heading={ <TabHeading><Text>Tickets</Text></TabHeading>}>
           
          </Tab>
        
        </Tabs>
    
    );
  }
}