// import firebase from '../database/firebase';
// import { divide } from "react-native-reanimated";
// import React, { Component } from 'react';
// import { StyleSheet, Text, View, TextInput, Alert, ActivityIndicator,TouchableOpacity } from 'react-native';
// import NewQues from './NewQues';

// import SingleCardView from 'react-native-simple-card';

// import { Card,Divider,Button, Overlay} from 'react-native-elements';











// const items = [
//   { name: 'Me', background: '#3498db', icon: 'user' },
//   { name: 'Family', background: '#ef0202', icon: 'gratipay' },
//   { name: 'Lovely', background: '#efcf02', icon: 'heart' },
//   { name: 'Team', background: '#02ef1d', icon: 'users' },
//   // { name: 'Friends', background: '#02cbef', icon: 'group' },
//   // { name: 'Calendars', background: '#ef5802', icon: 'calendar' },
// ];

// class Fire extends Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {  }
//     // }

//  // state = {
    
//  //    name: ""
    
//  //  };

//   // state = {
//   //   loading: true,
//   //   person: null
//   // };

//   // async componentDidMount() {
//   //   const url = "http://localhost:5000/test";
//   //   const response = await fetch(url);
//   //   const data = await response.json();
//   //   console.log(data);
//   //   this.setState({ person: data, loading: false });
//   // }
//   //componentDidMount(){
//   	   //  firebase
//       // .database()
//       // .ref("users")
//       // .child("01")
//       // .set({
//       //   name: "ali haider"
//       // });

//   //     const db = firebase.firestore();
//   //     var alovelaceDocumentRef = db.doc('users/alovelace');

//   // //   db.collection("users").doc("test").add({
//   // //     	name:"naga"
//   // // });  
//   // alovelaceDocumentRef.add({
//   // 	name:"naga"
//   // });

//    //const [currentTime, setCurrentTime] = useState(0);




//   //}


//   //   constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     error: null,
//   //     isLoaded: false,
//   //     items: []
//   //   };
//   // }

//   // componentDidMount() {
//   //   fetch("https://api.example.com/items")
//   //     .then(res => res.json())
//   //     .then(
//   //       (result) => {
//   //         this.setState({
//   //           isLoaded: true,
//   //           items: result.items
//   //         });
//   //       },
//   //       // Note: it's important to handle errors here
//   //       // instead of a catch() block so that we don't swallow
//   //       // exceptions from actual bugs in components.
//   //       (error) => {
//   //         this.setState({
//   //           isLoaded: true,
//   //           error
//   //         });
//   //       }
//   //     )
//   // }

//   on1 =  () =>{
//     console.log("clicked");
//   }


//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.headerText}>Set Button Color In React Native.</Text>

//         <View style={[{ width: "90%", margin: 10, height:120,backgroundColor: "#3740FE" }]}>
//           <TouchableOpacity style={{ height: 50, marginTop: 10 }} onPress={this.on1}>
//     <Text>My button</Text>
// </TouchableOpacity>
//         </View>

//       <View style={[{ width: "90%", margin: 10, height:120,backgroundColor: "#3740FE" }]}>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={this.on1}
//       >
//         <Text>Press Here</Text>
//       </TouchableOpacity>
//     </View>

//     </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5FCFF"
//   },
//   headerText: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: 10,
//     fontWeight: "bold"
//   },
//   button: {
//     padding: 20,
//     fontSize: 15,
//     fontFamily: "arial",
//     width: 400,
//     height: 100,
//     textAlign: "center"
//   }
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 10
//   },
//   button: {
//     alignItems: "center",
//     backgroundColor: "#DDDDDD",
//     padding: 10
//   },
//   countContainer: {
//     alignItems: "center",
//     padding: 10
//   }
// });


// export default Fire;

//####################################3
// import React, { Component } from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import Dashboard from 'react-native-dashboard';
// //import { ImageBrowser } from 'expo-multiple-media-imagepicker';
 
// const items = [
//   { name: 'View Profile',icon: 'user' },
//   { name: 'Update Profile',icon: 'gratipay' },
//   { name: 'Ans Questions',icon: 'heart' },
//   { name: 'Go to FAQ', icon: 'users' },
//   { name: 'Learning Materials', icon: 'group' },
//   { name: 'Logout', icon: 'group' }
// ];
 
// export default class Fire extends Component {
//   _card = el => {
//     console.log('Card: ' + el.name)
//   };
//   render() {
//     return (
//       <View style={styles.container}>
//         <Dashboard items={items} background={true} card={this._card} column={2} />
//       </View>
//     );
//   }
// }
 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ecf0f1',
//   },
// });



import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';
import { Button } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import firebase from '../database/firebase';
const profileImg ="https://reactnativemaster.com/wp-content/uploads/2019/11/React-native-master-logo-only.png"

export default class Fire extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      uid: '',

    }
  }


  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
    
  } 




  render() {

    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid


      
    } 


    return (
      <View style={styles.container}>
        <View style={styles.card}>
 
        <Button
  title="View Profile"
  type="clear"
  onPress={() => this.props.navigation.navigate('View Profile',{screen:'viewPro'})}
/>
        </View>
        <View style={styles.hairline} />

        <View style={styles.card}>
 
        <Button
  title="Update profile"
  type="clear"
  onPress={() => this.props.navigation.navigate('Update Profile',{screen:'updatePro'})}
/>
        </View>
        <View style={styles.hairline} />
        
        <View style={styles.card}>
 
 <Button
title="Questions"
type="clear"
onPress={() => this.props.navigation.navigate('Questions',{screen:'NewQues'})}
/>
 </View>

 <View style={styles.hairline} />
 <View style={styles.card}>
 
 <Button
title="FAQs"
type="clear"
onPress={() => this.props.navigation.navigate('AfterQuestions',{screen:'Afterques'})}
/>
 </View>

 <View style={styles.hairline} />
 <View style={styles.card}>
 
 <Button
title="Learning Materials"
type="clear"
onPress={() => this.props.navigation.navigate('Learning Materials',{screen:'pdfViewer'})}
/>
 </View>

 <View style={styles.hairline} />
 <View style={styles.card}>
 
 <Button
title="Logout"
type="clear"
onPress={() => this.signOut()}
/>
 </View>


 
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
  }
});




