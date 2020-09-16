





import React, { Component } from 'react';
import { Button } from 'react-native-elements';
//import react in our code. 

import { Modal, View,Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

//import {CheckBox} from "native-base";



 

export default class Comments extends Component {
  state = {
    isVisible: false,
    isVisible2:false
  }




  render() {
    return (


<View style={styles.container}>
        <View style={styles.card}>

        
 
        <Button
  title="Ask your Doctor"
  type="clear"
  
  onPress={() => this.props.navigation.navigate('Add Comment')}


/>



        </View>
        <View style={styles.hairline} />

        <View style={styles.card}>
 
        <Button
  title="Doctor's reply"
  type="clear"
  onPress={() => this.props.navigation.navigate('Doctor Comment')}
  
/>
        </View>
        <View style={styles.hairline} />






       


 



        



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
    marginTop:30
  },
   modal: {
      flex: 1,
      alignItems: 'center',
      
      padding: 70
   },
   text: {
      color: '#3f2949',
      marginTop: 10
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