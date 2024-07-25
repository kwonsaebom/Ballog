import React, { useState } from "react";
import styled from "styled-components/native";
import { colors, fonts } from "../global";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { TextInput } from "react-native";

const PostScreen = () => {
  const [selectedValue, setSelectedValue] = useState("blog");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <Container>
      <Bar>
        <CloseButton>
          <AntDesign name="close" size={24} color="#33363f" />
        </CloseButton>
        <DropdownContainer>
          <DropdownTouchable>
            <RNPickerSelect
              value={selectedValue} // Set the default value here
              items={[
                { label: "BLOG", value: "blog" },
                { label: "MVP", value: "mvp" },
              ]}
              onValueChange={(value) => {
                setSelectedValue(value); // Update state when a new value is selected
              }}
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
                },
              }}
            />
            <AntDesign
              name="caretdown"
              size={12}
              color="black"
              style={{ marginLeft: 5, marginTop: -3 }}
            />
          </DropdownTouchable>
        </DropdownContainer>
        <PostButton>
          <ButtonText>등록하기</ButtonText>
        </PostButton>
      </Bar>

      <ContentContainer>
        <TitleInput
          placeholder="제목을 입력해주세요."
          value={title}
          onChangeText={setTitle}
        />
        <ContentInput
          placeholder="본문을 입력하세요."
          value={content}
          onChangeText={setContent}
          multiline
        />
      </ContentContainer>
    </Container>
  );
};

const Container = styled.View``;

const Bar = styled.View`
  flex-direction: row;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled.TouchableOpacity``;

const DropdownContainer = styled.View``;

const DropdownTouchable = styled.TouchableOpacity`
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

const ContentContainer = styled.View`
  padding: 16px;
`;

const TitleInput = styled.TextInput`
  font-size: ${fonts.sizes.small};
  font-weight: ${fonts.weights.bold};
  color: ${colors.placeholder};
  padding: 10px 15px;
  border: 1px solid ${colors.border};
  border-radius: 32px;
  margin-bottom: 16px;
`;

const ContentInput = styled.TextInput`
  font-size: ${fonts.sizes.small};
  font-weight: ${fonts.weights.bold};
  color: ${colors.placeholder};
  padding: 10px 15px;
  border: 1px solid ${colors.border};
  border-radius: 14px;
  height: 200px;
`;

const ButtonText = styled.Text`
  font-size: ${fonts.sizes.medium};
  font-weight: ${fonts.weights.regular};
  color: white;
`;

export default PostScreen;
