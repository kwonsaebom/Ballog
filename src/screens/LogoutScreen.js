// LogoutScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LogoutScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const onPressHandler = () => {
    setModalVisible(true);
  };

  const handleLogout = () => {
    setModalVisible(false);
    // 로그아웃 처리 로직 추가 해야함
    navigation.navigate("MainTabs", {
      screen: '마이페이지',
    });// 하단탭 문제 해결(MainTab에 속한 마이페이지에 해당하는 스크린으로 이동)
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <TouchableOpacity onPress={() => navigation.navigate('MyPageScreen')}>
          <Image style={styles.ReturnImage} source={require('../assets/LeftVector.png')} />
        </TouchableOpacity>
        <Text style={styles.title}>내 계정</Text>
      </View>
      <Image style={styles.image} source={require('../assets/Profile.png')} />
      <TouchableOpacity style={styles.uploadButton}>
        <Image style={styles.Uploadimage} source={require('../assets/FixButton.png')} />
      </TouchableOpacity>
      <Text style={styles.username}>홍길동</Text>
      <Text style={styles.email}>balllog07@gmail.com</Text>
      <TouchableOpacity style={styles.button} onPress={onPressHandler}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </TouchableOpacity>

      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>로그아웃</Text>
            <Text>로그아웃 하시겠습니까?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButton} onPress={handleCancel}>
                <Text style={styles.modalButtonText}>취소</Text>
              </Pressable>
              <Pressable style={[styles.modalButton, styles.confirmButton]} onPress={handleLogout}>
                <Text style={styles.modalButtonText}>확인</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '100%',
  },
  ReturnImage: {
    width: 6,
    height: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    position: 'absolute',
    left: '50%',
  },
  image: {
    width: 113,
    height: 113,
    resizeMode: 'contain',
    marginTop: 50,
  },
  uploadButton: {
    position: 'absolute',
    top: 175,
    right: 138,
  },
  Uploadimage: {
    width: 32,
    height: 32,
  },
  username: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 7,
  },
  email:{
    fontSize: 12,
  },
  button: {
    backgroundColor: '#C51E3A',
    width: '90%',
    height: 55,
    padding: 10,
    margin: 10,
    marginTop: 300,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#C51E3A',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: '#C51E3A',
  },
});

export default LogoutScreen;
