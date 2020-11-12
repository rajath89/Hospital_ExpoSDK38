import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator,ImageBackground } from 'react-native';
import firebase from '../database/firebase';
import { Button } from 'react-native-elements';

import PasswordInputText from 'react-native-hide-show-password-input';
import * as Google from 'expo-google-app-auth';

import { ToastAndroid } from 'react-native';
import { AsyncStorage } from 'react-native';


const image = { uri: "https://reactjs.org/logo-og.png" };

export default class Glogin extends Component {

  constructor() {
    super();
    this.state = { 

      isLoading: false,
      storeStatus:false

    }
  }


  getUser = async (em) => {

    let values
    try {
      values = await AsyncStorage.multiGet(['globalName', 'googleAccessToken']);
      //console.log(values);
  
    } catch(e) {
      // read error
    }
    console.log("login%%",values[0][1],values[1][1]);
    if(values[0][1] === em){
      
        console.log("clear");
        this.props.navigation.navigate('Jayadeva Hrudaya Spandana');

      
  }else{
    ToastAndroid.show('Please login with the email provided for the registration', ToastAndroid.LONG);
    this.setState({isLoading:false});
  }

  }


  _storeData = async (em,accTok) => {
    const firstPair = ["googleAccessToken", accTok]
    const secondPair = ["globalName", em]
    console.log(firstPair,secondPair);
    try {
      await AsyncStorage.multiSet([firstPair, secondPair]);

    } catch(e) {
      //save error
    }
  
    console.log("Done.");

  
  }

  _retrieveData = async (em) => {
    console.log("###")
    try {
      const value = await AsyncStorage.getItem('globalName');
      if (value !== null) {
        // We have data!!
        if(value==em){
          this.setState({isLoading:false});
          this.props.navigation.navigate('Jayadeva Hrudaya Spandana');
        }else{
          ToastAndroid.show('Please login with the email provided for the registration', ToastAndroid.LONG);
          this.setState({isLoading:false});
        }
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };


  

  signInWithGoogleAsync=async() => {

    this.setState({isLoading:true});
    try {
      const result = await Google.logInAsync({
        
        behavior:'web',
        ////androidStandaloneAppClientId : "1074652022617-2qdsd5u79lctfhtolcjlo0bicsav3dqe.apps.googleusercontent.com"
        androidClientId: "1074652022617-2qdsd5u79lctfhtolcjlo0bicsav3dqe.apps.googleusercontent.com",
        
      });

      if (result.type === 'success') {
        console.log(result.user.email);

        
       // this.setState({em:result.user.email,accTok:"TRUE",isLoading:false});
        //this.getUser(result.user.email);

        //this.props.navigation.navigate('Jayadeva Hrudaya Spandana');

        //this.setState({isLoading:false});
        this._retrieveData(result.user.email);
        return result.accessToken;
      } else {
        this.setState({isLoading:false});

        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }


  signInWithGoogle = () => {
    this.signInWithGoogleAsync()
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
      <ImageBackground 
      source={{uri: 'https://firebasestorage.googleapis.com/v0/b/hospitalusers-44f06.appspot.com/o/d1.png?alt=media&token=047b2d84-1ed2-4ff6-ac7e-87da40e3e25a'}}
      style={{flex:1,width:390, height: 450 }}
    >


<View style={styles.container}>

<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />

<View style={styles.hairline} />
<View style={styles.hairline} />

<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />

<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />

<View style={styles.hairline} />
<View style={styles.hairline} />

<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />

<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />

<View style={styles.hairline} />
<View style={styles.hairline} />


<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />

<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />

<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />

<View style={styles.hairline} />
<View style={styles.hairline} />



<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />

<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />

<View style={styles.hairline} />
<View style={styles.hairline} />





<View style={styles.card}>
 
 <Button

title={'Sign in with Google' } 
type="clear"
onPress={() => this.signInWithGoogle()}
/>
 </View>

 




</View>

</ImageBackground>



    );
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    
      justifyContent: "center",
      
      alignItems:"center"
      
    },
    container2: {
      flex: 1,
      flexDirection: "column"
    },

    inputStyle: {
      width: '93%',
      marginBottom: 1,
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
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },  hairline: {
    
      height: 8,
      width: 165
    },
    card:{
      height:70,
      width:"94%",
      backgroundColor:"white",
      borderRadius:15,
      borderWidth: 1,
      borderColor: '#3740FE',
      elevation:10,
      padding:10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5
    }
  });