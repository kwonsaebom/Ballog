// CommunityScreen.js
import React, {useState} from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import {communityData} from '../data/communitydata';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

export default function CommunityScreen () {
  const [comuLikes, setComuLikes] = useState(communityData.map(comu => comu.likes));

  const handleComuLike = (index) => {
    const newLikes = [...comuLikes];
    newLikes[index] += 1;
    setComuLikes(newLikes);
  };

  return (
    <Wrapper>
      <CtgyWrapper>
        <CtgyButton><CtgyText>리그 커뮤니티</CtgyText></CtgyButton>
        <CtgyButton><CtgyText>마이 팀 커뮤니티</CtgyText></CtgyButton>
      </CtgyWrapper>
      <InputBoxWrapper>
        <Feather name="search" size={16} color="#C51E3A" />
        <InputBox>글을 입력하여주세요</InputBox>
      </InputBoxWrapper>
      <ComuBoxScroll>
        {communityData.map((comu, index) => (
        <ComuBox key={comu.id} isFirst={index === 0}>
          <DetailBox hasImage={!!comu.image}>
            <DetailWrapper>
              <ComuTitle numberOfLines={1}>{comu.title}</ComuTitle>
              <ComuDetail numberOfLines={1}>{comu.detail}</ComuDetail>
            </DetailWrapper>
            <ComuFooter>
              <IconWrapper>
                <LikeIcon onPress={() => handleComuLike(index)}><AntDesign name="hearto" size={10} color="#E05936" /></LikeIcon>
                <LikeCount>{comuLikes[index]}</LikeCount>
                <ChatIcon><MaterialCommunityIcons name="message-reply-outline" size={10} color="#8892F7" /></ChatIcon>
                <ChatCount>{comu.comments}</ChatCount>
              </IconWrapper>
              <DateTime>{`| ${comu.date} ${comu.time} | ${comu.username}`}</DateTime>
            </ComuFooter>
          </DetailBox>
          {comu.image && (
            <ComuImgBox>
              <ComuImg source={comu.image} />
            </ComuImgBox>
          )}
        </ComuBox>
        ))}
      </ComuBoxScroll>
      <ButtonWrapper>
        <WriteButton>
          <FontAwesome6 name="pen" size={20} color="#fff" />
          <ButtonText>글 쓰기</ButtonText>
        </WriteButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  margin-right: 13px;
  margin-left: 13px;
  margin-bottom: 13px;
`;

const CtgyWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CtgyButton = styled.TouchableOpacity`
  width: 50%;
  height: 42px;
`;

const CtgyText = styled.Text`
  font-size: 18px;
  width: 100%;
  text-align: center;
  padding: 10px;
  font-family: 'Inter-Bold';
`;

const InputBoxWrapper = styled.View`
  flex-direction: row;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  align-items: center;
  border-radius: 20px;
  border-color: #C51E3A;
  border-width: 1px;
  width: 100%;
  height: 34px;
  margin-top: 13px;
  margin-bottom: 13px;
`;

const InputBox = styled.TextInput`
  font-size: 15px;
  font-family: 'Inter-Regular';
  color: #C51E3A;
  padding-left: 5px;
  width: 100%;
`;

const ComuBoxScroll = styled.ScrollView`
`;

const ComuBox = styled.View`
  border-top-width: ${({ isFirst }) => (isFirst ? '0.5px' : '0')};
  border-top-color: #CCCCCC;
  border-bottom-width: 0.5px;
  border-bottom-color: #CCCCCC;
  width: 100%;
  height: 80px;
  padding-right: 12px;
  padding-left: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DetailBox = styled.View`
  justify-content: center;
  width: ${({ hasImage }) => (hasImage ? '260px' : '100%')};
  padding-right: 10px;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const DetailWrapper = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ComuTitle = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 14px;
  margin-bottom: 2px;
`;

const ComuDetail = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
`;

const ComuImgBox = styled.View`
`;

const ComuImg = styled.Image`
  width: 69px;
  height: 69px;
  border-radius: 10px;
  resize-mode: cover;
`;

const ComuFooter = styled.View`
  flex-direction: row;
  align-itmes: center;
`;

const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LikeIcon = styled.TouchableOpacity``;

const ChatIcon = styled.View``;

const LikeCount = styled.Text`
  color: #E05936;
  margin-right: 5px;
  margin-left: 2px;
  font-size: 11px;
`;

const ChatCount = styled.Text`
  color: #8892F7;
  font-size: 11px;
  margin-right: 3px;
  margin-left: 2px;
`;

const DateTime = styled.Text`
  color: #AAAAAA;
  font-size: 11px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 0px;
  right: 0px;
  background-color: #C51E3A;
  width: 100px;
  height: 35px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.3;
  shadow-radius: 2px;
  elevation: 3;
`;

const WriteButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: 'Inter-Bold';
  font-size: 16px;
  margin-left: 10px;
`;