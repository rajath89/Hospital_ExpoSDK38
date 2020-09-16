import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';

import {QuesList} from './QuesList';
import { Font } from "expo";

import { AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import { Card} from 'react-native-elements'


export default class DoctorComments extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: true,
      ob:false,
      obj:null,
      globName:''
    }
  }

  // async _retrieveData() {
  //   try {
  //     const value = await AsyncStorage.getItem('globalName');
  //     if (value !== null) {
  //       // We have data!!
  //       console.log(value);
  //       this.setState({
  //         globName:value
  //       });
  //       console.log("from state:",this.state.globName);
  //       // if(this.state.globName){
  //       //   //this.getMultiple();
  //       //   console.log("globNmae");
  //       //   //this.getMultiple();
  //       //   console.log("after getmultiple");
  //       // }
  //     }
  //   } catch (error) {
  //     // Error retrieving data
  //   }
  // }



    componentDidMount() {
        this._retrieveData();
    

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
        this.getprof();
        console.log("from state:",this.state.globName);
        // if(this.state.globName){
        //   //this.getMultiple();
        //   console.log("globNmae");
        //   //this.getMultiple();
        //   console.log("after getmultiple");
        // }
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }


getprof = () => {

  (async () => {
  const rawResponse = await fetch('https://flask-app47.herokuapp.com/getDocComment', {//exp://192.168.0.104:19000
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": this.state.globName})
  });



  const content = await rawResponse.json();

  console.log(content);
  if(content.msg=="no comments" || content.msg=="error"){
      this.setState({isLoading:false,ob:true})
  }else{
    console.log(content);
    
    this.setState({isLoading:false,obj:content.comment})
  }
})();

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
       

        {/* {this.state.obj &&(<Card
  title='Comment given by doctor'
  >
  <Text style={styles.header2}>
  Comment given by doctor
  </Text>

</Card>)} */}


{this.state.obj!==null && <View style={styles2.card}>
          <View style={styles2.header}>
           
            <Text style={{fontSize:20,padding:10}}>Comment given by doctor</Text>
          </View>


          <View style={styles.hairline} />
          
<Text style={styles.header2}>{this.state.obj}</Text>
        </View>}

        {this.state.ob &&<Text style={styles.header2}>No reply from Doctor, check back later</Text>}
        

        </View>

      
     );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems:"center"
  },textViewContainer: {
    textAlignVertical:'center', 
    fontSize: 18,
    fontWeight:"900",
    color: '#1c1c1c'
    },
    header2:{
      fontSize:17,
      
      color:"black",
      marginBottom:10,
      marginLeft:20,
      marginRight:20
    },
  card:{
    height:40,
    width:"80%",
    backgroundColor:"white",
    borderRadius:15,
    borderWidth: 1,
    borderColor: '#3740FE',
    elevation:10,
    padding:7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  profileImg:{
    width:30,
    height:30,
    borderRadius:50,
    marginRight:10,
  },
  header: {
    flexDirection:"row",
  },
  hairline: {
    
    height: 8,
    width: 165
  }
});



const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems:"center"
  },
  card:{
    alignItems:"center",
    justifyContent: 'center',

   
    width:"90%",
    backgroundColor:"white",
    borderRadius:15,
    elevation:10,
    padding:20
  },
  profileImg:{
    width:30,
    height:30,
    borderRadius:50,
    marginRight:10,
  },
  header: {
    flexDirection:"row",
  },
    hairline: {
      
      height: 8,
      width: 165
    },textViewContainer: {
          textAlignVertical:'center', 
          fontSize: 19,
          
          
          color: 'purple'
          },
});
