// MyPageScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity, } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

const MyPageScreen = () => {

  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.navigate('SettingScreen');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/basic.png')}
        style={styles.BasicImage}
      >
        <Image style={styles.TeamImage} source={require('../assets/Teams/Doosan.png')} />
        <TouchableOpacity onPress={onPressHandler}>
            <Image style={styles.SettingImage} source={require('../assets/Setting.png')} />
        </TouchableOpacity>
        <View style={styles.buttonGroup}> 
          <TouchableOpacity style={styles.button} onPress={onPressHandler}>
            <View style={styles.imageContainer}>
              <Image style={styles.ProfileImage} source={require('../assets/Profile.png')} />
            </View>
            <Text style={styles.buttonText}>홍길동</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressHandler}>
            <Image style={styles.image} source={require('../assets/Bookmark.png')} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View style={styles.ScoreContainer}>
        <View style={styles.ScoreResult}>
          <View style={styles.ScoreDate}>
            <Text style={styles.Date}>6/27일 경기</Text>
          </View>
          <Text style={styles.Result}>승</Text>
        </View >
        <View style={styles.Score}>
          <Image style={styles.ScoreImage} source={require('../assets/Teams/Doosan.png')}></Image>
          <Text style={styles.ScoreNum}>5   :   3</Text>
          <Image style={styles.ScoreImage} source={require('../assets/Teams/LG.png')}></Image>
        </View>
      </View>
      <View style={styles.calendarContainer}>
        <ScrollView>
          <Calendar
            style={styles.calendar}
            theme={calendarTheme}
            onDayPress={(day) => {console.log(day)}}
            hideExtraDays={true}
            monthFormat={'yyyy / MM'}
            onMonthChange={(month) => {console.log(month)}}
            renderArrow={(direction) => direction === "left" ?
              <Image style={styles.arrow} name="left" size={20} source={require('../assets/LeftVector.png')}/> :
              <Image style={styles.arrow} name="right" size={20} source={require('../assets/RightVector.png')} />
            }
          />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BasicImage: {
    height: 327,
    width: '100%',
  },
  TeamImage:{
    width: 85,
    height: 85,
    borderRadius: 100,
    margin: 10,
    position: 'absolute',
    right: 10, // Adjust based on your requirement
    Top: 20,
  },
  SettingImage:{
    height: 27,
    width: 27,
    marginTop: 220,
    marginLeft: 20,
    marginBottom: 10,
  },
  buttonGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#fff', 
    width: 146,
    height: 45,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  }, 
  imageContainer: {
    marginHorizontal: 7,
  },
  ProfileImage: {
    width: 37,
    height: 37,
    resizeMode: 'cover',
  },
  image:{
    resizeMode: 'cover',
    width: 44,
    height:44,
  },
  buttonText: {
    flex: 1,
    fontWeight: '600',
    fontSize: 23,
    textAlign: 'center',
  },
  ScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 98,
    width: '100%',
  },
  ScoreResult:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ScoreDate:{
    width: 96,
    height:23,
    backgroundColor: '#C51E3A',
    borderRadius: 20,
    justifyContent: 'center',
    marginBottom: 10,
  },
  Date: {
    textAlign: 'center',
    fontSize: 13,
    color: '#FFFFFF'
  },
  Result: {
    color: '#C51E3A', 
    fontSize: 26,
    fontWeight: '600',
  },
  Score: {
    width: 230,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  ScoreImage: {
    width: 59,
    height: 71,
  },
  ScoreNum: {
    fontSize: 26,
    fontWeight: '800',
  },
  calendarContainer: {
    flex: 1,
    width: '100%',
  },
  calendar: {
    marginTop: 2,
    marginBottom: 5,
  },
  arrow: {
    resizeMode: 'cover',
    width: 6,
    height: 12,
  }
});

const calendarTheme = {
  todayTextColor: 'black',
  textDayFontSize: 15,
  textDayFontWeight: 'bold',
  textMonthFontSize: 15,
  textMonthFontWeight: 'bold',
  textSectionTitleColor: 'rgba(138, 138, 138, 1)',
};


export default MyPageScreen;
