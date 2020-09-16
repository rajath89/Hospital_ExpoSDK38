import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator,Vibration, Platform} from 'react-native';
import firebase from '../database/firebase';
import QuesList from './QuesList';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { AsyncStorage } from 'react-native';


export default class Signup extends Component {
  
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      isLoading: false,
      expoPushToken: '',
      notification: {},
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


  //   componentDidMount() {
  //         this.setState({
  //         isLoading: false,
  //         displayName: '',
  //         email: '', 
  //         password: ''
  //       })

  // }
  


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

      

      // if(this.state.expoPushToken){
      //   console.log(this.state.expoPushToken);
      // }

      
      this.getRegDetails();

      //store expotoken in Asyncstorage
      //this._storeData();




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



//   _storeData = async () => {

//   console.log("expoToken stored");
//   if(this.state.expoPushToken){


//   try {
//     await AsyncStorage.setItem('expoToken1', this.state.expoPushToken);
    
//   } catch (error) {
//     // Error saving data
//   }
//   } 
// };


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


getRegDetails = () => {


  console.log("hit from getregDet");

  // (async () => {
  //   const rawResponse = await fetch('https://flask-app47.herokuapp.com/register', {//exp://192.168.0.104:19000
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({"username": this.state.email, "expoToken": "not fetched:watch updateProDetails","displayName":this.state.displayName})
  //   });
  //   const content = await rawResponse.json();
  
  //   console.log(content);
  // })();


//   if(this.state.expoPushToken){



//   (async () => {
//   const rawResponse = await fetch('https://flask-app47.herokuapp.com/register', {//exp://192.168.0.104:19000
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({"username": this.state.email, "expoToken": "not fetched:watch updateProDetails","displayName":this.state.displayName})
//   });
//   const content = await rawResponse.json();

//   console.log(content);
// })();


//   // this.setState({
//   //         isLoading: false

//   //       });

// }

this.setState({
  isLoading: false,
  displayName: '',
  email: '', 
  password: ''
});

//this.registerForPushNotificationsAsync();
this.props.navigation.navigate('Login');

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
    //this.registerForPushNotificationsAsync();
    this.getRegDetails();
    console.log('Done.');
    // this.setState({
    //   isLoading: false,
    //   displayName: '',
    //   email: '', 
    //   password: ''
    // });
    // this.props.navigation.navigate('Login');
  }

  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      console.log(this.state.email,this.state.password);
      
      
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName
        })

        //this.setStringValue(this.state.email);

        console.log('User registered successfully!');
       //this.getRegDetails();
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: ''
        });

        // //this.registerForPushNotificationsAsync();
        this.props.navigation.navigate('Login');
        
      })
      .catch(error => this.setState({ errorMessage: error.message }))      
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
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <Button
          color="#3740FE"
          title="Signup"
          onPress={() => {this.registerUser()}}
        />

        <Text 
          style={styles.loginText}
          
          onPress={() => {this.props.navigation.navigate('Login')}} >
          Already Registered? Click here to login
        </Text>
                                 
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