//version 1.0.0

import * as React from 'react';
import { NavigationContainer ,DarkTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';

import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import dashboardV2 from './components/dashboardV2';
import NewQues from './components/NewQues';
import AfterQuestions from './components/afterques';
import updatePro from './components/updatePro';
import viewPro from './components/viewPro';
import pdfViewer from './components/pdfviewer';
import Faqpage from './components/faqPage';
import MyDrawer from './components/drawnav';
import Settings from './components/settings';
import Diabetes from './components/learMaterials/diabetes';
import Cholestrol from './components/learMaterials/cholestrol';
import BP from './components/learMaterials/bp';
import Smoking from './components/learMaterials/smoking';
import PA from './components/learMaterials/pa';
import HA from './components/learMaterials/ha';
import AP from './components/learMaterials/ap';
import Medrisk from './components/ques/medrisk';
import Medhist from './components/ques/medhist';
import Treat from './components/ques/treat';

//import OneSignal from 'react-native-onesignal';

import Global from './components/contexts/global';


// import { Container, Button, text, ListItem, Text } from "native-base";
import Expo from "expo";
import Visit from './components/visithos';
import Icon from 'react-native-vector-icons/FontAwesome';
import CameraComponent from './components/Camera';
import About from './components/about';

// import Smoking from './components/learMaterials/smoking';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './components/reducers/langReducer';

import ForgotPassword from './components/forgotPasswd';
import AboutDoctor from './components/doctorTeam';
import Comments2 from './components/comments2';
import DoctorComments from './components/doctorComments';
import Diet from './components/learMaterials/diet';
import Disclaimer from './components/disclamer';


const store=createStore(reducer);



const Stack = createStackNavigator();



function MyStack() {

console.log(store.getState());

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
       name="Jayadeva Hrudaya Spandana" 
       component={dashboardV2} 
       options={
         { headerLeft: null }
        //  {headerLeft: () => (
        //    <Icon.Button name="gear" size={25} backgroundColor="#009387" onPress={()=>navigation.openDrawer()}></Icon.Button>
        //  )} 
       }
      />

       <Stack.Screen 
       name="Questions" 
       component={NewQues} 
      //  options={
      //    //{ title: 'Dashboard' },
      //    {headerLeft: null} 
      //  }
      />

             <Stack.Screen 
       name="BP & Lab reports" 
       component={AfterQuestions} 
      //  options={
      //    //{ title: 'Dashboard' },
      //    {headerLeft: null} 
      //  }
      />

<Stack.Screen 
       name="Update Profile" 
       component={updatePro} 
      //  options={
      //    //{ title: 'Dashboard' },
      //    {headerLeft: null} 
      //  }
      />
<Stack.Screen 
       name="View Profile" 
       component={viewPro} 
      //  options={
      //    //{ title: 'Dashboard' },
      //    {headerLeft: null} 
      //  }
      />
    

<Stack.Screen 
name="Learning Materials" 
component={pdfViewer} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="FAQ page" 
component={Faqpage} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Message" 
component={Visit} 
 options={
   //{ title: 'Dashboard' },
   {headerLeft: null} 
 }
/>


<Stack.Screen 
name="CAG & Discharge" 
component={CameraComponent} 
//  options={
//    //{ title: 'Dashboard' },
    
//  }
/>

<Stack.Screen 
name="Diabetes" 
component={Diabetes} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Cholestrol" 
component={Cholestrol} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Blood Pressure" 
component={BP} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Smoking" 
component={Smoking} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Physical Activity" 
component={PA} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Heart Attack" 
component={HA} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Angioplasty" 
component={AP} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Medical Risk Factors" 
component={Medrisk} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null},
//    {headerRight: () => (
//     <Button
//       onPress={() => alert('This is a button!')}
//       title="Info"
//       color="#fff"
//     />
//   )}
//  }
/>

<Stack.Screen 
name="Symptoms" 
component={Medhist} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Treatment Compliance" 
component={Treat} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Settings" 
component={Settings} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>


<Stack.Screen 
name="Developers" 
component={About} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Forgot Password" 
component={ForgotPassword} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Doctors" 
component={AboutDoctor} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Add Comment" 
component={Comments2} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>



<Stack.Screen 
name="Doctor Comment" 
component={DoctorComments} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>


<Stack.Screen 
name="Diet" 
component={Diet} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Disclaimer" 
component={Disclaimer} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>


</Stack.Navigator>

    

    
  );
}

export default function App() {

  return (
  //theme={DarkTheme}
  
 <Provider store={createStore(reducer)}>

    <NavigationContainer>


      <MyStack />

    </NavigationContainer>
  </Provider>
   
  );
}



