import React, { useState } from "react";
import styled from "styled-components/native";
import {
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { colors, fonts } from "../global";

const CheckBlog = () => {
  const [showButtons, setShowButtons] = useState(false);
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSettingsPress = () => {
    setShowButtons((prev) => !prev);
  };

  const handleDeletePress = () => {
    Alert.alert(
      "삭제 확인",
      "정말로 삭제하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "삭제", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );
  };

  return (
    <Wrapper>
      <UserHeader>
        <BackButton onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </BackButton>
        <UserWrapper>
          <FileIcon source={require("../assets/Order.png")} />
          <UserName>홍길동</UserName>
        </UserWrapper>
      </UserHeader>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Container>
          <SettingWrapper>
            <SettingButton onPress={handleSettingsPress}>
              <SettingIcon source={require("../assets/Settings.png")} />
            </SettingButton>
          </SettingWrapper>
          {showButtons && (
            <ButtonWrapper>
              <EditDeleteButton onPress={() => navigation.navigate("Modify")}>
                <ButtonText>수정</ButtonText>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={13}
                  color="black"
                />
              </EditDeleteButton>
              <EditDeleteButton onPress={handleDeletePress}>
                <ButtonText>삭제</ButtonText>
                <Feather name="trash-2" size={13} color="black" />
              </EditDeleteButton>
            </ButtonWrapper>
          )}

          <TitleWrapper>
            <UserTypeWrapper>
              <UserType>BLOG</UserType>
            </UserTypeWrapper>
            <Title>첫 직관 후기</Title>
            <UserImage source={require("../assets/Profile.png")} />
            <DateTime>2024.06.24</DateTime>
          </TitleWrapper>
          <ScoreWrapper>
            <ScoreDate>
              <DateText>6/24 경기</DateText>
            </ScoreDate>
            <Score>
              <ScoreImage source={require("../assets/Teams/Doosan.png")} />
              <ScoreNum>5 : 3</ScoreNum>
              <ScoreImage source={require("../assets/Teams/LG.png")} />
            </Score>
          </ScoreWrapper>
          <ContentWrapper>
            <ContentText>
              안녕하세요. 오늘은 야구 경기 직관 후기를 적어보도록 하겠습니다.
              오늘의 간식은 치킨이었습니다. 직관하며 먹으니 더욱 꿀맛이었습니다.
            </ContentText>
            <ContentImage source={require("../assets/imgs/sampleImg.png")} />
          </ContentWrapper>
        </Container>
      </ScrollView>

      <PostFooter>
        <IconWrapper>
          <LikeIcon>
            <AntDesign name="hearto" size={21} color="#E05936" />
          </LikeIcon>
          <LikeCount>7</LikeCount>
          <ChatIcon onPress={() => navigation.navigate("Comment")}>
            <MaterialCommunityIcons
              name="message-reply-outline"
              size={21}
              color="#8892F7"
            />
          </ChatIcon>
          <ChatCount>7</ChatCount>
        </IconWrapper>
        <BookmarkButton>
          <BookmarkImage source={require("../assets/Bookmark.png")} />
        </BookmarkButton>
      </PostFooter>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background: white;
`;

const UserHeader = styled.View`
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

const UserWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FileIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const UserName = styled.Text`
  font-family: "Inter-Bold";
  font-size: 17px;
  margin: 2px 0 0 4px;
`;

const Container = styled.View`
  flex: 1;
`;

const SettingWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 5px 10px 0 0;
`;

const SettingButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
`;

const SettingIcon = styled.Image`
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 5px 10px 0 0;
  gap: 10px;
`;

const EditDeleteButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #d9d9d9;
  border-radius: 18px;
  width: 53px;
  height: 25px;
  justify-content: center;
  align-items: center;
  padding: 2px 0;
`;

const ButtonText = styled.Text`
  font-family: "Inter-Bold";
  font-size: 11px;
  margin-right: 2px;
`;

const TitleWrapper = styled.View`
  align-items: center;
`;

const UserTypeWrapper = styled.View`
  align-self: center;
  margin: 20px 0;
  border-radius: 23px;
  border: 1px solid ${colors.primary};
`;

const UserType = styled.Text`
  color: ${colors.primary};
  padding: 4px 12px;
  justify-content: center;
  font-size: ${fonts.sizes.small};
  font-weight: ${fonts.weights.bold};
`;

const Title = styled.Text`
  font-size: ${fonts.sizes.big};
  font-weight: ${fonts.weights.bold};
  margin-bottom: 15px;
`;

const UserImage = styled.Image`
  width: 25px;
  height: 25px;
  margin-bottom: 10px;
`;

const DateTime = styled.Text`
  color: #aaaaaa;
  font-size: 11px;
  margin-bottom: 35px;
`;

const ScoreWrapper = styled.View`
  align-items: center;
  height: 132px;
  width: 100%;
  background-color: rgba(217, 217, 217, 0.21);
  padding: 12px;
`;

const ScoreDate = styled.View`
  width: 96px;
  height: 23px;
  color: black;
  border: 1px solid black;
  border-radius: 20px;
  justify-content: center;
  margin-bottom: 10px;
`;

const DateText = styled.Text`
  text-align: center;
  font-size: 13px;
  color: black;
`;

const Score = styled.View`
  width: 250px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ScoreImage = styled.Image`
  width: 59px;
  height: 71px;
`;

const ScoreNum = styled.Text`
  font-size: 26px;
  font-weight: 800;
  letter-spacing: 8px;
`;

const ContentWrapper = styled.View`
  padding: 20px;
  align-items: center;
`;

const ContentText = styled.Text``;

const ContentImage = styled.Image`
  width: 300px;
  height: 300px;
  margin: 10px;
`;

const PostFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid #dbdbdb;
`;

const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  height: 36px;
  font-size: 16px;
`;

const LikeIcon = styled.TouchableOpacity``;

const ChatIcon = styled.TouchableOpacity``;

const LikeCount = styled.Text`
  color: #ff4a22;
  margin: 0 5px;
`;

const ChatCount = styled.Text`
  color: #7c91ff;
  margin: 0 5px;
`;

const BookmarkButton = styled.TouchableOpacity``;

const BookmarkImage = styled.Image`
  width: 30px;
  height: 30px;
`;
export default CheckBlog;
