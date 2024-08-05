// StackNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import Header from "../components/Header";
import StartPage from "../screens/StartPage"; // StartPage 파일 경로
import Login from "../screens/Login"; // Login 파일 경로
import TeamSelect from "../screens/TeamSelect";
import ProfileImage from "../screens/ProfileImage";
import CommunityScreen from "../screens/CommunityScreen";
import ComuWriteScreen from "../screens/ComuWriteScreen";
import ComuPostedScreen from "../screens/ComuPostedScreen";
import LeagueComuScreen from "../screens/LeagueComuScreen";
import MyTeamComuScreen from "../screens/MyTeamComuScreen";
import NotificationScreen from "../screens/NotificationScreen";
import CheckPost from "../screens/CheckPostScreen";
import PostScreen from "../screens/PostScreen";
import Comment from "../screens/CommentScreen";
import Modify from "../screens/ModifyScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => <Header />, // 커스텀 헤더를 적용
        }}
      >
        <Stack.Screen
          name="StartPage"
          component={StartPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={BottomTabNavigator}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TeamSelect"
          component={TeamSelect}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileImage"
          component={ProfileImage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CommunityScreen" component={CommunityScreen} />
        <Stack.Screen name="ComuWriteScreen" component={ComuWriteScreen} />
        <Stack.Screen name="ComuPostedScreen" component={ComuPostedScreen} />
        <Stack.Screen name="LeagueComuScreen" component={LeagueComuScreen} />
        <Stack.Screen name="MyTeamComuScreen" component={MyTeamComuScreen} />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen name="CheckPost" component={CheckPost} />
        <Stack.Screen name="PostScreen" component={PostScreen} />
        <Stack.Screen name="Comment" component={Comment} />
        <Stack.Screen name="Modify" component={Modify} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
