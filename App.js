// App.js
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useFonts from './src/hooks/useFonts';
import StackNavigator from './src/navigation/StackNavigator';
import { PostsProvider } from './src/Context API/PostsContext';
import { CommentsProvider } from './src/Context API/CommentsContext';
import { getSocket } from './src/utils/socket';  // 웹소켓을 관리하는 파일을 import
import NotificationBanner from './src/screens/NotificationBanner'

export default function App() {
  useEffect(() => {
    const userId = 'test1'; // 사용자 ID를 설정
    getSocket(userId); // 앱이 시작될 때 웹소켓 연결 초기화
  }, []);
  
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PostsProvider>
      <NotificationBanner/>
      <CommentsProvider>
        <StackNavigator />
        <StatusBar style="auto" />
      </CommentsProvider>
    </PostsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});