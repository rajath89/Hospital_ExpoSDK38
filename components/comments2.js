import React from 'react';
import { Text, View, TouchableOpacity, Image,Button,StyleSheet,TextInput } from 'react-native';

import firebase from '../database/firebase';

import { AsyncStorage } from 'react-native';


import { ToastAndroid } from 'react-native';



export default class Comments2 extends React.Component {

  state={

    globName:'',
    
    comments: '', 
    
    isLoading: false,
    
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }




 async _retrieveData() {
  try {
    const value = await AsyncStorage.getItem('globalName');
    if (value !== null) {
      // We have data!!
      console.log(value);
      this.setState({
        globName:value
      });
      console.log("from state:",this.state.globName);
    }
  } catch (error) {
    // Error retrieving data
  }
}

 async componentDidMount() {

  this._retrieveData();

  
 }






subMit=()=>{
  //console.log(this.state);
  const df=this.state.comments;


  (async () => {
    const rawResponse = await fetch('https://flask-app47.herokuapp.com/comments', {//exp://192.168.0.104:19000
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": this.state.globName,"comments":df})
    });
    const content = await rawResponse.json();
  
    console.log(content);
    if(content){
        //this.setState({isLoading:false,obj:content})
        ToastAndroid.show('Comment submitted successfully', ToastAndroid.SHORT);
        this.setState({comments:''})
        this.props.navigation.navigate('Jayadeva Hrudaya Spandana');
    }
  })();
}

render() {


 
   return (
    <View style={styles.container}>


    <TextInput
          style={styles.inputStyle}
          placeholder="Comments"
          value={this.state.comments}
          onChangeText={(val) => this.updateInputVal(val, 'comments')}
        />

<View style={styles.hairline} />
<View style={styles.hairline} />

 

    <Button
          color="#3740FE"
          title="Submit"
          onPress={() =>this.subMit()}
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
  },
  hairline: {
    
    height: 15,
    width: 165
  }
});