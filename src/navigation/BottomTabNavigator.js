import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import ClipsScreen from '../screens/ClipsScreen';
import CommunityScreen from '../screens/CommunityScreen';
import MyPageStackNavigator from './MyPageStackNavigator';
import NotificationScreen from '../screens/NotificationScreen';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../global';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === '홈') {
            iconName = 'home-sharp';
          } else if (route.name === '글쓰기') {
            iconName = 'pencil';
          } else if (route.name === '경기 짤방') {
            iconName = 'play-circle';
          } else if (route.name === '커뮤니티') {
            iconName = 'chatbubbles';
          } else if (route.name === '마이페이지') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          height: 80,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="경기 짤방" component={ClipsScreen} />
      <Tab.Screen name="글쓰기" component={PostScreen} />
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="커뮤니티" component={CommunityScreen} />
      <Tab.Screen name="마이페이지" component={MyPageStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;