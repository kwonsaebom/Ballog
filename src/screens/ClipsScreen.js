// ClipsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import VideoScreen from "./video"

const ClipsScreen = () => {
  return (
    <View style={styles.container}>
      <VideoScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ClipsScreen;