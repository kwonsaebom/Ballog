import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const Header = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.logo}>Ballog</Text>
        <TouchableOpacity
          style={styles.notificationIcon}
          onPress={() => navigation.navigate('NotificationScreen')} 
        >
          <Ionicons name="notifications-outline" size={width * 0.06} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: width * 0.05, 
    backgroundColor: '#f8f8f8',
  },
  logo: {
    fontSize: width * 0.07, 
    fontWeight: '800',
    color: '#b91d47',
  },
  notificationIcon: {
    padding: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
});

export default Header;