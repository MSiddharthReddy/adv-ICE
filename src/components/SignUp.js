import React, { Component } from 'react';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { View, TextInput, Dimensions, Image, Alert } from 'react-native';
import { CardSection } from './ModalComponents';
import { Button, Content } from './CommonComponents';

const signUp = `https://ireports.herokuapp.com/signup`;
class SignUp extends Component {

  constructor() {
    super();
   this.state = {
     visible: false,
     loaded: false,
     email: '',
     userId: '',
     password: '',
     retypePass: ''
   };
  }

  _check() {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailCheck = emailRegex.test(this.state.email);
    let passwordCheck = this.state.password.length > 5;
    let passwordMatch = (this.state.password === this.state.retypePass);
    console.log(`EmailCheck: ${emailCheck}, passwordCheck: ${passwordCheck}, passwordMatch: ${passwordMatch}`)
    return (emailCheck && passwordCheck && passwordMatch);
  }

  _signUp(){
    if(this._check()) {
      console.log('Sending Data: ', this.state)
      axios.post(signUp,{
        email: this.state.email,
        username: this.state.userId,
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
    } else {
      Alert.alert(
        'Check Your entry',
        'Please check your details enteres. One or more credentials dont match the criteria.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
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
      Please signUp below.
      </Content>
      <TextInput
        style={textBox}
        onChangeText={(email) => this.setState({ email })}
        placeholder='e-mail'
        placeholderTextColor="black"
        returnKeyType='done'
        numberOfLines={1}
        clearButtonMode='while-editing'
        value={this.state.email}
      />
      <TextInput
        style={textBox}
        onChangeText={(userId) => this.setState({ userId })}
        placeholder='userID'
        placeholderTextColor="black"
        returnKeyType='done'
        numberOfLines={1}
        clearButtonMode='while-editing'
        value={this.state.userId}
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
      <TextInput
        style={textBox}
        onChangeText={(retypePass) => this.setState({ retypePass })}
        placeholder='re-type Password'
        placeholderTextColor="black"
        returnKeyType='done'
        secureTextEntry={true}
        numberOfLines={1}
        clearButtonMode='while-editing'
        value={this.state.retypePass}
      />
      <CardSection>
      <Button onPress={() => {
        this._signUp();
       }}> SignUp </Button>
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
    paddingTop: 100,
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


export default SignUp;
