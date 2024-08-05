//ComuPostedScreen.js
import React, {useState, useContext, useMemo} from 'react'
import styled from 'styled-components/native'
import { useRoute, useNavigation } from '@react-navigation/native';
import { PostsContext } from '../Context API/PostsContext';
import { CommentsContext } from '../Context API/CommentsContext';
import { getRandomPastelColor } from '../utils/colors';
import { Ionicons, AntDesign, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export default function ComuPostedScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const {updateLikes, getPostById} = useContext(PostsContext);
  const {comments, addComment} = useContext(CommentsContext);
  const {postId, category} = route.params || {};
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [userName, setUserName] = useState('익명');

  const post = getPostById(postId);

  const [commentCount, setCommentCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const postComments = comments[postId] || [];

  const userCircleColors = useMemo(() => {
    const colors = {};
    postComments.forEach(comment => {
      colors[comment.id] = getRandomPastelColor();
    });
    return colors;
  }, [postComments]);

  const handleBackPress = () => {
    navigation.navigate("MainTabs", {
      screen: '커뮤니티',
      params: { category }
    });
  };

  const handleCommentSubmit = () => {
    if (inputValue.trim() === '') return;

    const newComment = {
      id: Date.now().toString(),
      username: userName,
      detail: inputValue,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
    };

    addComment(postId, newComment);
    setInputValue('');
    setCommentCount(commentCount + 1);
  };

  if (!post) {
    return null; //post가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <Wrapper>
      <ComuPostedHeader>
        <BackButton onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </BackButton>
        <ScreenTitleWrapper>
          <ScreenTitle>{selectedCategory === 'league' ? ('리그 커뮤니티') : ('마이팀 커뮤니티')}</ScreenTitle>
        </ScreenTitleWrapper>
      </ComuPostedHeader>
      <ScrollContainer>
        <ComuPostedBox>
          <WriterInfoBox>
            <WriterNameWrapper>
                <WriterCircle>
                  <FirstName>{post.author_name.slice(1)}</FirstName>
                </WriterCircle>
                <WriterName>{post.author_name}</WriterName>
            </WriterNameWrapper>
            <DateTime>{`${post.date} | ${post.time}`}</DateTime>
          </WriterInfoBox>
          <PostContents>
            <PostTitle>
              <PostTitleText>{post.title}</PostTitleText>
            </PostTitle>
            <PostDetail>
              <PostDetailText>{post.detail}</PostDetailText>
            </PostDetail>
          </PostContents>
          <ImageWrapper 
            horizontal 
            hasImages={post.images.length > 0}
            showsHorizontalScrollIndicator={false}
          >
          {post.images.map((imageUri, index) => (
            <PostImage 
              key={`${imageUri}-${index}`} 
              source={{uri: imageUri}} 
              isFirst={index === 0}
              isLast={index === post.images.length - 1}
            />
          ))}
          </ImageWrapper>
          <PostFooter>
            <IconWrapper>
              <LikeIcon onPress={() => updateLikes(postId)}>
                    <AntDesign name="hearto" size={12} color="#E05936" />
              </LikeIcon>
              <LikeCount>{post.likes}</LikeCount>
              <ChatIcon>
                    <MaterialCommunityIcons name="message-reply-outline" size={12} color="#8892F7" />
              </ChatIcon>
              <ChatCount>{postComments.length}</ChatCount>
            </IconWrapper>
            <ButtonWrapper>
              <EditDeleteButton>
                <ButtonText>수정</ButtonText>
                <MaterialCommunityIcons name="pencil-outline" size={13} color="black" />
              </EditDeleteButton>
              <EditDeleteButton>
                <ButtonText>삭제</ButtonText>
                <Feather name="trash-2" size={13} color="black" />
              </EditDeleteButton>
            </ButtonWrapper>
          </PostFooter>
        </ComuPostedBox>
        <CommetsBoxWrapper>
          {postComments.map((comment) => (
          <CommentsBox key={comment.id}>
            <UserInfo>
              <UserNameWrapper>
                <UserCircle color={userCircleColors[comment.id]}>
                  <UserFirstName>{userName.slice(1)}</UserFirstName>
                </UserCircle>
                <UserName>{userName}</UserName>
              </UserNameWrapper>
            </UserInfo>
            <DetailTimeWrapper>
              <CommentDetail>{comment.detail}</CommentDetail>
              <DetailFooter>
                <DateTime>{`${comment.date} | ${comment.time}`}</DateTime>
                <ReplyButton>
                  <ReplyButtonText>답글</ReplyButtonText>
                </ReplyButton>
              </DetailFooter>
            </DetailTimeWrapper>
          </CommentsBox>
          ))}
        </CommetsBoxWrapper>
      </ScrollContainer>
      <CommentsFooter>
        <InputBoxWrapper>
          <UserCircle2 color={getRandomPastelColor()}>
            <UserFirstName>길동</UserFirstName>
          </UserCircle2>
          <CommentInputBox 
            placeholder='댓글을 입력해주세요' 
            placeholderTextColor={'#B5B5B5'} 
            multiline
            value={inputValue}
            onChangeText={setInputValue}
          />
          <UploadButton onPress={handleCommentSubmit}>
            <Feather name="send" size={24} color="#C51E3A" />
          </UploadButton>
        </InputBoxWrapper>
      </CommentsFooter>
    </Wrapper>
  )
}

const Wrapper = styled.View`
    flex: 1;
`;

const ComuPostedHeader = styled.View`
  border-width: 1px;
  border-color: #DBDBDB;
  background-color: #fff;
  width: 100%;
  height: 42px;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 13px;
`;

const ScrollContainer = styled.ScrollView``;

const ScreenTitleWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const ScreenTitle = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 17px;
`;

const ComuPostedBox = styled.View`
  justify-content: center;
  background-color: #fff;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const WriterInfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: space-between;
  width: 100%;
`;

const WriterNameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const WriterCircle = styled.View`
  width: 37px;
  height: 37px;
  border-radius: 20px;
  background-color: #E2B066;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const FirstName = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 15px;
  color: #fff;
`;

const WriterName = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 15px;
`;

const DateTime = styled.Text`
  color: #AAAAAA;
  font-size: 11px;
`;

const PostContents = styled.View`
  width: 100%;
  padding-top: 10px;
  padding-right: 25px;
  padding-left: 25px;
`;

const PostTitle = styled.View`
  width: 100%;
  justify-content: center;
`;

const PostTitleText = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 18px;
`;

const PostDetail = styled.View`
  margin-top: 10px;
`;

const PostDetailText = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 13px;
`;

const PostFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 2px;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 10px;
`;

const ImageWrapper = styled.ScrollView`
  flex-direction: row;
  height: ${({hasImages}) => (hasImages ? 'auto' : '25px')};
  padding-top: 10px;
  padding-bottom: 10px;
`;

const PostImage = styled.Image`
  flex-direction: row;
  width: 92px;
  height: 92px;
  border-radius: 13px;
  border-width: 1px;
  border-color: #D9D9D9;
  margin-left: ${({ isFirst }) => (isFirst ? '25px' : '0px')};
  margin-right: ${({ isLast }) => (isLast ? '25px' : '13px')};
  z-index: 1;
`;

const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LikeIcon = styled.TouchableOpacity``;

const ChatIcon = styled.View``;

const LikeCount = styled.Text`
  color: #E05936;
  margin-right: 5px;
  margin-left: 2px;
  font-size: 14px;
`;

const ChatCount = styled.Text`
  color: #8892F7;
  font-size: 14px;
  margin-right: 3px;
  margin-left: 2px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  gap: 10px;
`;

const EditDeleteButton = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #D9D9D9;
  border-radius: 18px;
  width: 53px;
  justify-content: center;
  align-items: center;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const ButtonText = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 11px;
  margin-right: 2px;
`;

const CommetsBoxWrapper = styled.ScrollView`
  margin-bottom: 80px;
`;

const CommentsBox = styled.View`
  padding-top: 13px;
  padding-bottom: 13px;
  padding-left: 25px;
  padding-right: 25px;
  border-bottom-width: 0.5px;
  border-bottom-color: #DBDBDB;
`;

const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const UserNameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UserCircle = styled.View`
  width: 25px;
  height: 25px;
  border-radius: 15px;
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const UserFirstName = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 11px;
  color: #fff;
`;

const UserName = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 12px;
`;

const CommentDetail = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 12px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const DetailTimeWrapper = styled.View`
  padding-left: 30px;
`;

const DetailFooter = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ReplyButton = styled.TouchableOpacity`
  margin-left: 10px;
  border-width: 0.5px;
  border-color: #AAAAAA;
  border-radius: 20px;
  width: 24.69px;
  height: 11.6px;
  justify-content: center;
  align-items: center;
`;

const ReplyButtonText = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 9px;
  color: #AAAAAA;
`;

const CommentsFooter = styled.View`
  position: absolute;
  height: 80px;
  bottom: 0px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-left: 13px;
  padding-right: 13px;
  background-color: #fff;
`;

const InputBoxWrapper = styled.View`
  flex-direction: row;
  padding-right: 15px;
  padding-left: 15px;
  align-items: center;
  justify-content: space-between;
  border-radius: 36px;
  border-color: #C51E3A;
  border-width: 1px;
  width: 100%;
  height: 48px;
`;

const UserCircle2 = styled.View`
  width: 28.52px;
  height: 28.52px;
  border-radius: 15px;
  background-color: ${(props) => props.color};
  justify-content: center;
  align-items: center;
`;

const CommentInputBox = styled.TextInput`
  font-family: 'Inter-Regular';
  width: 84%;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  padding-right: 10px;
`;

const UploadButton = styled.TouchableOpacity`
`;