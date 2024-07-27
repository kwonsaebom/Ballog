import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { colors, fonts } from "../global";
import {
  AntDesign,
  FontAwesome5,
  Feather,
  Ionicons,
  FontAwesome,
  Fontisto,
  FontAwesome6,
} from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ScrollView,
} from "react-native";

const PostScreen = () => {
  const [selectedValue, setSelectedValue] = useState("blog");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [gameDate, setGameDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [showTextOptions, setShowTextOptions] = useState(false);
  const [showLineSpacingOptions, setShowLineSpacingOptions] = useState(false);
  const [textAlign, setTextAlign] = useState("left");

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(
          "죄송합니다. 이 기능을 사용하려면 사진 보관함 접근 권한이 필요합니다."
        );
      }
    })();
  }, []);

  const handleConfirm = (date) => {
    setGameDate(date);
    setDatePickerVisibility(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setContent((prevContent) => `${prevContent}\n![Image](${result.uri})`);
    }
  };

  const toggleTextOptions = () => {
    setShowTextOptions(!showTextOptions);
    setShowLineSpacingOptions(false); // Ensure line spacing options are hidden
  };

  const toggleLineSpacingOptions = () => {
    setShowLineSpacingOptions(!showLineSpacingOptions);
    setShowTextOptions(false); // Ensure text options are hidden
  };

  const applyStyle = (style) => {
    if (style === "bold") {
      setContent((prevContent) => `${prevContent}**Bold Text**`);
    } else if (style === "italic") {
      setContent((prevContent) => `${prevContent}*Italic Text*`);
    } else if (style === "underline") {
      setContent((prevContent) => `${prevContent}<u>Underlined Text</u>`);
    }
  };

  const applyAlign = (alignment) => {
    setTextAlign(alignment);
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
        <PostButton>
          <ButtonText>등록하기</ButtonText>
        </PostButton>
      </Bar>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ContentContainer>
          <TitleInput
            placeholder="제목을 입력해주세요."
            value={title}
            onChangeText={setTitle}
          />
          <ResultContainer>
            <ResultButton onPress={() => setDatePickerVisibility(true)}>
              <ResultText>
                {gameDate
                  ? gameDate.toLocaleString()
                  : "경기 결과를 추가하세요."}
              </ResultText>
              <FontAwesome5 name="calendar-alt" size={24} color={colors.icon} />
            </ResultButton>
          </ResultContainer>

          <ContentInput
            placeholder="본문을 입력하세요."
            value={content}
            onChangeText={setContent}
            multiline
            style={{ textAlign }} // Apply text alignment here
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />

          <ElementContainer>
            <PhotoButton onPress={pickImage}>
              <Feather name="camera" size={24} color={colors.icon} />
            </PhotoButton>
            <TextButton onPress={toggleTextOptions}>
              <Ionicons name="text" size={24} color={colors.icon} />
            </TextButton>
            <AlignButton onPress={toggleLineSpacingOptions}>
              <Feather name="align-left" size={24} color={colors.icon} />
            </AlignButton>
            <ColorButton>
              <Ionicons
                name="color-palette-outline"
                size={24}
                color={colors.icon}
              />
            </ColorButton>
          </ElementContainer>

          {showTextOptions && (
            <OptionsContainer>
              <TextBar>
                <OptionText>텍스트 옵션</OptionText>
                <CloseButton onPress={toggleTextOptions}>
                  <AntDesign name="close" size={18} color="#33363f" />
                </CloseButton>
              </TextBar>
              <OptionBar>
                <BorderBox>
                  <OptionButton onPress={() => applyStyle("bold")}>
                    <FontAwesome6 name="bold" size={20} color={colors.icon} />
                  </OptionButton>
                  <OptionButton onPress={() => applyStyle("italic")}>
                    <FontAwesome name="italic" size={20} color={colors.icon} />
                  </OptionButton>
                  <OptionButton onPress={() => applyStyle("underline")}>
                    <Fontisto name="underline" size={20} color={colors.icon} />
                  </OptionButton>
                </BorderBox>
              </OptionBar>
            </OptionsContainer>
          )}

          {showLineSpacingOptions && (
            <OptionsContainer>
              <TextBar>
                <OptionText>텍스트 정렬 옵션</OptionText>
                <CloseButton onPress={toggleLineSpacingOptions}>
                  <AntDesign name="close" size={18} color="#33363f" />
                </CloseButton>
              </TextBar>
              <OptionBar>
                <BorderBox>
                  <OptionButton onPress={() => applyAlign("left")}>
                    <Feather name="align-left" size={20} color={colors.icon} />
                  </OptionButton>
                  <OptionButton onPress={() => applyAlign("center")}>
                    <Feather
                      name="align-center"
                      size={20}
                      color={colors.icon}
                    />
                  </OptionButton>
                  <OptionButton onPress={() => applyAlign("right")}>
                    <Feather name="align-right" size={20} color={colors.icon} />
                  </OptionButton>
                </BorderBox>
              </OptionBar>
            </OptionsContainer>
          )}

          {image && <ImagePreview source={{ uri: image }} />}
        </ContentContainer>
      </ScrollView>
    </Container>
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
  height: 300px;
`;

const ElementContainer = styled.View`
  flex-direction: row;
  padding: 8px;
`;

const PhotoButton = styled.TouchableOpacity`
  padding-right: 10px;
`;

const TextButton = styled.TouchableOpacity`
  padding-right: 8px;
`;

const AlignButton = styled.TouchableOpacity`
  padding-right: 8px;
`;

const ColorButton = styled.TouchableOpacity``;

const ImagePreview = styled.Image`
  width: 100%;
  height: 200px;
  margin-top: 16px;
  border-radius: 8px;
`;

const OptionsContainer = styled.View`
  flex-direction: column;
  padding: 5px 8px;
  border-radius: 7px;
  border: 1px solid ${colors.border};
`;

const TextBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px;
`;

const OptionText = styled.Text`
  font-size: ${fonts.sizes.mini};
  font-weight: ${fonts.weights.light};
`;

const OptionBar = styled.View`
  flex-direction: row;
  padding: 0 0 8px 8px;
`;

const BorderBox = styled.View`
  flex-direction: row;
  background-color: ${colors.border};
  border-radius: 7px;
  padding: 3px;
  margin-right: 10px;
`;

const OptionButton = styled.TouchableOpacity`
  padding: 2px 8px;
`;

const ButtonText = styled.Text`
  font-size: ${fonts.sizes.medium};
  font-weight: ${fonts.weights.regular};
  color: white;
`;

export default PostScreen;
