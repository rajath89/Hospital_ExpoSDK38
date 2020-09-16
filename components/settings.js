import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import {CheckBox} from "native-base"
import { CheckBox } from 'react-native-elements'
import { AsyncStorage } from 'react-native';

import {connect} from 'react-redux';
import english from './actions/langActions';
import kannada from './actions/langActions2';
import RAN from './actions/ranNumber';
import { ToastAndroid } from 'react-native';



class Settings extends React.Component {
  state={
    selectedLang:null,
    red:"world"
  }




 _storeData = async () => {

      console.log("KANNADA lang stored");
      try {
        await AsyncStorage.setItem('kannadaLang', 'TRUE');
            
      } catch (error) {
        // Error saving data
      }
     
};

_storeData2 = async () => {

  console.log("ENGLISH lang stored");
  try {
    await AsyncStorage.setItem('kannadaLang', 'FALSE');
        
  } catch (error) {
    // Error saving data
  }
 
};

  onPress=()=>{


    //console.log("ran%^&&&**(*(*(",this.props.RAN());




    if(this.state.selectedLang==1){
        console.log("lang not changed");
        this._storeData2();
       this.props.english();
        //this.props.RAN();
        ToastAndroid.show('Language changed to english', ToastAndroid.LONG);
        

    }else if(this.state.selectedLang==2){
        console.log("lang changed to kannada");
        this._storeData();
        this.props.kannada();
        ToastAndroid.show('Language changed to kannada', ToastAndroid.LONG);


    }

    

    this.props.navigation.navigate('Jayadeva Hrudaya Spandana');



  }


  render(){
    console.log(this.props.red.dec);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Change Language</Text>
        <View style={styles.item} >
            <CheckBox checked={this.state.selectedLang===1} color="#3740FE" onPress={()=>this.setState({selectedLang:1})}/>
            <Text style={
              {...styles.checkBoxTxt,
                color:this.state.selectedLang===1?"#3740FE":"gray",
                fontWeight:this.state.selectedLang===1? "bold" :"normal"
              }}
              >English</Text>
        </View>
        <View style={styles.item}>
            <CheckBox checked={this.state.selectedLang===2} color="#3740FE" onPress={()=>this.setState({selectedLang:2})}/>
            <Text style={
              {...styles.checkBoxTxt,
                color:this.state.selectedLang===2?"#3740FE":"gray",
                fontWeight:this.state.selectedLang===2? "bold" :"normal"
              }}
              >Kannada</Text>
        </View>

        <TouchableOpacity style={styles.submit} onPress={this.onPress}>
          <Text style={{color:"white"}}>UPDATE</Text>
        </TouchableOpacity>

       


  
  
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize:22,
    
    fontWeight:"bold",
    color:"#364f6b",
    marginBottom:40,
    marginLeft:20,
    marginRight:20
  },
  item:{
    width:"60%",
    backgroundColor:"#fff",
    borderRadius:15,
    padding:5,
    marginBottom:10,
    flexDirection:"row",
  },
  checkBoxTxt:{
    marginLeft:10,
    top:13,
    fontSize:16
  },
  submit:{
    width:"60%",
    backgroundColor:"#3740FE",
    borderRadius:20,
    padding:10,
    alignItems:"center",
    marginTop:40
  }
});

function mapStateToProps(state){
  return{
    red:state
  }
}


export default connect(mapStateToProps,{english,kannada,RAN})(Settings)