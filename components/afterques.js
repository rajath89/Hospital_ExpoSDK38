

import React from 'react';
import { Text, View, TouchableOpacity, Image,StyleSheet,TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'; //from 'expo-media-library';
//import  {MediaLibrary} from 'expo';
// import { Permissions, ImagePicker } from "expo";
import firebase from '../database/firebase';
import { Button, Overlay } from 'react-native-elements';

import { AsyncStorage } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { ToastAndroid } from 'react-native';



export default class Afterques extends React.Component {
  // state = {
  //   hasCameraPermission: null,
  //   type: Camera.Constants.Type.back,
  // };
  state={
    image:null,
    bl:null,
    pdf:null,
    globName:'',
    pd:false,
    comments: '', 
    systol:null,
    Diastol:null,
    
    isLoading: false,
    butID1:false,
    butID2:false
    
  }

 constructor(props) {
  super(props);
  this.state = {
   hasCameraPermission: null,
   image: null,
   ind:0,
   par:null
  }
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
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  this.setState({ hasCameraPermission: status === "granted" });

  this._retrieveData();

  
 }


 _getPhotoLibrary = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
   allowsEditing: false
   //aspect: [4, 3]
  });
  if (!result.cancelled) {
   this.setState({ image: result.uri });
   this.uploadImage(this.state.image); 
   this.asySt(this.state.image);
   //console.log(this.state.image);
  }
 }

   asySt = async (ur) => {
     console.log("stored");
  try {
    await AsyncStorage.setItem('image2', ur);
    console.log("stored");
  } catch (error) {
    // Error saving data
    console.log("error");
  }
};



  _getPdfLibrary = async () => {
  let result = await DocumentPicker.getDocumentAsync();
  if (!result.cancelled) {
   this.setState({ pdf: result.uri,pd:true });
   this.uploadImage(this.state.pdf); 
   //console.log(this.state.image);
   //console.log(st);
  }
 }



 uploadImage = async(uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  this.setState({ bl: blob });
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  //var time = today.getHours() + ":" + today.geMinutes() + ":" + today.getSeconds();
  var dateTime = date;

  ToastAndroid.show('Report selected for uploading', ToastAndroid.SHORT);


  var ref = firebase.storage().ref().child(this.state.globName.split("@")[0]+"/"+this.state.par);
  
  
  //console.log(this.state.ind);
  //this.setState({ ind:1 });
  console.log("par",this.state.par);
  return ref.put(blob);
  // var ref = firebase.storage().ref().child("my-image");
  // return ref.put(blob);
}

parameter=(para,type)=>{
  console.log(para);


  if(type=="Image"){
    this.setState({butID1:true});
  }else if(type=="PDF"){
    this.setState({butID2:true});
  }


  (async () => {
    const rawResponse = await fetch('https://flask-app47.herokuapp.com/addType', {//exp://192.168.0.104:19000
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": this.state.globName,"Lab":type})
    });
    const content = await rawResponse.json();
  
    console.log(this.state);

  })();

  this.setState({ par:para });
  console.log(this.state.par);
  

}

updateInputVal = (val, prop) => {
  const state = this.state;
  state[prop] = val;
  this.setState(state);
}

subMit=()=>{
  ToastAndroid.show('Report and BP values are updated', ToastAndroid.SHORT);
  console.log(this.state);


  const systol_value=this.state.systol;
  const diastol_value=this.state.diastol;

  var obj={};
  obj.systol=systol_value;
  obj.diastol=diastol_value;




        
          (async () => {
  const rawResponse = await fetch('https://flask-app47.herokuapp.com/BPvalues', {//exp://192.168.0.104:19000
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"username": this.state.globName, "BPvalues":obj})
  });
  const content = await rawResponse.json();

  if(content){
    console.log("before");
    console.log(content);
    console.log("after");
    
    
  }

})();






ToastAndroid.show('Details are updated', ToastAndroid.SHORT);
  this.props.navigation.navigate('Jayadeva Hrudaya Spandana');
}

render() {
  const { image, hasCameraPermission } = this.state;
  if (hasCameraPermission === null) {
   return <View />
  }
  //,() => this.uploadImge2()
  else if (hasCameraPermission === false) {
   return <Text>Access to camera has been denied.</Text>;
  }
  else {
   return (
    <View style={styles.container}>

<View style={styles.wrapper}>
<View>
                <Text>Enter BP Values:</Text>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        <TextInput placeholder="Systolic" style={{justifyContent: 'flex-start',    borderColor: "#ccc",
        borderStartWidth : 2,
        borderEndWidth : 3,
        borderTopWidth : 1,
        borderLeftWidth: 1,
        borderRightWidth: 3,
        borderBottomWidth : 4}} value={this.state.systol} onChangeText={(val) => this.updateInputVal(val, 'systol')}/>
                    </View>
                    
                    <View style={{flex:1,left:10}}>
                        <TextInput placeholder="Diastolic" style={{justifyContent: 'flex-end',    borderColor: "#ccc",
    borderStartWidth : 2,
    borderEndWidth : 3,
    borderTopWidth : 1,
    borderLeftWidth: 2,
    borderRightWidth: 3,
    borderBottomWidth : 4}} value={this.state.diastol}  onChangeText={(val) => this.updateInputVal(val, 'diastol')}/>
                    </View>
                </View>
            </View>
            </View>

  
 
                       



    {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}> */}
      {/* <Text>BP report</Text>
     <Button 
       onPress={()=>{this._getPhotoLibrary(),this.parameter("BP_rep")}} 
       title="upload report in image format"
     />

<Text style={{justifyContent:'center',left:140}}>OR</Text>
          <Button 
       onPress={()=>{this._getPdfLibrary(),this.parameter("BP_PDF_rep")}} 
       title="upload report in pdf format"
     /> */}

<Text>LAB report</Text>
     <Button
     type={this.state.butID1?"solid":"outline"}  
       onPress={()=>{this._getPhotoLibrary(),this.parameter("LAB_report","Image")}} 
       title="upload report in image format"
     />

<Text style={{justifyContent:'center',left:140}}>OR</Text>
          <Button
          type={this.state.butID2?"solid":"outline"}  
       onPress={()=>{this._getPdfLibrary(),this.parameter("LAB_report","PDF")}} 
       title="upload report in pdf format"
       
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
  wrapper:{
   
      padding: 10,
      backgroundColor: '#FFFFFF'
  
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



//  uploadImage2 = async() => {
//    console.log("up hit");
//   const response = await fetch("file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540rajath89%252FjayHos/ImagePicker/e2ab5ebb-5925-40e6-93c8-64c881f9c79b.jpg");
//   const blob = await response.blob();
//   this.setState({ bl: blob });
//   var ref = firebase.storage().ref().child("uuf");
//   return ref.put(blob);
//   // var ref = firebase.storage().ref().child("my-image");
//   // return ref.put(blob);
// }


  // renderFileUri() {
  //   if (this.state.image) {
  //     //console.log(this.state.image);
  //     return <Image source={{uri:this.state.image}} style={{width: 200, height: 200}}/>

  //   } 
  //  }


//  takePicture = async function() {
//   if (this.camera) {
//     let photo = await this.camera.takePictureAsync();
//   console.log(photo);
//   console.log("first");
//   await MediaLibrary.saveToLibraryAsync(photo);
// // await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'images/')
// // await FileSystem.moveAsync({
// //   from: photo,
// //   to: FileSystem.documentDirectory + 'images/imagename.jpg'
// // })

//   }

//   getPermissionAsync = async () => {
//     // Camera roll Permission 
//     if (Platform.OS === 'ios') {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     }
//     // Camera Permission
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({ hasPermission: status === 'granted' });
//   }

//    }

//   async componentDidMount() {
// this.getPermissionAsync()
//   }




//   render() {
//     const { hasCameraPermission } = this.state;
//     if (hasCameraPermission === null) {
//       return <View />;
//     } else if (hasCameraPermission === false) {
//       return <Text>No access to camera</Text>;
//     } else {
//       return (
//         <View style={{ flex: 1 }}>
//           <Camera style={{ flex: 1 }} type={this.state.type}  ref={ref => {
//     this.camera = ref;
//   }}>
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: 'transparent',
//                 flexDirection: 'row',
//               }}>

//            <TouchableOpacity
//             style={{
//              // flex: 0.1,
//               alignSelf: 'flex-end',
//               alignItems: 'center',
//             }}
//             onPress={()=>this.takePicture()}
//            >
//             <Text
//               style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
//               {' '}Take Picture{' '}
//             </Text>
//           </TouchableOpacity>
     
 
//             </View>
//           </Camera>
//         </View>
//       );
//     }
//   }
// }











// import React from 'react';
// import { Text, View, TouchableOpacity, Image,Button,StyleSheet } from 'react-native';
// import * as Permissions from 'expo-permissions';
// import { Camera } from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library'; //from 'expo-media-library';
// //import  {MediaLibrary} from 'expo';
// // import { Permissions, ImagePicker } from "expo";
// import firebase from '../database/firebase';

// import { AsyncStorage } from 'react-native';

// import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from 'expo-document-picker';

// export default class Afterques extends React.Component {
//   // state = {
//   //   hasCameraPermission: null,
//   //   type: Camera.Constants.Type.back,
//   // };
//   state={
//     image:null,
//     bl:null,
//     pdf:null
//   }

//  constructor(props) {
//   super(props);
//   this.state = {
//    hasCameraPermission: null,
//    image: null,
//   }
//  }

//  async componentDidMount() {
//   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
//   this.setState({ hasCameraPermission: status === "granted" });
//  }


//  _getPhotoLibrary = async () => {
//   let result = await ImagePicker.launchImageLibraryAsync({
//    allowsEditing: false
//    //aspect: [4, 3]
//   });
//   if (!result.cancelled) {
//    this.setState({ image: result.uri });
//    this.uploadImage(this.state.image); 
//    this.asySt(this.state.image);
//    //console.log(this.state.image);
//   }
//  }

//    asySt = async (ur) => {
//      console.log("stored");
//   try {
//     await AsyncStorage.setItem('image2', ur);
//     console.log("stored");
//   } catch (error) {
//     // Error saving data
//     console.log("error");
//   }
// };



//   _getPdfLibrary = async () => {
//   let result = await DocumentPicker.getDocumentAsync();
//   if (!result.cancelled) {
//    this.setState({ pdf: result.uri });
//    this.uploadImage(this.state.pdf); 
//    //console.log(this.state.image);
//   }
//  }

//  uploadImage = async(uri) => {
//   const response = await fetch(uri);
//   const blob = await response.blob();
//   this.setState({ bl: blob });
//   var ref = firebase.storage().ref().child("testUpload1/im");
//   return ref.put(blob);
//   // var ref = firebase.storage().ref().child("my-image");
//   // return ref.put(blob);
// }

// render() {
//   const { image, hasCameraPermission } = this.state;
//   if (hasCameraPermission === null) {
//    return <View />
//   }
//   //,() => this.uploadImage2()
//   else if (hasCameraPermission === false) {
//    return <Text>Access to camera has been denied.</Text>;
//   }
//   else {
//    return (
//     <View style={{ flex: 1 }}>



//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//      <Button 
//        onPress={this._getPhotoLibrary.bind(this)} 
//        title="Photo Picker Screen!"
//      />
//           <Button 
//        onPress={this._getPdfLibrary.bind(this)} 
//        title="uploadPDF"
//      />
//     </View>
//    </View>
//    );
//   }
//  }
// }


