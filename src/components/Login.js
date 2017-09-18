import React, { Component } from 'react';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { View, TextInput, Dimensions, Image } from 'react-native';
import { CardSection } from './ModalComponents';
import { Button, Content } from './CommonComponents';

const login = `https://ireports.herokuapp.com/login`;

class Login extends Component {

  constructor() {
    super();
   this.state = {
     error: false,
     id: '',
     password: ''
   };
  }

  _login() {
    // @ TODO this will be replaced when the API is provided.
    axios.post(login,{
      id: this.state.id,
      password: this.state.password
    }).then( res => {
      console.log(res);
      if(res.status === 201) {
        Actions.map();
      } else {
        this.setState({
          error: true
        })
      }
    }).catch( e => {
      console.log(e);
      this.setState({
        error: true
      })
    });
  }

  _returnError(){
    if(this.state.error) {
      return (
        <Content weight='200' size={14} color='red' style={{alignItems: 'center'}}>
        The ID and the Password dont seem to match. Please retry or SignUp if your are new.
        </Content>
      )
    }
  }

   render() {
     const {
       container,
       textBox
     } = styles;
  return (
  <View style={container}>
    <Image source={require('../../assets/images/adv-ICE_logo_M.png')} />
      <Content weight='500' size={35} color='black'> adv-ICE </Content>
      <Content weight='200' size={15} color='black'>
      Please logIn before you proceed.
      </Content>
      {this._returnError()}
      <TextInput
        style={textBox}
        onChangeText={(id) => this.setState({ id })}
        placeholder='userID'
        placeholderTextColor="black"
        returnKeyType='done'
        numberOfLines={1}
        clearButtonMode='while-editing'
        value={this.state.id}
      />
      <TextInput
        style={textBox}
        onChangeText={(password) => this.setState({ password })}
        placeholder='password'
        placeholderTextColor="black"
        returnKeyType='done'
        secureTextEntry={true}
        numberOfLines={1}
        clearButtonMode='while-editing'
        value={this.state.password}
      />
      <CardSection>
      <Button onPress={() => { this._login() }}> Login </Button>
      <Button onPress={() => { Actions.signUp() }}> SignUp </Button>
      </CardSection>
  </View>
  );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#FF8E1F',
    alignItems: 'center',
    alignContent: 'space-around',
    flexDirection: 'column',
    paddingTop: 150,
    borderColor: 'black',
    borderWidth: 2
  },
  textBox: {
    height: 40,
    backgroundColor: '#E0FFFF',
    borderColor: '#79CDCD',
    borderWidth: 0.3,
    borderRadius: 10,
    shadowColor: '#79CDCD',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0.5,
    width: Dimensions.get('window').width - 60,
    marginHorizontal: 30,
    marginVertical: 15,
    textAlign: 'center'
  }
}


export default Login;
