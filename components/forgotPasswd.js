import React, { Component } from 'react';
import { Text, View ,StyleSheet,TextInput,Button} from 'react-native';
import firebase from '../database/firebase';
import { ToastAndroid } from 'react-native';

class ForgotPassword extends Component {

    state={
        email:''
        
      }


    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
      }

      forgotPassword = (Email) => {
        firebase.auth().sendPasswordResetEmail(Email)
          .then(function (user) {
            console.log('Please check your email...');
            //this.props.navigation.navigate('Login');
            ToastAndroid.show('Please check your email for password reset', ToastAndroid.LONG);
            
          }).catch(function (e) {
            console.log("error...........",e);
            ToastAndroid.show('Enter your valid registered email', ToastAndroid.LONG);
          })
      }

      subMit=()=>{
          const em=this.state.email;
          console.log(em);
          this.forgotPassword(em);
      }



  render() {
    return (
<View style={styles.container}>


<TextInput
      style={styles.inputStyle}
      placeholder="Enter Email"
      value={this.state.email}
      onChangeText={(val) => this.updateInputVal(val, 'email')}
    />

<View style={styles.hairline} />
<View style={styles.hairline} />



<Button
      color="#3740FE"
      title="Send mail"
      onPress={() =>this.subMit()}
    />  
</View>
    )
  }
}

export default ForgotPassword;

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
    },
    hairline: {
      
      height: 15,
      width: 165
    }
  });