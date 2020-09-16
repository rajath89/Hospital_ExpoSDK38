import React, { Component } from 'react';
import { Button } from 'react-native-elements';
//import react in our code. 

import { Modal, View, StyleSheet ,Image} from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { AsyncStorage } from 'react-native';


 

export default class AboutDoctor extends Component {



  state = {
    isVisible: false,
    isVisible2:false,
    isVisible3:false,
    isVisible4:'',
    isVisible5:null,
    result: null,
    kannada:false
  }









  render() {
    return (
<View style={styles.container}>

 <WebView
        source={{ uri: 'https://parikshith21.github.io/jhs-learning/team_doctors.html' }}
        style={{ maxHeight: 700,width:380 ,flex: 1 }}
      />


      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop:5
  },
   modal: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      
      padding: 30
   },
   text: {
      color: '#3f2949',
      marginTop: 10
   },
   card:{
     height:70,
     width:"80%",
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
   },
   paragraph: {
     margin: 24,
     fontSize: 16,
     fontWeight: 'bold',
     textAlign: 'center',
   },
   modalClose: {
    marginTop: 20,
    marginBottom: 0,
  }
});