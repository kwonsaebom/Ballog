// MyPageStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen from '../screens/MyPageScreen';
import SettingScreen from '../screens/SettingScreen';
import LogoutScreen from '../screens/LogoutScreen';
import MyPostScreen from '../screens/MyPostScreen';

const Stack = createStackNavigator();

const MyPageStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyPageScreen" component={MyPageScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
      <Stack.Screen name="LogoutScreen" component={LogoutScreen}/>
      <Stack.Screen name="MyPostScreen" component={MyPostScreen}/>
    </Stack.Navigator>
  );
};

export default MyPageStackNavigator;
