import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator,Vibration, Platform} from 'react-native';
import firebase from '../database/firebase';
import QuesList from './QuesList';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { AsyncStorage } from 'react-native';


export default class Gsignup extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      
      isLoading: false,
      expoPushToken: '',
      notification: {},
      uCode:''
    }
  }

          clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }

  console.log('cleared')
}


  


    registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      console.log("hit expo token");
      try {
        token = await Notifications.getExpoPushTokenAsync();
    } catch (e) {
        console.error(e);
    }
    console.log("after hit expo token");


      
      
      console.log("token:",token);

      if(token){
        this.setState({ expoPushToken: token });
      }else{
        this.setState({ expoPushToken: "token not fetched" });
      }

    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };




_storeData = async () => {
  const firstPair = ["Token", this.state.expoPushToken]
  const secondPair = ["globalName", this.state.email]
  try {
    await AsyncStorage.multiSet([firstPair, secondPair])
  } catch(e) {
    //save error
  }

  console.log("Done.");
        this.setState({
          isLoading: false
          //displayName: '',
          //email: '', 
          //password: ''
        });

}







  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }


  df=()=>{
    console.log("new function");
  }

  setStringValue = async (value) => {
    try {
      await AsyncStorage.setItem('globalName', value)
    } catch(e) {
      // save error
    }

    
    console.log('Done.');

  }

  registerUser = () => {
    if(this.state.email === '' && this.state.displayName === '' && this.state.uCode === '') {
      Alert.alert('Enter details to signup!')
    } else {
      console.log(this.state.email,this.state.uCode);
      


      (async () => {


        this.setState({
          isLoading: true,
        })


        const rawResponse = await fetch('https://flask-app47.herokuapp.com/uniqueCode', {//exp://192.168.0.104:19000
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"uCode": this.state.uCode})
        });



        const content = await rawResponse.json();


      
        console.log(content["uCode status"]);



        if(content["uCode status"]=="verified"){
  

        this.setStringValue(this.state.email);

        console.log('User verified');
       //this.getRegDetails();
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          
          uCode:''
        });

        // //this.registerForPushNotificationsAsync();
        this.props.navigation.navigate('Google Signup');

    }else if(content["uCode status"]=="not verified"){
      Alert.alert('Enter correct Unique Code');
      this.setState({
        isLoading: false,
        displayName: '',
        email: '', 
       
        uCode:''
      });
    }




      })();









      
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={styles.container}>  

<Text 
          style={styles.loginText}
          
           >
          STEP 1
        </Text>


        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />      
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />


<TextInput
          style={styles.inputStyle}
          placeholder="Unique Code"
          value={this.state.uCode}
          onChangeText={(val) => this.updateInputVal(val, 'uCode')}
        />

        <Button
          color="#3740FE"
          title="Signup"
          onPress={() => {this.registerUser()}}
        />


                                 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});