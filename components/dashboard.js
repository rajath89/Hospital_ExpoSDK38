// import React, { Component } from 'react';

// import { StyleSheet, View ,Button,Text} from 'react-native';
// import firebase from '../database/firebase';

// import { Container, Header, Content, Footer, FooterTab } from 'native-base';

// //import Ques from components/dashBComp/Ques;
// import {Upload} from './Upload' ;
// import {Ques} from './Ques';
// import { firestore } from 'firebase';
// import QuesList from './QuesList';
// import BotTab from './BotTab';
// import NewQues from './NewQues';
// import Afterques from './afterques';
// import pdfViewer from './pdfviewer';

// //queslist
// // import {quizData} from './Questions/quizData';
// // import console = require('console');


// export default class Dashboard extends Component {


    
//   constructor(props) {
//     super(props);
//     this.state = { 
//       uid: '',

//     }

    
//     //this.state = {index: 0} // default screen index



//   }
  









 

//   signOut = () => {
//     firebase.auth().signOut().then(() => {
//       this.props.navigation.navigate('Login')
//     })
//     .catch(error => this.setState({ errorMessage: error.message }))
    
//   }  

//   render() {
//     this.state = { 
//       displayName: firebase.auth().currentUser.displayName,
//       uid: firebase.auth().currentUser.uid


      
//     } 
    
    


//     return (
      
//       <View style={styles.container}>
//         <Text style = {styles.textStyle}>
//           Hello, {this.state.displayName}
//         </Text>

        
        



//                        <Button 
//         title="View Profile"
//           //style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('View Profile',{screen:'viewPro'})}
//           />

//                           <Button 
//         title="Update Profile"
//           //style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('Update Profile',{screen:'updatePro'})}
//           />

//                           <Button 
//         title="FAQ"
//           //style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('AfterQuestions',{screen:'Afterques'})}
//           />

//                                     <Button 
//         title="Learning Materials"
//           //style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('Learning Materials',{screen:'pdfViewer'})}
//           />

//                                     <Button 
//         title=" GoTo afQues scren"
//           //style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('AfterQuestions',{screen:'Afterques'})}
//           />


//         <Button 
//         title=" GoTo Ques scren"
//           //style={styles.loginText}
//           onPress={() => this.props.navigation.navigate('Questions',{screen:'NewQues'})}
//           />



//                   <Button
//           color="#3740FE"
//           title="Logout"
//           onPress={() => this.signOut()}
//         />
         
        
//     {/* <QuesList /> */}
//     {/* <BotTab /> */}
//       </View>
      
      
//     );


    


//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: "flex",
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 35,
//     backgroundColor: '#fff'
//   },
//   textStyle: {
//     fontSize: 15,
//     marginBottom: 20
//   }
// });





import * as React from 'react';
import { Text, View, StyleSheet, Image,Dimensions ,BackHandler} from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import firebase from '../database/firebase';
import CameraComponent from './Camera';
import { AsyncStorage } from 'react-native';
import pdfViewer from './pdfviewer';
import Settings from './settings';


import {connect} from 'react-redux';
import dashboardV2 from './dashboardV2';
//import OneSignal from 'react-native-onesignal';



//REDUX IMPORTS

import english from './actions/langActions';
import kannada from './actions/langActions2';
import RAN from './actions/ranNumber';


const profileImg ="https://reactnativemaster.com/wp-content/uploads/2019/11/React-native-master-logo-only.png"
const w = Dimensions.get('window');
 class Fire extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = { 
  //     uid: ''
     

  //   }
  // }]
  // constructor(properties) {
  //   super(properties);
  //   //Remove this method to stop OneSignal Debugging 
  //   OneSignal.setLogLevel(6, 0);
  //   console.log("constructor")
    
  //   // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
  //   OneSignal.init("54079f91-989e-49a5-91b0-642020fab0ff", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});

  // }


  state = {
    isVisible: false,
    isVisible2:false,
    kannada:false,
    data:null,
    red:8,
    reduxState:1,
    decide:"eng",
    load:true
  }


  async _retrieveDataK() {
    try {
      const value = await AsyncStorage.getItem('kannadaLang');
      if (value !== null && value=="TRUE") {
        // We have data!!
        console.log(value);

        this.props.kannada();

        this.setState({
          kannada:true,
          decide:"kan"
        });
        //console.log("from state:",this.state.globName);

      }else if(value !== null && value=="FALSE"){
        this.props.english();
      }
    } catch (error) {
      // Error retrieving dat
    }
  }


  signOut = () => {
    
      this.props.navigation.navigate('Login')
  
    
  }
  
  getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys();
      // if(keys){
      //   this.clearAll();
      // }
    } catch(e) {
      // read key error
    }
  
    console.log(keys)
    // example console.log result:
    // ['@MyApp_user', '@MyApp_key']
  }
  onBackButtonPressed() {
    return true;
}


componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressed);
} 

  clearAll = async () => {
    console.log("cleared");
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
  
  };





setLoad=()=>{
  this.setState({load:false});
}


   lazyLoad=()=>{

    setTimeout(()=>{ this.setLoad() }, 3000);

   }





  componentDidMount() {

    this._retrieveDataK();
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressed);
    
    //OneSignal.init("54079f91-989e-49a5-91b0-642020fab0ff", {kOSSettingsKeyAutoPrompt : false, kOSSettingsKeyInAppLaunchURL: false, kOSSettingsKeyInFocusDisplayOption:2});
 
    console.log("update...........,onsignal");
    this.lazyLoad();

    

  }


  componentDidUpdate(prevState) {
    if (this.state.red.test !== prevState.red.test) {
      console.log("props changed !!!!!!1");
      //this.setState({kannada:true});
      console.log(this.state.reduxState,this.state.kannada,this.props.red.test,this.props.red.dec);


      if(this.props.red.test=="kannada"&&this.props.red.dec=="1234"){
        
        this.props.RAN();
        
        this.setState({kannada:true});
       
      }else if(this.props.red.test=="english"&&this.props.red.dec=="5678"){
        this.props.RAN();
        this.setState({kannada:false});
      }



    }
  }

onScreenFocus = () => {
    console.log("focussed...............")
  }
  
 render() {

    // this.state = { 
    //   displayName: firebase.auth().currentUser.displayName,
    //   uid: firebase.auth().currentUser.uid


      
    // } 

    if(this.state.load){

return(

  <View style={styles.container2}>
  <Image
    source={{ uri: `https://firebasestorage.googleapis.com/v0/b/hospitalusers-44f06.appspot.com/o/d1.png?alt=media&token=047b2d84-1ed2-4ff6-ac7e-87da40e3e25a` }}
    style={{ width:390, height: 400 }}
   
    
  />

<View style={styles.hairline} />
<View style={styles.hairline} />
<View style={styles.hairline} />

<View style={styles.hairline} />
<View style={styles.hairline} />

  <Text style={styles.header2}>Sri.Jayadeva Institute of Cardiovascular</Text>
  <Text style={styles.header2}>Sciences and Research, Mysore</Text>

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



<Text style={styles.header2}>from</Text>



<Text style={styles.header3}>VVCE, MYSURU</Text>




  </View>

);


    }






   console.log("##############",this.props.red.dec);
   console.log("ggg");
    return (
      <View style={styles.container}>

<View style={styles.card}>
 
 <Button

title={this.state.kannada == false ? 'Medical Risk Factors' : 'ಹೃದಯ ರೋಗವನ್ನು ಹೆಚ್ಚಿಸುವ ಅಂಶಗಳು'} 
type="clear"
onPress={() => this.props.navigation.navigate('Medical Risk Factors')}
/>
 </View>
 <View style={styles.hairline} />

 <View style={styles.card}>
 
 <Button

title={this.state.kannada == false ? 'Symptoms' : 'ರೋಗ ಲಕ್ಷಣಗಳು'} 
type="clear"
onPress={() => this.props.navigation.navigate('Symptoms')}
/>
 </View>
 <View style={styles.hairline} />

 <View style={styles.card}>
 
 <Button

title={this.state.kannada == false ? 'Treatment Compliance' : 'ಚಿಕಿತ್ಸೆಯ ಅನುಸರಣೆ'} 
type="clear"
onPress={() => {this.props.navigation.navigate('Treatment Compliance')}}
/>
 </View>
 <View style={styles.hairline} />

        <View style={styles.card}>
 
        <Button
 
  title={this.state.kannada == false ? 'CAG & Discharge Report Upload' : 'ವರದಿಗಳನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ (ಎಂಜಿಯೋಗ್ರಾಮ್ ಮತ್ತು ಡಿಸ್ಚಾರ್ಜ್ ವರದಿ)'} 
  type="clear"
  onPress={() => this.props.navigation.navigate('CAG & Discharge')}
/>
        </View>
        {/* <View style={styles.hairline} />
        
        <View style={styles.card}>
 
 <Button
title="Questions"
type="clear"
onPress={() => this.props.navigation.navigate('Questions',{screen:'NewQues'})}
/>
 </View> */}

 <View style={styles.hairline} />
 {/* <View style={styles.card}>
 
 <Button
title="FAQs"
type="clear"
onPress={() => this.props.navigation.navigate('FAQ page',{screen:'Faqpage'})}
/>
 </View>

 <View style={styles.hairline} /> */}
 <View style={styles.card}>
 
 <Button

title={this.state.kannada == false ? 'Learning Materials' : 'ಕಲಿಕಾ ಸಾಮಗ್ರಿಗಳು'} 
type="clear"
onPress={() => {this.props.navigation.navigate('Learning Materials',{screen:'pdfViewer'})}}
/>
 </View>

 <View style={styles.hairline} />
 <View style={styles.card}>
 
 <Button
title="Logout"
title={this.state.kannada == false ? 'Logout' : 'ಲಾಗ್ ಔಟ್'} 
type="clear"
onPress={() => {this.signOut(),this.getAllKeys()}}
/>
<Text>{this.props.red.text}</Text>



{this.props.red.dec=="english" && <Text> dispached ENGLISH</Text>}
{this.props.red.dec=="kannada" && <Text> dispached KANNADA</Text>}
 </View>


 
      </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //#e6e6ff
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems:"center"
  },  container2: {
    flex: 1,
    
    //#e6e6f
    backgroundColor: '#ecf0f1',
    
    alignItems:"center"
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
  },
  hairline2: {
    
    height: 3,
    width: 165
  },
  header2:{
    fontSize:18,
    
    
    color:"#000000",
    
    marginLeft:20,
    marginRight:20
  },
  header3:{
    fontSize:18,
    fontWeight:"bold",
    
    
    color:"#000000",
    marginBottom:10,
    marginLeft:20,
    marginRight:20
  },
});


function mapStateToProps(state){
  return{
    red:state
  }
}


export default connect(mapStateToProps,{english,kannada,RAN})(Fire)



