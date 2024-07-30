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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";

import {
  Text,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const PostScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [gameDate, setGameDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [image, setImage] = useState(null);
  const [showTextOptions, setShowTextOptions] = useState(false);
  const [showLineSpacingOptions, setShowLineSpacingOptions] = useState(false);
  const [showColorOptions, setShowColorOptions] = useState(false);
  const [showSizeOptions, setShowSizeOptions] = useState(false); // 추가된 상태
  const [textAlign, setTextAlign] = useState("left");
  const [textColor, setTextColor] = useState(colors.text);
  const [textSize, setTextSize] = useState(fonts.sizes.small); // 기본 글자 크기
  const [showImagePreview, setShowImagePreview] = useState(true); // 이미지 프리뷰 상태 추가

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

    if (!result.canceled) {
      const [{ uri }] = result.assets;
      setImage(uri);
      setContent((prevContent) => `${prevContent}\n![Image](${uri})`);
      setShowImagePreview(true); // 이미지 프리뷰 상태를 보이도록 설정
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setShowImagePreview(false); // 이미지 프리뷰 상태를 숨깁니다
  };

  const toggleTextOptions = () => {
    setShowTextOptions(!showTextOptions);
    setShowLineSpacingOptions(false);
    setShowColorOptions(false);
    setShowSizeOptions(false); // 사이즈 옵션 숨기기
  };

  const toggleLineSpacingOptions = () => {
    setShowLineSpacingOptions(!showLineSpacingOptions);
    setShowTextOptions(false);
    setShowColorOptions(false);
    setShowSizeOptions(false); // 사이즈 옵션 숨기기
  };

  const toggleColorOptions = () => {
    setShowColorOptions(!showColorOptions);
    setShowTextOptions(false);
    setShowLineSpacingOptions(false);
    setShowSizeOptions(false); // 사이즈 옵션 숨기기
  };

  const toggleSizeOptions = () => {
    setShowSizeOptions(!showSizeOptions);
    setShowTextOptions(false);
    setShowLineSpacingOptions(false);
    setShowColorOptions(false); // 색상 옵션 숨기기
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

  const applyColor = (color) => {
    setTextColor(color);
  };

  const applySize = (size) => {
    setTextSize(size);
  };

  const colorOptions = {
    black: "#000000",
    red: "#FF0000",
    blue: "#00008b",
    yellow: "#FFD300",
    green: "#008000",
  };

  const sizeOptions = {
    10: "10px",
    12: "12px",
    14: "14px",
    16: "16px",
    18: "18px",
    20: "20px",
    25: "25px",
    30: "30px",
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            color={textColor}
            style={{ textAlign, color: textColor, fontSize: textSize }} // 적용된 글자색 및 크기
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
            <ColorButton onPress={toggleColorOptions}>
              <Ionicons
                name="color-palette-outline"
                size={24}
                color={colors.icon}
              />
            </ColorButton>
            <SizeButton onPress={toggleSizeOptions}>
              <FontAwesome name="text-height" size={24} color="black" />
            </SizeButton>
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
                    <Feather
                      name="align-left"
                      size={20}
                      color={
                        textAlign === "left" ? colors.primary : colors.icon
                      }
                    />
                  </OptionButton>
                  <OptionButton onPress={() => applyAlign("center")}>
                    <Feather
                      name="align-center"
                      size={20}
                      color={
                        textAlign === "center" ? colors.primary : colors.icon
                      }
                    />
                  </OptionButton>
                  <OptionButton onPress={() => applyAlign("right")}>
                    <Feather
                      name="align-right"
                      size={20}
                      color={
                        textAlign === "right" ? colors.primary : colors.icon
                      }
                    />
                  </OptionButton>
                  <OptionButton onPress={() => applyAlign("justify")}>
                    <Feather
                      name="align-justify"
                      size={20}
                      color={
                        textAlign === "justify" ? colors.primary : colors.icon
                      }
                    />
                  </OptionButton>
                </BorderBox>
              </OptionBar>
            </OptionsContainer>
          )}

          {showColorOptions && (
            <OptionsContainer>
              <TextBar>
                <OptionText>색상 옵션</OptionText>
                <CloseButton onPress={toggleColorOptions}>
                  <AntDesign name="close" size={18} color="#33363f" />
                </CloseButton>
              </TextBar>
              <OptionBar>
                <BorderBox>
                  {Object.keys(colorOptions).map((colorName) => (
                    <OptionButton
                      key={colorName}
                      onPress={() => applyColor(colorOptions[colorName])}
                    >
                      <Ionicons
                        name="color-fill"
                        size={24}
                        color={colorOptions[colorName]}
                      />
                    </OptionButton>
                  ))}
                </BorderBox>
              </OptionBar>
            </OptionsContainer>
          )}

          {showSizeOptions && (
            <OptionsContainer>
              <TextBar>
                <OptionText>크기 옵션</OptionText>
                <CloseButton onPress={toggleSizeOptions}>
                  <AntDesign name="close" size={18} color="#33363f" />
                </CloseButton>
              </TextBar>
              <OptionBar>
                <BorderBox>
                  {Object.keys(sizeOptions).map((sizeName) => (
                    <OptionButton
                      key={sizeName}
                      onPress={() => applySize(sizeOptions[sizeName])}
                    >
                      <Text style={{ fontSize: sizeOptions[sizeName] }}>
                        {sizeName}
                      </Text>
                    </OptionButton>
                  ))}
                </BorderBox>
              </OptionBar>
            </OptionsContainer>
          )}

          {image && showImagePreview && (
            <ImagePreviewContainer>
              <ImagePreview source={{ uri: image }} />
              <RemoveImageButton onPress={handleRemoveImage}>
                <AntDesign name="delete" size={24} color={colors.icon} />
              </RemoveImageButton>
            </ImagePreviewContainer>
          )}
        </ContentContainer>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const CloseButton = styled.TouchableOpacity``;

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

const ResultText = styled.Text`
  font-size: ${fonts.sizes.small};
  font-weight: ${fonts.weights.bold};
  color: #b4b4b4;
  flex: 1;
`;

const ResultButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 15px;
  height: 75px;
`;

const ContentInput = styled.TextInput`
  font-size: ${fonts.sizes.small};
  font-weight: ${fonts.weights.bold};
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
  padding-right: 7px;
`;

const ColorButton = styled.TouchableOpacity`
  padding-right: 8px;
`;

const SizeButton = styled.TouchableOpacity``;

const ImagePreviewContainer = styled.View`
  position: relative;
`;

const ImagePreview = styled.Image`
  width: 100px;
  height: 100px;
`;

const RemoveImageButton = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50px;
  padding: 5px;
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

export default PostScreen;
