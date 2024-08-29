import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 
import axios from 'axios'; 

const useCommonNavigation = () => {
    const navigation = useNavigation();
  
    const navigateTo = (screenName) => {
      navigation.navigate(screenName);
    };

    const navigateBack = () => {
        navigation.goBack();
      };
  
    return {
      navigateTo,
      navigateBack,
    };
  };

const SettingScreen = () => {

    const { navigateTo, navigateBack } = useCommonNavigation();
    const [selectedImage, setSelectedImage] = useState(null);

    // 갤러리에서 이미지 선택 함수
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // 선택된 이미지 URI 저장
      patchImageToServer(result.assets[0].uri); // 이미지 서버로 전송
    }
  };

  // 선택된 이미지를 서버로 PATCH 요청
  const patchImageToServer = async (imageUri) => {
    const formData = new FormData();
    formData.append('profileImage', {
      uri: imageUri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });

    try {
        const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5iYWxsb2cuc3RvcmUiLCJzdWIiOiJ0ZXN0MiIsImlhdCI6MTcyMzQwMjM2OSwiZXhwIjoxNzIzNDA5NTY5fQ.TytMNQouqNsLOUcYXuK5uSOY8Xo8KAFsbUhy5Fjo_d8 ';

      const response = await axios.patch('https://api.ballog.store/myPage/setting/backgroundImg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        Alert.alert('성공', '프로필 이미지가 업데이트되었습니다.');
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      Alert.alert('오류', '이미지 업로드 중 오류가 발생했습니다.');
    }
  };

    return (
        <View style={styles.container}>
            <View style={styles.bar}>
                <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>설정</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigateTo('LogoutScreen')}>
                <View style={styles.texts}>
                    <Text style={styles.MainText}>홍길동</Text>
                    <Text style={styles.SubText}>Google 계정</Text>
                </View>
                <Image style={styles.ProfileImage} source={require('../assets/Profile.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.MainText}>프로필 배경</Text>
                {selectedImage ? (
                    <Image style={styles.BackImage} source={{ uri: selectedImage }} />
                    ) : (
                     <Image style={styles.BackImage} source={require('../assets/basic.png')} />
                    )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigateTo('TeamSelect')}>
                <View style={styles.texts}>
                    <Text style={styles.MainText}>마이팀 변경</Text>
                    <Text style={styles.SubText}>두산 베어스</Text>
                </View>
                <Image style={styles.TeamImage} source={require('../assets/Teams/Doosan.png')} />
            </TouchableOpacity>
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
        paddingHorizontal: 15, 
        marginTop: 15,
        marginBottom: 7,
        width: '100%', 
    },
    backButton: {
        position: 'absolute',
        marginHorizontal: 13,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        height: 97,
        backgroundColor: '#D9D9D9',
        marginVertical: 8,
    },
    texts: {
        flexDirection: 'column',
    },
    MainText: {
        fontSize: 18,
        fontWeight: '600',
    },
    SubText: {
        fontSize: 10,
        fontWeight: '400',
        marginVertical: 5,
    },
    ProfileImage: {
        width: 57,
        height: 57,
    },
    BackImage:{
        width: 84,
        height: 71,
        borderRadius: 10,
    },
    TeamImage: {
        width: 51,
        height: 71,
    },
});

export default SettingScreen;
