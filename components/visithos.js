import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text,SafeAreaView, ScrollView} from 'react-native';
//import all the components we are going to use.
//import {Container, Content,Card} from 'native-base';
import Constants from 'expo-constants';
import { AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';


export default class Visit extends Component {


  state = {
    id:null,
    txt:null
  };


  async _retrieveData() {
    try {
      const value = await AsyncStorage.getItem('ID');
      const value2 = await AsyncStorage.getItem('lang');
      console.log("lang",value2);
      if (value !== null && value2=="false") {
        // We have data!!
        const text={9:"Visit Hospital",15:"Visit hospital at the earliest",16:"Visit hospital at the earliest"}
        console.log("ID from visithos component",value);
        this.setState({id:value,txt:text[value]});

      }else if (value !== null && value2=="true") {
        // We have data!!
        const text={9:"ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ",15:"ತಕ್ಷಣ ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ",16:"ತಕ್ಷಣ ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ"}
        console.log("ID from visithos component",value);
        this.setState({id:value,txt:text[value]});

      }
    } catch (error) {
      // Error retrieving data
    }
  }
  
   async componentDidMount() {

  
    this._retrieveData();
  
    
   }



  render() {

    
    return (
    //     <View>
    //         <Card style={{padding: 10, margin: 10}}>
    //     <Text>Open up App.js to start working on your app!</Text>
    //     <Text>Changes you make will automatically reload.</Text>
    //     <Text>Shake your phone to open the developer menu.</Text>
    //   </Card>
    //   <Card style={{padding: 10, margin: 10}}>
    //     <Button
    //       onPress={()=>{}}
    //       title="Learn More"
    //       color="#841584"
    //       accessibilityLabel="Learn more about this purple button"
    //     />
    //   </Card>
    //   <Card style={{padding: 10, margin: 10, height: 50}}>
    //   </Card>
                
    // </View>
    // <SafeAreaView>
    // <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
    {/* <View style={styles.card}>
      <View style={styles.header}>
        
        <Text style={{fontWeight:"bold",fontSize:18}}>Understanding Diabetes</Text>
      </View>
      <Text style={{color:"gray"}}>The food we eat contains carbohydrates which are broken
down into glucose by digestion and is released into the
blood.
Insulin is a hormone naturally released by the pancreas
which helps the cells to take up glucose.
Diabetes can result from

• the ineffectiveness of the action of insulin - because
body develops resistance to its action.
• or insufficient release from pancreas.
 </Text>
    </View>
    <View style={styles.separator}/> */}

    {/* <View style={styles.card}> */}
      {/* <View style={styles.header}>
        
        <Text style={{fontWeight:"bold",fontSize:18}}>React Native Master</Text>
      </View> */}
      
    {this.state.id && <Text style={{fontWeight:"bold",fontSize:18,justifyContent: 'center',paddingBottom:25}}>{this.state.txt}</Text>}
    <Button
  title="Go back to dashboard"
  type="clear"
  raised={true}
  onPress={()=> this.props.navigation.navigate('Cardio App')}
/>

   
      
    {/* </View> */}
    {/* <View style={styles.separator}/>

    <View style={styles.card}>
      <View style={styles.header}>
        
        <Text style={{fontWeight:"bold",fontSize:18}}>React Native Master</Text>
      </View>
      <Text style={{color:"gray"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida, metus eleifend vulputate fringilla, ligula odio vehicula tortor, ut iaculis nulla eros id turpis. </Text>
    </View>
    <View style={styles.separator}/>

    <View style={styles.card}>
      <View style={styles.header}>
        
        <Text style={{fontWeight:"bold",fontSize:18}}>React Native Master</Text>
      </View>
      <Text style={{color:"gray"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida, metus eleifend vulputate fringilla, ligula odio vehicula tortor, ut iaculis nulla eros id turpis. </Text>
    </View>
    <View style={styles.separator}/>

    <View style={styles.card}>
      <View style={styles.header}>
        
        <Text style={{fontWeight:"bold",fontSize:18}}>React Native Master</Text>
      </View>
      <Text style={{color:"gray"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida, metus eleifend vulputate fringilla, ligula odio vehicula tortor, ut iaculis nulla eros id turpis. </Text>
    </View>
    <View style={styles.separator}/>

    <View style={styles.card}>
      <View style={styles.header}>
        
        <Text style={{fontWeight:"bold",fontSize:18}}>React Native Master</Text>
      </View>
      <Text style={{color:"gray"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus gravida, metus eleifend vulputate fringilla, ligula odio vehicula tortor, ut iaculis nulla eros id turpis. </Text>
    </View> */}

  </View>
  // </ScrollView>
  // </SafeAreaView>
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
    height:200,
    width:"93%",
    backgroundColor:"white",
    borderRadius:15,
    elevation:10,
    padding:10
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
  separator: {
    marginVertical: 8,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  scrollView: {
    
    marginHorizontal: 2,
  }
});




