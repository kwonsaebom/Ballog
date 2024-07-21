// ClipsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClipsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>경기 짤방</Text>
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