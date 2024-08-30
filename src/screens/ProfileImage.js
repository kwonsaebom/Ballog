import React, { useEffect, useState } from 'react';
import { colors } from '../global';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { store } from '../utils/secureStore'
import axios from 'axios';

const ProfileImage = () => {

  const [userName, setUserName] = useState(null); // State to hold
  const [userIcon, setUserIcon] = useState(null); //

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await store.get('accessToken');
        
        if (token) {
          const url = 'https://api.ballog.store/auth/signUp/setting';
          const response = await axios.get(url, {
            headers: {
              Authorization: token, // Set Authorization header
            },
          });
          setUserName(response.data.result.user_name); // Set user_name to state
          setUserIcon(response.data.result.user_icon); // Set user_icon URL to state
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data when component mounts or token changes
  }, []); // Empty dependency array to run only once on mount
  
  const navigation = useNavigation(); // Initialize navigation
  const onPressHandler = () => {
      navigation.navigate('TeamSelect'); // Navigate to LoginPage
  };
  const navigateBack = () => {
    navigation.goBack();
  };


  return (
    <View style={styles.wrapper}>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.returnButton} onPress={navigateBack}>
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.TeamText}>
          <Text style={styles.SelectText}><Text style={styles.MyTeam}>Ballog </Text>에서 사용할 {'\n'}프로필 사진을 등록하세요</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Image style={styles.image} source={{ uri: userIcon }} />
            <TouchableOpacity style={styles.uploadButton} onPress={onPressHandler}>
                <Image style={styles.Uploadimage} source={require('../assets/Upload.png')} />
            </TouchableOpacity>
            <Text style={styles.username}>{userName}</Text>
            <TouchableOpacity style={styles.button} onPress={onPressHandler}>
              <Text style={styles.buttonText}>시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.lateButton} onPress={onPressHandler}>
              <Text style={styles.buttonText}>나중에 바꿀래요</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    marginTop: 140,
    height: 700,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  TeamText:{
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 13,
    marginBottom: 50,
    marginLeft: 10,
  },
  MyTeam:{
    color: colors.primary,
    fontWeight: '700',
    fontSize: 30,
  },
  SelectText:{
    fontWeight: '700',
    fontSize: 29,
  }, 
  buttonContainer:{
    alignItems: 'center',
  },
  image: {
    width: 153,  
    height: 153, 
    resizeMode: 'contain',
  }, 
  uploadButton:{
    position: 'absolute',
    bottom: 225,
    right: 100,
  },
  Uploadimage:{
    width: 45,  
    height: 45, 
  },
  username:{
    fontSize: 22,
    fontWeight: '700',
    marginTop: 20,
  },
  button: {
    borderWidth: 2,
    borderColor: colors.primary,
    width: '100%',
    height: 55,
    padding: 10,
    borderRadius: 44,
    justifyContent: 'center',
    marginTop: 80,
  },
  buttonText: {
    color: colors.primary,
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
  },
  lateButton: {
    borderColor: colors.primary,
    width: '100%',
    height: 55,
    borderRadius: 44,
    justifyContent: 'center',
  },
});

export default ProfileImage;
