//ComuWriteScreen.js
import React, {useState, useContext, useEffect} from 'react'
import styled from 'styled-components/native'
import { Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { PostsContext } from '../Context API/PostsContext';

export default function ComuWriteScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {addPost, updatePost, getPostById} = useContext(PostsContext);

  const type = route.params?.type || 'league';
  const postId = route.params?.postId;
  const existingPost = postId ? getPostById(postId) : null;

  const [post, setPost] = useState(() => ({
    postId: Date.now().toString(),
    title: '',
    content: '',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
    user_name: '사용자',
    like_count: 0,
    comment_count: 0,
    imageUrls: [],
    type: type,
  }));

  const { title, content, imageUrls } = post;

  useEffect(() => {
    if (postId) {
        setPost(existingPost);
    }
  }, [postId]);

  const onChange = (name, value) => {
    setPost({
        ...post,
        [name]: value,
    });
  };

  const handleRegister = async () => {
    if (post.title.trim() === '') {
        alert('제목을 입력하세요.');
        return;
    }
    if (post.content.trim() === '') {
        alert('내용을 입력하세요.');
        return;
    }

    let updatedPostId = post.postId;

    if (existingPost) {
        await updatePost(post);
        navigation.navigate('ComuPostedScreen', {
            postId: updatedPostId,
            type: post.type,
            postData: post // 수정된 게시글 데이터를 전달
        });
    } else {
        updatedPostId = await addPost(post); // 새로운 게시글을 Context에 추가
        if (updatedPostId) {
            setPost({ ...post, postId: updatedPostId}); // 서버에서 받은 postId로 갱신
        }
        navigation.navigate('MainTabs', {
            screen: '커뮤니티',
            params: {
                postId: post.postId, 
                type: post.type,
                updatedPost: post,
            },
            });
        };
    }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true, // 여러 이미지 선택
        quality: 1,
    });
    if (!result.canceled) {
        setPost({
            ...post,
            imageUrls: [...post.imageUrls, ...result.assets.map(asset => asset.uri)],
        });
    }
  };

  const removeImage = (uriToRemove) => {
    setPost({
      ...post,
      imageUrls: post.imageUrls.filter(uri => uri !== uriToRemove),
    });
  };

  return (
    <Wrapper>
        <ComuWriteHeader>
            <BackButton onPress={()=>navigation.goBack()}>
                <Feather name="x" size={24} color="black" />
            </BackButton>
            <ScreenTitleWrapper>
                <ScreenTitle>{existingPost ? '글 수정하기' : '글 쓰기'}</ScreenTitle>
            </ScreenTitleWrapper>
            <RegisterButton onPress={handleRegister}>
                <RegisterButtonText>{existingPost ? '수정하기' : '등록하기'}</RegisterButtonText>
            </RegisterButton>
        </ComuWriteHeader>
        <ComuWriteBox>
            <WriteBoxTitleWrapper>
                <WriteBoxTitle 
                placeholder='제목을 입력하세요.' 
                placeholderTextColor={'#919191'}
                value={title}
                onChangeText={(value) => onChange('title', value)}
                multiline
                />
            </WriteBoxTitleWrapper>
            <WriteBoxDetailWrapper>
                <WriteBoxDetail 
                placeholder='내용을 입력하세요.' 
                placeholderTextColor={'#919191'}
                value={content}
                onChangeText={(value) => onChange('content', value)}
                multiline
                />
            </WriteBoxDetailWrapper>
        </ComuWriteBox>
        <ComuWriteFooter>
            <ButtonsWrapper>
                <ComuRulesButton>
                    <ComuRulesButtonText>커뮤니티 이용 규칙 상세 보기</ComuRulesButtonText>
                </ComuRulesButton>
                <CameraIcon onPress={pickImage}>
                    <Feather name="camera" size={24} color="#C51E3A" />
                </CameraIcon>
            </ButtonsWrapper>
            <ImagesContainer
             horizontal
             showsHorizontalScrollIndicator={false}
            >
                {imageUrls.map((uri, index) => (
                    <ImgWrapper key={index} >
                        <ImageThumbnail 
                        source={{uri}}
                        isFirst={index === 0}
                        />
                        <RemoveImageButton onPress={() => removeImage(uri)}>
                            <AntDesign name="delete" size={15} color={"#222222"} />
                        </RemoveImageButton>
                    </ImgWrapper>
                ))}
            </ImagesContainer>
        </ComuWriteFooter>
    </Wrapper>
  )
}

const Wrapper = styled.View`
    flex: 1;
    background-color: #fff;
`;

const ComuWriteHeader = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 42px;
`;

const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 13px;
`;

const ScreenTitleWrapper = styled.View`
    justify-content: center;
    align-items: center;
`;

const ScreenTitle = styled.Text`
    font-family: 'Inter-Bold';
    font-size: 17px;
`;

const RegisterButton = styled.TouchableOpacity`
    position: absolute;
    right: 13px;
    background-color: #C51E3A;
    padding: 5px;
    justif-content: center;
    align-items: center;
    width: 77px;
    height: 29px;
    border-radius: 26px;
`;

const RegisterButtonText = styled.Text`
    font-size: 17px;
    color: #fff;
    font-family: 'Inter-SemiBold';
`;

const ComuWriteBox = styled.View`
    margin: 13px;
`;

const WriteBoxTitleWrapper = styled.View`
    flex-direction: row;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 3px;
    padding-bottom: 3px;
    align-items: center;
    border-radius: 20px;
    border-color: #D9D9D9;
    border-width: 1px;
    width: 100%;
    min-height: 34px;
    height: auto;
    margin-bottom: 13px;
`;

const WriteBoxTitle = styled.TextInput`
    font-family: 'Inter-Bold';
    width: 100%;
    font-size: 15px;
`;

const WriteBoxDetailWrapper = styled.View`
    padding-right: 10px;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 20px;
    border-color: #D9D9D9;
    border-width: 1px;
    width: 100%;
    min-height: 197px;
`;

const WriteBoxDetail = styled.TextInput`
    width: 100%;
    min-height: 197px;
    height: auto;
    textAlignVertical: top;
    font-family: 'Inter-Regular';
    font-size: 15px;
`;

const ComuWriteFooter = styled.View`
    width: 100%;
    height: auto;
`;

const ButtonsWrapper = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 13px;
    margin-right: 13px;
`;

const ComuRulesButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 187px;
    height: 28px;
    background-color: #D9D9D9;
    border-radius: 20px;
`;

const ComuRulesButtonText = styled.Text`
    font-family: 'Inter-Bold';
    font-size: 16px;
`;

const CameraIcon = styled.TouchableOpacity`
    margin-right: 10px;
`;

const ImagesContainer = styled.ScrollView`
    flex-direction: row;
    padding-top: 13px;
    padding-bottom: 13px;
    width: 100%;
`;

const ImgWrapper = styled.View``;

const ImageThumbnail = styled.Image`
    flex-direction: row;
    resize-mode: cover;
    width: 96px;
    height: 96px;
    border-radius: 14px;
    border-color: #D9D9D9;
    border-width: 1px;
    ${({ isFirst }) => isFirst && 'margin-left: 13px;'}
    margin-right: 13px;
`;

const RemoveImageButton = styled.TouchableOpacity`
  position: absolute;
  top: 3px;
  right: 16px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  padding: 5px;
`;