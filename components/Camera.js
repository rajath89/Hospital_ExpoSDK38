

import React from 'react';
import { Text, View, TouchableOpacity, Image,StyleSheet,TextInput ,Picker,ScrollView,Alert} from 'react-native';
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



export default class CameraComponent extends React.Component {
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
    CAG: null, 
    hemoglobin:null,
    PTCA:null,
    EF:null,
    SerumCreatinine:null,
    isLoading: false,
    selected2:null,
    butId1:false,
    butId2:false,
    butId3:false,
    butId4:false
    
    
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

 onValueChange2(value) {
  this.setState({
    selected2: value
  });
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
   console.log("image uri****",result);
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
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+time;


ToastAndroid.show('Report selected for uploading', ToastAndroid.SHORT);

  //var ref = firebase.storage().ref().child(this.state.globName.split("@")[0]+"/cagreport/"+this.state.par+"("+dateTime+")");
  var ref = firebase.storage().ref().child(this.state.globName.split("@")[0]+"/"+this.state.par);
  
  //console.log(this.state.ind);
  //this.setState({ ind:1 });
  console.log("par",this.state.par);
  return ref.put(blob);



  // var ref = firebase.storage().ref().child("my-image");
  // return ref.put(blob);
}

parameter=(para,type)=>{
  console.log(para,"type$$$",type);

  if(type=="CAG Image"){
    this.setState({butId1:true});
  }else if(type=="CAG PDF"){
    this.setState({butId2:true});
  }else if(type=="Discharge Image"){
    this.setState({butId3:true});
  }else if(type=="Discharge PDF"){
    this.setState({butId4:true});
  }



  var typeName=type.split(' ')[0];

 

  var typeVal=type.split(' ')[1];



if(typeName=="CAG"){
  (async () => {
    const rawResponse = await fetch('https://flask-app47.herokuapp.com/addType', {//exp://192.168.0.104:19000
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": this.state.globName,"CAG":typeVal})
    });
    const content = await rawResponse.json();
  
    console.log(this.state);

  })();
}else if(typeName=="Discharge"){
  (async () => {
    const rawResponse = await fetch('https://flask-app47.herokuapp.com/addType', {//exp://192.168.0.104:19000
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": this.state.globName,"Discharge":typeVal})
    });
    const content = await rawResponse.json();
  
    console.log(this.state);

  })();
}






  this.setState({ par:para });
  console.log(this.state.par);
  

}

updateInputVal = (val, prop) => {
  const state = this.state;
  state[prop] = val;
  this.setState(state);
}

validateCAG=(cag)=>{
  if(cag==null){
    Alert.alert("Select CAG category");
    return false;
  }else{
    return true;
  }
}

validatePTCA=(ptca)=>{
  if(ptca==null){
    Alert.alert("Select PTCA category");
    return false;
  }else{
    return true;
  }
}

validateHemo=(hem)=>{
  if(hem==null){
    Alert.alert("Enter hemoglobin value");
    return false;
  }else{
    return true;
  }
}


validateEF=(ef)=>{
  if(ef==null){
    Alert.alert("Enter EF value");
    return false;
  }else{
    return true;
  }
}


validateSerum=(sem)=>{
  if(sem==null){
    Alert.alert("Enter Serum Creatinine value");
    return false;
  }else{
    return true;
  }
}


subMit=()=>{




  var CAGbool=this.validateCAG(this.state.CAG);
  var PTCAbool=this.validatePTCA(this.state.PTCA);
  var hemo=this.validateHemo(this.state.hemoglobin);
  var EFbool=this.validateEF(this.state.EF);
  var serum=this.validateSerum(this.state.SerumCreatinine);

  var obj={};
  obj["CAG"]=this.state.CAG;
  obj["PTCA"]=this.state.PTCA;
  obj["hemoglobin"]=this.state.hemoglobin;
  obj["EF"]=this.state.EF;
  obj["serum_creatinine"]=this.state.SerumCreatinine;


if(CAGbool&&PTCAbool&&hemo&&EFbool&&serum){
  console.log("fall through");
  console.log(obj);

    (async () => {
    const rawResponse = await fetch('https://flask-app47.herokuapp.com/CAGdetails', {//exp://192.168.0.104:19000
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": this.state.globName,"CAG_DischargeDetails":obj})
    });
    const content = await rawResponse.json();
  
    console.log(content);
    if(content){
        //this.setState({isLoading:false,obj:content})
        ToastAndroid.show('Report and details are updated', ToastAndroid.LONG);
        this.props.navigation.navigate('Jayadeva Hrudaya Spandana');
    }
  })();
}
//
  //console.log(this.state);
  const df=this.state.CAG;
  const df1=this.state.hemoglobin;

  var arr=new Array();
  arr.push({"CAG":df});
  arr.push({"Hemoglobin":df1});
  
  //console.log(this.state);
//





  // (async () => {
  //   const rawResponse = await fetch('https://flask-app47.herokuapp.com/CAGdetails', {//exp://192.168.0.104:19000
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({"username": this.state.globName,"CAG_DischargeDetails":this.state})
  //   });
  //   const content = await rawResponse.json();
  
  //   console.log(content);
  //   if(content){
  //       //this.setState({isLoading:false,obj:content})
  //       ToastAndroid.show('Report and details are updated', ToastAndroid.SHORT);
  //   }
  // })();
}

render() {
  const { image, hasCameraPermission } = this.state;
  if (hasCameraPermission === null) {
   return <View />
  }
  //,() => this.uploadImage2()
  else if (hasCameraPermission === false) {
   return <Text>Access to camera has been denied.</Text>;
  }
  else {
   return (
     <ScrollView>
    <View style={styles.container}>

  
 
                       



    {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}> */}
      
     



    {/* </View> */}


    <Text style={{color: "gray"}}>CAG</Text>

<Picker
  placeholder="CAG"
  selectedValue={this.state.CAG}
  // style={{ height: 50,left:240,width:100 }}
  style={ styles.inputStyle2 }
  onValueChange={(itemValue, itemIndex) => this.setState({ CAG: itemValue })}>
    <Picker.Item label="Select CAG" value="" />
  <Picker.Item label="SVD" value="SVD" />
  <Picker.Item label="DVD" value="DVD" />
  <Picker.Item label="TVD" value="TVD" />
  
</Picker>

<Text style={{color: "gray"}}>PTCA</Text>

<Picker
  placeholder="PTCA"
  selectedValue={this.state.PTCA}
  // style={{ height: 50,left:240,width:100 }}
  style={ styles.inputStyle2 }
  onValueChange={(itemValue, itemIndex) => this.setState({ PTCA: itemValue })}>
    <Picker.Item label="Select PTCA" value="" />
  <Picker.Item label="LMCA" value="LMCA" />
  <Picker.Item label="LAD" value="LAD" />
  <Picker.Item label="LCX" value="LCX" />
  <Picker.Item label="RCA" value="RCA" />
  
</Picker>


        <TextInput
          style={styles.inputStyle}
          placeholder="Hemoglobin%"
          value={this.state.hemoglobin}
          onChangeText={(val) => this.updateInputVal(val, 'hemoglobin')}
          maxLength={15}
          
        /> 

<TextInput
          style={styles.inputStyle}
          placeholder="EF%"
          value={this.state.EF}
          onChangeText={(val) => this.updateInputVal(val, 'EF')}
          maxLength={15}
          
        /> 

<TextInput
          style={styles.inputStyle}
          placeholder="Serum Creatinine"
          value={this.state.SerumCreatinine}
          onChangeText={(val) => this.updateInputVal(val, 'SerumCreatinine')}
          maxLength={15}
          
        /> 

<Text>CAG report</Text>
     <Button
     type={this.state.butId1?"solid":"outline"} 
       onPress={()=>{this._getPhotoLibrary(),this.parameter("CAG_report","CAG Image")}} 
       title="upload report in image format"
     />

     <Text style={{justifyContent:'center',left:140}}>OR</Text>
          <Button
          type={this.state.butId2?"solid":"outline"} 
       onPress={()=>{this._getPdfLibrary(),this.parameter("CAG_report","CAG PDF")}} 
       title="upload report in pdf format"
     />

<Text>Discharge report</Text>
     <Button
     type={this.state.butId3?"solid":"outline"} 
       onPress={()=>{this._getPhotoLibrary(),this.parameter("Discharge_report","Discharge Image")}} 
       title="upload report in image format"
     />

<Text style={{justifyContent:'center',left:140}}>OR</Text>
          <Button
          type={this.state.butId4?"solid":"outline"} 
       onPress={()=>{this._getPdfLibrary(),this.parameter("Discharge_report","Discharge PDF")}} 
       style={{paddingBottom:15}}
       title="upload report in pdf format"
     />

<View style={styles.hairline} />


    <Button
          color="#3740FE"
          title="Submit"
          
          onPress={() =>this.subMit()}
        />  
   </View>
   </ScrollView>
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
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  inputStyle2: {
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
    
    height: 8,
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




