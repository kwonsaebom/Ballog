// src/screens/Login.js
import React from 'react';
import { colors } from '../global';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {

  const navigation = useNavigation(); // Initialize navigation

    const onPressHandler = () => {
        navigation.navigate('ProfileImage'); // Navigate to LoginPage
    };


  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.logo}>Ballog</Text>
        </View>
      </SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.text}>안녕하세요,{'\n'}회원가입을 환영합니다</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onPressHandler}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/Google.png')} />
        </View>
        <Text style={styles.buttonText}>구글로 계속하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
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
  container: {
    
    marginTop: 280,
    marginLeft: 25,
    height: 100,
  },
  text: {
    fontWeight: '800',
    fontSize: 28,
  },
  button: {
    backgroundColor: colors.primary,
    width: 342,
    height: 55,
    borderRadius: 44,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.primary,
    
  },
  imageContainer: {
    width: 55,
    height: 53,
    borderTopLeftRadius: 44,
    borderBottomLeftRadius: 44,
    overflow: 'hidden',
    backgroundColor: '#fff',  // Adjust this color as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '60%',
    height: '60%',
    resizeMode: 'cover',
  },
  buttonText: {
    flex: 1,
    color: '#fff',
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'center',
  },
});

export default Login;
