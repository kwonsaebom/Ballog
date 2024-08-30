import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { colors } from '../global';

const signUp = () => {
  const customUserAgent = 'customUserAgent';
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [headerInfo, setHeaderInfo] = useState(null);

  const handlesignUp = () => {
    setModalVisible(true); // 웹뷰 모달 열기 
  };

  const fetchRedirectData = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include', // 필요한 경우 쿠키를 포함하여 요청
      });
  
      // 응답 상태 코드 출력
      console.log('응답 상태 코드:', response.status);
  
      // 응답 헤더 추출
      const headers = response.headers;
      console.log('응답 헤더:', headers);
  
      // 특정 헤더 값 가져오기
      const Authorization = headers.get('Authorization'); // 'Authorization' 헤더의 값
      const refreshtoken = headers.get('refreshtoken'); // 'refreshtoken' 헤더의 값
  
      // 특정 헤더 값 출력
      console.log('Authorization 헤더:', Authorization);
      console.log('refreshtoken 헤더:', refreshtoken);
  
      // 응답 본문 읽기
      const responseBody = await response.text(); // 본문을 텍스트로 읽기
      console.log('응답 본문:', responseBody);
      
    } catch (error) {
      console.error('네트워크 요청 실패:', error);
    }
  };

  const handleWebViewNavigationStateChange = (navState) => {
    const redirectUrl = 'http://localhost:3000/auth/login/kakao/redirect';
    if (navState.url.startsWith(redirectUrl)) {
      fetchRedirectData(navState.url)
      //console.log(navState.url)
      //setModalVisible(false);
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
      <TouchableOpacity style={styles.button} onPress={handlesignUp}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../assets/Google.png')} />
        </View>
        <Text style={styles.buttonText}>구글로 계속하기</Text>
      </TouchableOpacity>

      {/* 웹뷰 모달 */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <WebView
            source={{ uri: 'http://localhost:3000/auth/login/kakao' }}
            onNavigationStateChange={handleWebViewNavigationStateChange}
            userAgent={customUserAgent}
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

export default signUp;