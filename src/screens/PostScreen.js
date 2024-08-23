import React, { useState } from "react";
import styled from "styled-components/native";
import { colors, fonts } from "../global";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";
import BlogScreen from "./BlogScreen"; // BlogScreen을 별도 파일로 분리
import MvpScreen from "./MvpScreen"; // MvpScreen을 별도 파일로 분리
import {
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const PostScreen = () => {
  const [selectedValue, setSelectedValue] = useState("blog");
  const [blogData, setBlogData] = useState({});
  const onDataChange = (data) => {
    setBlogData(data);
  };

  const submitPost = async () => {
    const apiUrl = "https://api.ballog.store";
    const endpoint = "/board/post";
    const accessToken =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FwaS5iYWxsb2cuc3RvcmUiLCJzdWIiOiJ0ZXN0MSIsImlhdCI6MTcyNDM5NzY1NywiZXhwIjoxNzI0NDA0ODU3fQ.YFJhuPnXrXk-VTMtLeAioJPg-B2e6vtXwLiHd51uWEk ";
    try {
      const response = await axios.post(
        `${apiUrl}${endpoint}`,
        {
          post_type: selectedValue,
          title: blogData.title,
          body: blogData.content,
          imgUrls: blogData.images,
          match_id: 0,
        },
        {
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Blog Data:", blogData);

      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
      if (response.status === 200) {
        Alert.alert("성공", "게시물이 성공적으로 업로드되었습니다!");
      } else {
        Alert.alert("오류", "게시물을 업로드하는 중 문제가 발생했습니다.");
      }
    } catch (error) {
      // AxiosError 세부 사항 출력
      if (error.response) {
        // 서버가 응답을 반환한 경우
        Alert.alert("서버 오류", "서버에서 처리 중 문제가 발생했습니다.");
      } else if (error.request) {
        // 요청이 서버로 전송되었으나 응답이 없는 경우
        console.error("Error Request:", error.request);
        Alert.alert("요청 오류", "서버에서 응답을 받지 못했습니다.");
      } else {
        // 오류가 발생한 경우
        console.error("Error Message:", error.message);
        Alert.alert("오류", "요청 중 문제가 발생했습니다.");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Bar>
          <CloseButton>
            <AntDesign name="close" size={24} color="#33363f" />
          </CloseButton>
          <DropdownContainer>
            <RNPickerSelect
              value={selectedValue}
              items={[
                { label: "BLOG", value: "blog" },
                { label: "MVP", value: "mvp" },
              ]}
              onValueChange={(value) => setSelectedValue(value)}
              style={{
                inputIOS: {
                  fontSize: fonts.sizes.medium,
                  fontWeight: fonts.weights.regular,
                  color: colors.text,
                  padding: 10,
                },
                inputAndroid: {
                  fontSize: fonts.sizes.medium,
                  fontWeight: fonts.weights.regular,
                  color: colors.text,
                  padding: 10,
                  width: 120,
                },
              }}
            />
            {Platform.OS === "ios" ? (
              <AntDesign
                name="caretdown"
                size={12}
                color="black"
                style={{ marginLeft: 5, marginTop: -3 }}
              />
            ) : null}
          </DropdownContainer>
          <PostButton onPress={submitPost}>
            <ButtonText>등록하기</ButtonText>
          </PostButton>
        </Bar>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {selectedValue === "blog" && (
            <BlogScreen onDataChange={onDataChange} />
          )}
          {selectedValue === "mvp" && <MvpScreen />}
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Bar = styled.View`
  flex-direction: row;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled.TouchableOpacity``;

const DropdownContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 40px;
`;

const PostButton = styled.TouchableOpacity`
  border-radius: 26px;
  background-color: ${colors.primary};
  border: 1px solid ${colors.primary};
  width: 77px;
  height: 30px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: ${fonts.sizes.medium};
  font-weight: ${fonts.weights.regular};
  color: white;
`;

export default PostScreen;
