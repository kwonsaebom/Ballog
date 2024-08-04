import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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
            <TouchableOpacity style={styles.button} onPress={() => navigateTo('LogoutScreen')}>
                <Text style={styles.MainText}>프로필 배경</Text>
                <Image style={styles.BackImage} source={require('../assets/basic.png')} />
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
