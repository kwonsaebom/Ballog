import React, { useState } from 'react';
import { colors } from '../global';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';

const TeamSelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: 'KIA 타이거즈', image: require('../assets/Teams/KIA.png') },
    { label: 'LG 트윈스', image: require('../assets/Teams/LG.png') },
    { label: '삼성 라이온즈', image: require('../assets/Teams/Samsung.png') },
    { label: '두산 베어스', image: require('../assets/Teams/Doosan.png') },
    { label: 'NC 다이노스', image: require('../assets/Teams/NC.png') },
    { label: 'SSG 랜더스', image: require('../assets/Teams/SSG.png') },
    { label: 'KT 위즈', image: require('../assets/Teams/KT.png') },
    { label: '롯데 자이언츠', image: require('../assets/Teams/LOTTE.png') },
    { label: '한화 이글스', image: require('../assets/Teams/Hanwha.png') },
    { label: '키움 히어로즈', image: require('../assets/Teams/Kiwoom.png') },
  ];

  const onPressHandler = () => {
    console.log("Selected Option:", selectedOption);
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.logo}>Ballog</Text>
        </View>
      </SafeAreaView>
      <View style={styles.contentContainer}>
        <View style={styles.TeamText}>
          <Text style={styles.MyTeam}>My Team </Text>
          <Text style={styles.SelectText}>을 선택하세요</Text>
        </View>
        <ScrollView contentContainerStyle={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, selectedOption === option.label && styles.selectedOptionButton]}
              onPress={() => setSelectedOption(option.label)}
            >
              <Text style={styles.optionButtonText}>{option.label}</Text>
              <Image source={option.image} style={styles.optionImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={onPressHandler}>
          <Text style={styles.buttonText}>적용</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  contentContainer: {
    height: 700,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  TeamText:{
    flexDirection: 'row',
    marginVertical: 13,
  },

  MyTeam:{
    color: colors.primary,
    fontWeight: '700',
    fontSize: 27,
  },
  SelectText:{
    fontWeight: '700',
    fontSize: 26,
  }, 
  optionsContainer: {
    flexGrow: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    width: '30%',
    height: 125,
    padding: 5,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  selectedOptionButton: {
    borderWidth: 3,
    borderColor: colors.primary,
  },
  optionImage: {
    width: 70,
    height: 95,
    marginBottom: 5,
  },
  optionButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    height: 55,
    padding: 10,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default TeamSelect;
