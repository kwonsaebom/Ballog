import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Modal, Button } from 'react-native';
import { colors } from '../global';
import { WebView } from 'react-native-webview'; // WebView import
import axios from 'axios';

const Login = () => {
  let code;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUrl, setModalUrl] = useState(null); //

  const fetchData = async (url) => {
    try {
      console.log("1. ", url)
      // GET 요청을 보내고 응답을 받아옵니다.
      const response = await axios.get(url);
  
      // 응답에서 데이터와 헤더를 읽습니다.
      const data = response.data;
      const headers = response.headers;
  
      // 데이터와 헤더를 콘솔에 출력합니다.
      console.log('Response Headers:', headers);
    } catch (error) {
      // 오류가 발생하면 콘솔에 출력합니다.
      console.error('Error fetching data:', error);
    }
  };
  
  // 함수를 호출하여 데이터를 가져옵니다.
  
  let preUrl;
  const handleNavigationStateChange = (navState) => {
    
    const url = navState.url;
    const targetString = modalUrl;
    if (url.includes(targetString+'/redirect') && !url.includes('oauth') && url !== preUrl) {
      console.log("3. ", preUrl)
      console.log("2. ", url)
      code = url.split('?')[1]
      const redirect_url = modalUrl + '/token?' + code
      fetchData(redirect_url);
      setModalVisible(false);
      preUrl = url;
      console.log("4. ", preUrl)
    }    
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
      <TouchableOpacity style={styles.button} onPress={() => {
            setModalVisible(true)
            setModalUrl('http://192.168.1.7:3000/auth/login/google')
          }
        }>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/Google.png')} />
        </View>
        <Text style={styles.buttonText}>구글로 계속하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {
            setModalVisible(true)
            setModalUrl('http://192.168.1.7:3000/auth/login/naver')
          }
        }>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/Google.png')} />
        </View>
        <Text style={styles.buttonText}>네이버로 계속하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {
            setModalVisible(true)
            setModalUrl('http://192.168.1.7:3000/auth/login/kakao')
          }
        }>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/Google.png')} />
        </View>
        <Text style={styles.buttonText}>카카오로 계속하기</Text>
      </TouchableOpacity>

      {/* 카카오 로그인 모달 */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <WebView
            source={{ uri: modalUrl }}
            onNavigationStateChange={handleNavigationStateChange}
            style={styles.webView}
          />
          <Button title="닫기" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  webView: {
    flex: 1,
    width: 300,
    height: 300,
  },
});

export default Login;
