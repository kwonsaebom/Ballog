import React from 'react';
import { colors } from '../global';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';

const ProfileImage = () => {
  

  const onPressHandler = () => {
    console.log("Selected Option:");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.returnButton} onPress={onPressHandler}>
            <Image style={styles.returnImage} source={require('../assets/Return.png')} />
        </TouchableOpacity>
        <View style={styles.TeamText}>
          <Text style={styles.SelectText}><Text style={styles.MyTeam}>Ballog </Text>에서 사용할 {'\n'}프로필 사진을 등록하세요</Text>
        </View>
        <View style={styles.buttonContainer}>
            <Image style={styles.image} source={require('../assets/Profile.png')} />
            <TouchableOpacity style={styles.uploadButton} onPress={onPressHandler}>
                <Image style={styles.Uploadimage} source={require('../assets/Upload.png')} />
            </TouchableOpacity>
            <Text style={styles.username}>홍길동</Text>
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
  returnImage:{
    width: 38,  
    height: 38,
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
