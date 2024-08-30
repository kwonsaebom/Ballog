import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { colors, fonts } from "../global";
import axios from "axios";
import { API_TOKEN } from "@env";

const teamImages = {
  두산: require("../assets/Teams/Doosan.png"),
  한화: require("../assets/Teams/Hanwha.png"),
  기아: require("../assets/Teams/KIA.png"),
  키움: require("../assets/Teams/Kiwoom.png"),
  KT: require("../assets/Teams/KT.png"),
  LG: require("../assets/Teams/LG.png"),
  롯데: require("../assets/Teams/LOTTE.png"),
  NC: require("../assets/Teams/NC.png"),
  삼성: require("../assets/Teams/Samsung.png"),
  신세계: require("../assets/Teams/SSG.png"),

  // 추가적인 팀 이미지 경로는 여기에 추가
};

const getTeamImage = (teamName) =>
  teamImages[teamName] || require("../assets/icon.png"); // 기본 이미지 경로를 추가할 수 있음

const CheckBlog = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [blogData, setBlogData] = useState(null);
  const [likeCount, setLikeCount] = useState(
    blogData ? blogData.like_count : 0
  );

  const createdDate = blogData
    ? blogData.match_info.match_date.split("T")[0]
    : "Loading...";
  const gameDate = blogData
    ? new Date(blogData.created_at).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
      })
    : "Loading...";

  useEffect(() => {
    if (blogData) {
      setLikeCount(blogData.like_count);
    }
  }, [blogData]);

  const route = useRoute();
  const navigation = useNavigation();

  const apiUrl = "https://api.ballog.store";
  const { post_id } = route.params;

  useEffect(() => {
    console.log(`Fetching data from ${apiUrl}/board/post/${post_id}`);
    console.log("API_TOKEN:", API_TOKEN);
    axios
      .get(`${apiUrl}/board/post/${post_id}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/json", // Ensure server responds with JSON
        },
      })
      .then((response) => {
        console.log("API Response Status:", response.status);
        console.log("API Response Headers:", response.headers);
        console.log("API Response Data:", response.data);

        if (response.data.result === null || response.data.deleted) {
          // 게시글이 삭제된 상태라면
          Alert.alert("삭제된 게시글", "이 게시글은 삭제되었습니다.", [
            { text: "확인", onPress: () => navigation.goBack() },
          ]);
        } else {
          setBlogData(response.data.result); // Save response data to state
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("API Error Response Status:", error.response.status);
          console.error("API Error Response Headers:", error.response.headers);
          console.error("API Error Response Data:", error.response.data);

          if (error.response.status === 404) {
            // 404 에러(삭제된 게시글일 가능성 있음)
            Alert.alert("삭제된 게시글", "이 게시글은 삭제되었습니다.", [
              { text: "확인", onPress: () => navigation.goBack() },
            ]);
          } else {
            Alert.alert("오류", "게시글을 불러오는 데 문제가 발생했습니다.", [
              { text: "확인", onPress: () => navigation.goBack() },
            ]);
          }
        } else if (error.request) {
          console.error("API Error Request:", error.request);
        } else {
          console.error("API Error Message:", error.message);
        }
        console.error("API Error Config:", error.config);
      });
  }, [post_id]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSettingsPress = () => {
    setShowButtons((prev) => !prev);
  };

  const handleLikeCount = () => {
    setLikeCount((prevLikeCount) => prevLikeCount + 1);
  };

  const handleDeletePress = () => {
    Alert.alert(
      "삭제 확인",
      "정말로 삭제하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => console.log("삭제 취소"),
          style: "cancel",
        },
        {
          text: "삭제",
          onPress: () => {
            console.log("삭제 요청 전송");

            axios({
              method: "delete",
              url: `${apiUrl}/board/post/${post_id}`,
              headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              data: {
                post_type: "blog", // 요청 본문 데이터 추가
              },
            })
              .then((response) => {
                console.log("삭제 성공:", response.status);
                console.log("삭제 응답 데이터:", response.data);

                if (response.status === 200 || response.status === 204) {
                  // 서버에서 삭제 성공 응답이 반환되었는지 확인
                  Alert.alert("성공", "게시글이 삭제되었습니다.");
                  navigation.goBack(); // 삭제 후 이전 화면으로 돌아가기
                } else {
                  Alert.alert("오류", "게시글 삭제에 실패했습니다.");
                }
              })
              .catch((error) => {
                if (error.response) {
                  console.error("삭제 에러 응답 상태:", error.response.status);
                  console.error("삭제 에러 응답 데이터:", error.response.data);
                  Alert.alert("오류", "게시글 삭제에 실패했습니다.");
                } else if (error.request) {
                  console.error("삭제 에러 요청:", error.request);
                  Alert.alert("오류", "서버와 연결할 수 없습니다.");
                } else {
                  console.error("삭제 에러 메시지:", error.message);
                  Alert.alert("오류", "알 수 없는 오류가 발생했습니다.");
                }
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  // ContentImage의 source 속성 값 결정
  const getContentImages = () => {
    if (
      blogData &&
      blogData.img_urls &&
      blogData.img_urls.imgUrls &&
      blogData.img_urls.imgUrls.length > 0
    ) {
      return blogData.img_urls.imgUrls.map((url, index) => {
        // url이 유효한 경우에만 ContentImage를 렌더링
        if (url) {
          return <ContentImage key={index} source={{ uri: url }} />;
        }
        return null; // url이 유효하지 않으면 아무것도 렌더링하지 않음
      });
    }
    return null; // 이미지가 없으면 아무것도 렌더링하지 않음
  };
  return (
    <Wrapper>
      <UserHeader>
        <BackButton onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </BackButton>
        <UserWrapper>
          <FileIcon source={require("../assets/Order.png")} />
          <UserName>{blogData ? blogData.user_name : "Loading..."}</UserName>
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
              <EditDeleteButton
                onPress={() => navigation.navigate("Modify", { post_id })}
              >
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
              <UserType>
                {blogData ? blogData.post_type.toUpperCase() : "Loading..."}
              </UserType>
            </UserTypeWrapper>
            <Title>{blogData ? blogData.title : "Loading..."}</Title>
            <UserImage
              source={
                blogData
                  ? { uri: blogData.user_icon_url }
                  : require("../assets/Profile.png")
              }
            />
            <DateTime>{createdDate}</DateTime>
          </TitleWrapper>
          <ScoreWrapper>
            <ScoreDate>
              <DateText>{gameDate} 경기</DateText>
            </ScoreDate>
            <Score>
              <ScoreImage
                source={getTeamImage(blogData?.match_info?.home_team_name)}
              />
              <ScoreNum>
                {blogData ? blogData.match_info.home_team_score : "Loading..."}{" "}
                :{" "}
                {blogData ? blogData.match_info.away_team_score : "Loading..."}
              </ScoreNum>
              <ScoreImage
                source={getTeamImage(blogData?.match_info?.away_team_name)}
              />
            </Score>
          </ScoreWrapper>
          <ContentWrapper>
            <ContentText>{blogData ? blogData.body : "Loading..."}</ContentText>
            {getContentImages()}
          </ContentWrapper>
        </Container>
      </ScrollView>

      <PostFooter>
        <IconWrapper>
          <LikeIcon onPress={handleLikeCount}>
            <AntDesign name="hearto" size={21} color="#E05936" />
          </LikeIcon>
          <LikeCount>{likeCount}</LikeCount>
          <ChatIcon onPress={() => navigation.navigate("Comment", { post_id })}>
            <MaterialCommunityIcons
              name="message-reply-outline"
              size={21}
              color="#8892F7"
            />
          </ChatIcon>
          <ChatCount>
            {blogData ? blogData.comment_list.length : "Loading..."}
          </ChatCount>
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
  font-size: 11px;
  color: black;
  font-weight: 900;
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
