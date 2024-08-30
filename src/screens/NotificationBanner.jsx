import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { getSocket } from './../utils/socket';

const NotificationBanner = () => {
  const [message, setMessage] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0)); // 초기 투명도 0 (보이지 않음)

  useEffect(() => {
    const socket = getSocket(); // 이미 연결된 웹소켓 인스턴스를 가져옴

    socket.on('ararm', (data) => {
      console.log('Received message:', data);
      showMessage(data); // 메시지가 도착할 때마다 배너 표시
    });
  }, []);

  const showMessage = (data) => {
    setMessage(data);

    // 배너를 나타나게 하는 애니메이션 (투명도 0 -> 1)
    Animated.timing(fadeAnim, {
      toValue: 1, // 완전히 보이도록 설정
      duration: 500, // 0.5초 동안 애니메이션
      useNativeDriver: true,
    }).start(() => {
      // 일정 시간 후에 배너를 자동으로 숨김
      setTimeout(hideMessage, 3000); // 3초 동안 표시
    });
  };

  const hideMessage = () => {
    // 배너를 다시 숨기는 애니메이션 (투명도 1 -> 0)
    Animated.timing(fadeAnim, {
      toValue: 0, // 완전히 사라지도록 설정
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setMessage(null); // 메시지를 지움
    });
  };

  return (
    message && (
      <Animated.View style={[styles.banner, { opacity: fadeAnim }]}>
        <Text style={styles.bannerText}>{message}</Text>
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 100, // 화면의 상단에서 100px 아래 위치
    width: Dimensions.get('window').width,
    backgroundColor: '#f8d7da',
    padding: 15,
    alignItems: 'center',
    zIndex: 1000, // 배너가 다른 UI 요소 위에 표시되도록
  },
  bannerText: {
    color: '#721c24',
    fontWeight: 'bold',
  },
});

export default NotificationBanner;