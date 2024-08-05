import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { colors, fonts } from "../global";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";
import BlogScreen from "./ModifyBlog"; // BlogScreen을 별도 파일로 분리
import MvpScreen from "./ModifyMvp"; // MvpScreen을 별도 파일로 분리
import { TouchableWithoutFeedback, Keyboard, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ModifyScreen = () => {
  const [selectedValue, setSelectedValue] = useState("blog");
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Bar>
          <CloseButton onPress={handleBackPress}>
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
          <PostButton onPress={() => navigation.navigate("CheckPost")}>
            <ButtonText>수정하기</ButtonText>
          </PostButton>
        </Bar>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {selectedValue === "blog" && <BlogScreen />}
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

const ButtonText = styled.Text`
  font-size: ${fonts.sizes.medium};
  font-weight: ${fonts.weights.regular};
  color: white;
`;

export default ModifyScreen;
