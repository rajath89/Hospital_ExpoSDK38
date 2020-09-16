import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BotTab from './BotTab';
import MyDrawer from './drawnav';

const Tab = createBottomTabNavigator();

export default function dashboardV2() {
  return (
    
    
    <BotTab />
    
  );
}