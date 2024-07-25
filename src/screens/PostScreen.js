import React, { useState } from "react";
import styled from "styled-components/native";
import { colors, fonts } from "../global";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const PostScreen = () => {
  const [selectedValue, setSelectedValue] = useState("blog");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [gameDate, setGameDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleConfirm = (date) => {
    setGameDate(date);
    setDatePickerVisibility(false);
  };

  return (
    <Container>
      <Bar>
        <CloseButton>
          <AntDesign name="close" size={24} color="#33363f" />
        </CloseButton>
        <DropdownContainer>
          <DropdownTouchable>
            <RNPickerSelect
              value={selectedValue}
              items={[
                { label: "BLOG", value: "blog" },
                { label: "MVP", value: "mvp" },
              ]}
              onValueChange={(value) => {
                setSelectedValue(value);
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
        <ResultContainer>
          <ResultButton onPress={() => setDatePickerVisibility(true)}>
            <ResultText>
              {gameDate ? gameDate.toLocaleString() : "경기 결과를 추가하세요."}
            </ResultText>
            <FontAwesome5 name="calendar-alt" size={24} />
          </ResultButton>
        </ResultContainer>
        <ContentInput
          placeholder="본문을 입력하세요."
          value={content}
          onChangeText={setContent}
          multiline
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
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

const ResultContainer = styled.View`
  border: 1px solid ${colors.border};
  border-radius: 16px;
  margin-bottom: 16px;
`;

const ResultButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  height: 75px;
`;

const ResultText = styled.Text`
  font-size: ${fonts.sizes.small};
  font-weight: ${fonts.weights.bold};
  color: #b4b4b4;
  flex: 1;
`;

const ContentInput = styled.TextInput`
  font-size: ${fonts.sizes.small};
  font-weight: ${fonts.weights.bold};
  color: ${colors.placeholder};
  padding: 10px 15px;
  border: 1px solid ${colors.border};
  border-radius: 14px;
  height: 400px;
`;

const ButtonText = styled.Text`
  font-size: ${fonts.sizes.medium};
  font-weight: ${fonts.weights.regular};
  color: white;
`;

export default PostScreen;
