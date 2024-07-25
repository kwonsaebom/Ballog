import React from "react";
import styled from "styled-components/native";
import { colors, fonts } from "../global";
import { AntDesign } from "@expo/vector-icons";

const PostScreen = () => {
  return (
    <Container>
      <Bar>
        <CloseButton>
          <AntDesign name="close" size={24} color="#33363f" />
        </CloseButton>
        <PostButton>
          <ButtonText>등록하기</ButtonText>
        </PostButton>
      </Bar>
    </Container>
  );
};

const Container = styled.View``;

const Bar = styled.View`
  flex-direction: row;
  padding: 8px;
`;
const CloseButton = styled.TouchableOpacity``;

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
