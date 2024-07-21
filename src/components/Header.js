import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.logo}>Ballog</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { // 아이폰에서는 다이나믹 아일랜드 양옆
    backgroundColor: '#f8f8f8',
  },
  header: { // 헤더 자체
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  logo: { // 앱 로고
    fontSize: 30,
    fontWeight: '800',
    color: '#b91d47',
    marginLeft : 10,
  },
  notificationIcon: { // 알림
    padding: 5,
  },
  separator: { // 구분선
    height: 1,
    backgroundColor: '#ddd',
  },
});

export default Header;