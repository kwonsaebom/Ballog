import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // useNavigation 훅을 임포트
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  const navigation = useNavigation(); // 네비게이션 객체

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.logo}>Ballog</Text>
        <TouchableOpacity
          style={styles.notificationIcon}
          onPress={() => navigation.navigate('NotificationScreen')} 
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#b91d47',
    marginLeft: 10,
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