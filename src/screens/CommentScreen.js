import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { colors, fonts } from "../global";

const Comment = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <Wrapper>
      <CommentHeader>
        <BackButton onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </BackButton>
        <CommentWrapper>
          <CommentIcon source={require("../assets/Chat.png")} />
          <CommentText>댓글 7</CommentText>
        </CommentWrapper>
      </CommentHeader>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container></Container>
      </ScrollView>
      <CommentsFooter>
        <InputBoxWrapper>
          <UserImage source={require("../assets/Profile.png")} />
          <CommentInputBox
            placeholder="댓글을 입력해주세요"
            placeholderTextColor={"#B5B5B5"}
            multiline
          />
          <UploadButton>
            <Feather name="send" size={24} color="#C51E3A" />
          </UploadButton>
        </InputBoxWrapper>
      </CommentsFooter>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background: white;
`;

const CommentHeader = styled.View`
  border: 1px solid #dbdbdb;
  background-color: #fff;
  width: 100%;
  height: 42px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 13px;
`;

const CommentWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CommentIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const CommentText = styled.Text`
  font-family: "Inter-Bold";
  font-size: 17px;
  margin: 2px 0 0 4px;
`;

const Container = styled.View`
  flex: 1;
`;

const CommentsFooter = styled.View`
  position: absolute;
  height: 80px;
  bottom: 0px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-left: 13px;
  padding-right: 13px;
  background-color: #fff;
`;

const InputBoxWrapper = styled.View`
  flex-direction: row;
  padding-right: 15px;
  padding-left: 15px;
  align-items: center;
  justify-content: space-between;
  border-radius: 36px;
  border-color: #c51e3a;
  border-width: 1px;
  width: 100%;
  height: 48px;
`;

const UserImage = styled.Image`
  width: 28.52px;
  height: 28.52px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;

  margin-right: 5px;
`;

const CommentInputBox = styled.TextInput`
  font-family: "Inter-Regular";
  width: 84%;
  padding-top: 8px 10px;
`;

const UploadButton = styled.TouchableOpacity``;

export default Comment;
