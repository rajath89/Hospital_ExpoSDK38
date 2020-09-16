import { createDrawerNavigator } from '@react-navigation/drawer';
import Faqpage from './faqPage';
import Fire from './dashboard';
import * as React from 'react';

import { Modal, Button, View,Text, StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    
            <Drawer.Navigator>
      <Drawer.Screen name="Dashboard" component={Fire} />
      <Drawer.Screen name="Feed" component={Faqpage} />
      
    </Drawer.Navigator>



  );
}