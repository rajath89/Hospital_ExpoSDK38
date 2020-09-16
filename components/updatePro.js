import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator,Vibration, Platform,Picker,TouchableOpacity,ScrollView} from 'react-native';
import firebase from '../database/firebase';
import Dashboard from './dashboard';
import { AsyncStorage } from 'react-native';
import { ToastAndroid } from 'react-native';



import { Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import * as Constant from '../const';



//new notification api

// import Constants from 'expo-constants';
// import * as Notifications from 'expo-notifications';
// import * as Permissions from 'expo-permissions';


import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";


//import { Container, Header, Content, Form, Item, Icon } from 'native-base';




//new notf api
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

export default class updatePro extends Component {
  
  constructor() {
    super();
    this.state = { 
      
      email: '', 
      Name:'',
      Gender:'',
      Age:'',
      MobNumber:'',
      globName:'',
      setDatePickerVisibility:false,

      isLoading: false,
      expoPushToken:'',
      Education:null,
      datebool:false,
      address:"",
      height:"",
      weight:"",
      dateB:false,
      IPnum:null,
      lazyload:true,
      tokenBool:false,

      
      DateOfProcedure:null,
      
      
      

    }
  }




  getprof = () => {

    (async () => {
    const rawResponse = await fetch(Constant.API_URL+'getProfile', {//exp://192.168.0.104:19000
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": this.state.globName})
    });
    const content = await rawResponse.json();
  
    console.log(content);
    if(content.msg=="user not yet registerd"){
     console.log("not registerd");
     this.setState({lazyload:false})
        
    }else{
      console.log("from getprof",content.Age);

      this.setState({
        email: content.email, 
        Name:content.Name,
        Gender:content.Gender,
        Age:content.Age,
        MobNumber:content.MobNumber,

        Education:content.Education,
        
        address:content.address,
        height:content.height,
        weight:content.weight,
        dateB:true,
        IPnum:content.IPnum,
        
        DateOfProcedure:content.DateOfProcedure,
        diagnosis:content.diagnosis,
        lazyload:false
        
        
        
  
      



      })
      
    }
  })();
}

  

  

  componentDidMount() {
   this._retrieveData();
   this.registerForPushNotificationsAsync();
   


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
        if(this.state.globName){
          //this.getMultiple();
          console.log("globNmae");
          //this.getMultiple();
          this.getprof();
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  }



    registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      console.log("hit expo token");
      try {
        const token = await Notifications.getExpoPushTokenAsync();
        //
        if (token){
          this.setState({ expoPushToken: token });
          console.log(token);
          console.log(this.state.globName);
          (async () => {
            const rawResponse = await fetch(Constant.API_URL+'expo', {//exp://192.168.0.104:19000
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({"username": this.state.globName,"expoToken":token})
            });
            const content = await rawResponse.json();
          
            console.log(this.state);

          })();


        }else{
             this.setState({ expoPushToken: "token not fetched" });
           }
           //
    } catch (e) {
        console.error(e);
    }
    console.log("after hit expo token");


      
      
      //console.log("token:",token);

      // if(token){
      //   this.setState({ expoPushToken: token });
      // }else{
      //   this.setState({ expoPushToken: "token not fetched" });
      // }

      

      // if(this.state.expoPushToken){
      //   console.log(this.state.expoPushToken);
      // }

      





    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };





  //new notf api

  // registerForPushNotificationsAsync2 = async () => {
  //   let token;
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }
  
  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }
  
  //   return token;
  // }






  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }





  calBodyMassIndex2=()=>{
    const h=this.state.height/100;
    var BodyMassIndexcal=this.state.weight/(h*h);
    
    return BodyMassIndexcal;

  }


  // componentDidUpdate(prevProps, prevState) {
    
    
  //   if (this.state.BodyMassIndex!=prevState.BodyMassIndex&&this.state.sendData!=prevState.sendData) {
  //     console.log("send data through api");
  //     console.log("sending data______",this.state);
      
  //   }

  // }

  // displayImage=(imageRef)=> {
  //   imageRef.getDownloadURL().then(function(url) {
  //     console.log(url);
  //   }).catch(function(error) {
  //     // Handle any errors
  //   });
  // }



  upprof = () => {



    

    //name
    var nameBool=this.validateName(this.state.Name);
    console.log("namebool",nameBool);


    //email
    if(!this.validateEmail(this.state.email)){
      Alert.alert("Enter valid email");
    }else{
      this.setState({count:this.state.count+1})
    }

    //gender

    var genderBool=this.validateGender(this.state.Gender);

    //age

    var ageBool=this.validateAge(this.state.Age);

    //education
    var eduBool=this.validateEducation(this.state.Education);

    //mob num
    var mobBool=this.validateMob(this.state.MobNumber);

    //address
    var addressBool=this.validateAddress(this.state.address);

    var diagnosisBool=this.validateDiagnosis(this.state.diagnosis);

    var dateBool=this.validateDate(this.state.DateOfProcedure);


    if(nameBool&&this.validateEmail(this.state.email)&&genderBool&&addressBool&&mobBool&&eduBool&&dateBool&&diagnosisBool){
      console.log("fall through");
      
      if(this.state.height==""){

        Alert.alert("Enter your height");
        
      }else if(this.state.weight==""){
        Alert.alert("Enter your weight");
      }else{
        console.log("inside");
        


    (async () => {
    const rawResponse = await fetch('https://flask-app47.herokuapp.com/updatePro', {//exp://192.168.0.104:19000
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"username": this.state.globName,"ProfileDet":this.state})
    });
    const content = await rawResponse.json();
  
    if(content.UpdateProfile=="success"){

      ////

      const val1=this.calBodyMassIndex2();

      (async () => {
        const rawResponse = await fetch('https://flask-app47.herokuapp.com/BMI', {//exp://192.168.0.104:19000
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"username": this.state.globName,"BodyMassIndex":val1})
        });
        const content2 = await rawResponse.json();

        //


    
      })();

      ///

      if(content){
        
        ToastAndroid.show('Profile details are updated', ToastAndroid.SHORT);
        this.setState({ 
         
          email: '', 
          Name:'',
          Gender:'',
          Age:'',
          MobNumber:'',
          
          education:'',
          address:'',
          height:'',
          weight:'',
          diagnosis:'',
          DateOfProcedure:'',
      
          isLoading: false})
        this.props.navigation.navigate('Jayadeva Hrudaya Spandana'); 
          }
    }

  })();
        
      }

    }


 



    


    //this.registerForPushNotificationsAsync();

    //this.calBodyMassIndex();

  //   (async () => {
  //   const rawResponse = await fetch('https://flask-app47.herokuapp.com/updatePro', {//exp://192.168.0.104:19000
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({"username": this.state.globName,"ProfileDet":this.state})
  //   });
  //   const content = await rawResponse.json();
  
  //   console.log(this.state);
  //   if(content){
  //       this.setState({isLoading:false,obj:content});
  // ToastAndroid.show('Profile details are updated', ToastAndroid.SHORT);
  // this.setState({ 
   
  //   email: '', 
  //   Name:'',
  //   Gender:'',
  //   Age:'',
  //   MobNumber:'',
    
  //   education:'',
  //   address:'',
  //   height:'',
  //   weight:'',
  //   diagnosis:'',
  //   DateOfProcedure:'',

  //   isLoading: false})
  // this.props.navigation.navigate('Cardio App'); 
  //   }
  // })();
  //console.log("from upProf",this.state);

  

  // var storageRef = firebase.storage().ref("rajath/cagreport");




  // // Now we get the references of these images
  // storageRef.listAll().then(function(result) {
  //   result.items.forEach(function(imageRef) {
  //     // And finally display them
  //     imageRef.getDownloadURL().then(function(url) {
  //       console.log(imageRef);
  //     }).catch(function(error) {
  //       // Handle any errors
  //     });
  //   });
  // }).catch(function(error) {
  //   // Handle any errors
  // });

  }


  onValueChange2(value) {
    this.setState({
      Education: value
    });
  }

  upPro = () => {
    if(this.state.email === '' && this.state.Name === '') {
      Alert.alert('Enter details to signup!')
    } else {
      console.log(this.state);
      this.setState({
        isLoading: true,
      });
      this.upprof();
    //   firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(this.state.email, this.state.password)
    //   .then((res) => {
    //     res.user.updateProfile({
    //       displayName: this.state.displayName
    //     })
    //     console.log('User registered successfully!')


    //     this.props.navigation.navigate('Login');
        
    //   })
    //   .catch(error => this.setState({ errorMessage: error.message })) 
    ToastAndroid.show('Profile details are updated', ToastAndroid.LONG);
    this.setState({ 
      displayName: '',
      email: '', 
      Name:'',
      Gender:'',
      Age:'',
      MobNumber:'',
      globName:'',
      education:'',
      address:'',
      height:'',
      weight:'',
      diagnosis:'',
      dateOfProcedure:'',

      isLoading: false})
    //this.props.navigation.navigate('Cardio App');     
    }
  }


   datef=()=>{
    this.setState({datebool:true,dateB:true});
   }


   

   onChange1=(event,date)=>{
      console.log("log",date);
   }


 //validations
   validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    };

    validateName=(name)=>{
      if(name==''){
        Alert.alert("Enter valid name");
        return false;
      }else{
        return true;
      }
    }


    validateEducation=(edu)=>{
      if(edu==null){
        Alert.alert("Select education");
        return false;
      }else{
        return true;
      }
    }

    validateGender=(gender)=>{
      if(gender==""){
        Alert.alert("Select your gender");
        return false;
      }else{
        return true;
      }
    }


    validateAge=(age)=>{
      if(age==""){
        Alert.alert("Select your age");
        return false;
      }else{
        return true;
      }
    }


    validateMob=(num)=>{
      if(num==""){
        Alert.alert("Enter your mobile number");
        return false;
      }else if(num.length<10){
        Alert.alert("Mobile number should be 10 digits");
        return false;
      }else if(num.length>10){
        Alert.alert("Mobile number should not be greater than 10 digits");
        return false;
      }

      
      else{
        return true;
      }
    }


    validateAddress=(addr)=>{
      if(addr==""){
        Alert.alert("Enter your address");
        return false;
      }else{
        return true;
      }
    }

    validateDiagnosis=(dia)=>{
      if(dia==""){
        Alert.alert("Enter Diagnosis");
        return false;
      }else{
        return true;
      }
    }


    validateDate=(date)=>{
      if(date==""){
        Alert.alert("Select date of procedure");
        return false;
      }else{
        return true;
      }
    }




    getToken=()=>{
      this.setState({tokenBool:true});
    }

  render() {
    if(this.state.lazyload){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    const { date } = this.state;
    return (
      <ScrollView>
      <View style={styles.container}>  

      <TextInput
          style={styles.inputStyle}
          placeholder="IP Number"
          value={this.state.IPnum}
          onChangeText={(val) => this.updateInputVal(val, 'IPnum')}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.Name}
          onChangeText={(val) => this.updateInputVal(val, 'Name')}
        />      
        <TextInput
        
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
 
        />
        {/* <TextInput
          style={styles.inputStyle}
          placeholder="Gender"
          value={this.state.Gender}
          onChangeText={(val) => this.updateInputVal(val, 'Gender')}
          maxLength={15}
          
        />   */}

<Text style={{color: "gray"}}>Gender</Text>

<Picker
  placeholder="Mobile Number"
  selectedValue={this.state.Gender}
  // style={{ height: 50,left:240,width:100 }}
  style={ styles.inputStyle2 }
  onValueChange={(itemValue, itemIndex) => this.setState({ Gender: itemValue })}>
  <Picker.Item label="Select Gender" value="" />
  <Picker.Item label="Male" value="Male" />
  <Picker.Item label="Female" value="Female" />
  <Picker.Item label="Other" value="Other" />
 
</Picker>

        <TextInput
          style={styles.inputStyle}
          placeholder="Age"
          value={this.state.Age}
          onChangeText={(val) => this.updateInputVal(val, 'Age')}
        />

        <Text style={{color: "gray"}}>Education</Text>

<Picker
  placeholder="Mobile Number"
  selectedValue={this.state.Education}
  // style={{ height: 50,left:240,width:100 }}
  style={ styles.inputStyle2 }
  onValueChange={(itemValue, itemIndex) => this.setState({ Education: itemValue })}>
  <Picker.Item label="Select Education" value="" />
  <Picker.Item label="Not educated" value="Not educated" />
  <Picker.Item label="Primary" value="Primary" />
  <Picker.Item label="Secondary" value="Secondary" />
  <Picker.Item label="Graduate or higher" value="Graduate or higher" />
</Picker>

        <TextInput
          style={styles.inputStyle}
          placeholder="Mobile Number"
          value={this.state.MobNumber}
          onChangeText={(val) => this.updateInputVal(val, 'MobNumber')}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Address"
          value={this.state.address}
          onChangeText={(val) => this.updateInputVal(val, 'address')}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Height(cm)"
          value={this.state.height}
          onChangeText={(val) => {this.updateInputVal(val, 'height')}}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Weight(kg)"
          value={this.state.weight}
          onChangeText={(val) => this.updateInputVal(val, 'weight')}
        />

          <TextInput
          style={styles.inputStyle}
          placeholder="Diagnosis"
          value={this.state.diagnosis}
          onChangeText={(val) => this.updateInputVal(val, 'diagnosis')}

          
        />




{/* <TextInput
          style={styles.inputStyle}
          placeholder="Date of Procedure"
          value={this.state.procedure}
          onChangeText={(val) => this.updateInputVal(val, 'procedure')}

          
        /> */}
{this.state.datebool&&<DateTimePicker testID="dateTimePicker" value={new Date()} mode='date' display="default" onChange={(date,m) => {this.setState({DateOfProcedure:m.toDateString(),datebool:false})}}/>}
 <TouchableOpacity style={styles.button} onPress={this.datef}>
<Text style={{color:"#3740FE"}}>Click to select Date of Procedure</Text>
</TouchableOpacity>


        <View style={styles.hairline} />

        {this.state.dateB&&<Text>Selected date : {this.state.DateOfProcedure}</Text>}



        <View style={styles.hairline} />




        

        <Button
          color="#3740FE"
          title="Update"
          onPress={() => {this.upprof()}}
        />

<View style={styles.hairline} />



{/* <Button
          color="#3740FE"
          title="get token"
          onPress={() => {this.getToken()}}
        />

        {this.state.tokenBool&&<Text>token : {Constant.API_URL+'expo'}</Text>} */}






                                 
      </View>
      </ScrollView>
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
  
  inputStyle2: {
    width: '100%',
    marginBottom: 10,
    paddingBottom: 27,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    color:"gray"
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
    
    height: 18,
    width: 165
  }
});