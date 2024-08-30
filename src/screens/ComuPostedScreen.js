//ComuPostedScreen.js
import React, { useState, useContext, useMemo, useRef } from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { PostsContext } from "../Context API/PostsContext";
import { CommentsContext } from "../Context API/CommentsContext";
import { getRandomPastelColor } from "../utils/colors";
import ReplyIconImg from "../assets/icons/replyicon.png";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

export default function ComuPostedScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { updateLikes, getPostById, deletePost } = useContext(PostsContext);
  const { comments, addComment, addReply, getTotalCommentCount } =
    useContext(CommentsContext);
  const { postId, category } = route.params || {};
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [userName, setUserName] = useState("익명");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const post = getPostById(postId);

  const [inputValue, setInputValue] = useState("");
  const [replyInputValue, setReplyInputValue] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState(null);

  const postComments = comments[postId] || [];

  const userCircleColors = useMemo(() => {
    const colors = {};
    postComments.forEach((comment) => {
      colors[comment.id] = getRandomPastelColor();
    });
    return colors;
  }, [postComments]);

  const inputRef = useRef(null);

  const handleBackPress = () => {
    navigation.navigate("MainTabs", {
      screen: "커뮤니티",
      params: { category },
    });
  };

  const handleCommentSubmit = () => {
    if (inputValue.trim() === "") return;

    const newComment = {
      id: Date.now().toString(),
      username: userName,
      detail: inputValue,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      replies: [],
    };

    addComment(postId, newComment);
    setInputValue("");
  };

  const handleReplySubmit = () => {
    if (replyInputValue.trim() === "" || replyToCommentId === null) return;

    const newReply = {
      id: Date.now().toString(),
      username: userName,
      detail: replyInputValue,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    addReply(postId, replyToCommentId, newReply);
    setReplyInputValue("");
    setReplyToCommentId(null);
  };

  const handleEditPress = () => {
    navigation.navigate("ComuWriteScreen", {
      postId: post.id,
      category: post.category,
    });
  };

  const handleDeletePress = () => {
    deletePost(postId);
    navigation.navigate("MainTabs", {
      screen: "커뮤니티",
      params: { category },
    });
  };

  const openReplyModal = (commentId) => {
    setReplyToCommentId(commentId);
    setModalType("reply");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
  };

  const confirmReply = () => {
    closeModal();
    if (inputRef.current) {
      inputRef.current.focus(); //작성 버튼 클릭 시 포커스
      Keyboard.addListener("keyboardDidShow", () => {}); //키보드 활성화
    }
    handleReplySubmit();
  };

  const totalCommentCount = getTotalCommentCount(postId);

  return (
    <Wrapper>
      <ComuPostedHeader>
        <BackButton onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </BackButton>
        <ScreenTitleWrapper>
          <ScreenTitle>
            {selectedCategory === "league"
              ? "리그 커뮤니티"
              : "마이팀 커뮤니티"}
          </ScreenTitle>
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
                source={{ uri: imageUri }}
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
                <MaterialCommunityIcons
                  name="message-reply-outline"
                  size={12}
                  color="#8892F7"
                />
              </ChatIcon>
              <ChatCount>{totalCommentCount}</ChatCount>
            </IconWrapper>
            <ButtonWrapper>
              <EditDeleteButton onPress={handleEditPress}>
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
          </PostFooter>
        </ComuPostedBox>
        <LayoutBox>
          {postComments.map((comment) => (
            <CommetsBoxWrapper key={comment.id}>
              <CommentsBox>
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
                    <ReplyButton
                      onPress={() => {
                        openReplyModal(comment.id);
                      }}
                    >
                      <ReplyButtonText>답글</ReplyButtonText>
                    </ReplyButton>
                  </DetailFooter>
                </DetailTimeWrapper>
              </CommentsBox>

              {comment.replies.map((reply) => (
                <ReplyBox key={reply.id}>
                  <ReplyIcon source={ReplyIconImg} />
                  <UserInfo>
                    <UserNameWrapper>
                      <UserCircle color={getRandomPastelColor()}>
                        <UserFirstName>{reply.username.slice(1)}</UserFirstName>
                      </UserCircle>
                      <UserName>{reply.username}</UserName>
                      <MyselfMark>
                        <MyselfMarkText>나</MyselfMarkText>
                      </MyselfMark>
                    </UserNameWrapper>
                  </UserInfo>
                  <DetailTimeWrapper>
                    <CommentDetail>{reply.detail}</CommentDetail>
                    <DetailFooter>
                      <DateTime>{`${reply.date} | ${reply.time}`}</DateTime>
                    </DetailFooter>
                  </DetailTimeWrapper>
                </ReplyBox>
              ))}
            </CommetsBoxWrapper>
          ))}
        </LayoutBox>
      </ScrollContainer>

      <CommentsFooter>
        <InputBoxWrapper>
          <UserCircle2 color={getRandomPastelColor()}>
            <UserFirstName>길동</UserFirstName>
          </UserCircle2>
          {replyToCommentId ? (
            <ReplyInputBox
              ref={inputRef}
              placeholder="답글을 입력해주세요"
              placeholderTextColor={"#B5B5B5"}
              multiline
              value={replyInputValue}
              onChangeText={setReplyInputValue}
            />
          ) : (
            <CommentInputBox
              placeholder="댓글을 입력해주세요"
              placeholderTextColor={"#B5B5B5"}
              multiline
              value={inputValue}
              onChangeText={setInputValue}
            />
          )}
          <UploadButton
            onPress={replyToCommentId ? handleReplySubmit : handleCommentSubmit}
          >
            <Feather name="send" size={24} color="#C51E3A" />
          </UploadButton>
        </InputBoxWrapper>
      </CommentsFooter>

      {showModal && (
        <ReplyModalWrapper>
          <ReplyModal>
            <ReplyOptionText>답글을 작성하시겠습니까?</ReplyOptionText>
            <OptionButtonWrapper>
              <OptionButton onPress={closeModal}>
                <OptionButtonText>취소</OptionButtonText>
              </OptionButton>
              <OptionButton onPress={confirmReply}>
                <OptionButtonText>작성</OptionButtonText>
              </OptionButton>
            </OptionButtonWrapper>
          </ReplyModal>
        </ReplyModalWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
  background-color: #f8f8f8;
`;

const ComuPostedHeader = styled.View`
  border-width: 1px;
  border-color: #dbdbdb;
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

const ScrollContainer = styled.ScrollView`
  margin-bottom: 80px;
`;

const ScreenTitleWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const ScreenTitle = styled.Text`
  font-family: "Inter-Bold";
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
  background-color: #e2b066;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const FirstName = styled.Text`
  font-family: "Inter-Bold";
  font-size: 15px;
  color: #fff;
`;

const WriterName = styled.Text`
  font-family: "Inter-Bold";
  font-size: 15px;
`;

const DateTime = styled.Text`
  color: #aaaaaa;
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
  font-family: "Inter-Bold";
  font-size: 18px;
`;

const PostDetail = styled.View`
  margin-top: 10px;
`;

const PostDetailText = styled.Text`
  font-family: "Inter-Regular";
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
  height: ${({ hasImages }) => (hasImages ? "auto" : "25px")};
  padding-top: 10px;
  padding-bottom: 10px;
`;

const PostImage = styled.Image`
  flex-direction: row;
  width: 92px;
  height: 92px;
  border-radius: 13px;
  border-width: 1px;
  border-color: #d9d9d9;
  margin-left: ${({ isFirst }) => (isFirst ? "25px" : "0px")};
  margin-right: ${({ isLast }) => (isLast ? "25px" : "13px")};
  z-index: 1;
`;

const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LikeIcon = styled.TouchableOpacity``;

const ChatIcon = styled.View``;

const LikeCount = styled.Text`
  color: #e05936;
  margin-right: 5px;
  margin-left: 2px;
  font-size: 14px;
`;

const ChatCount = styled.Text`
  color: #8892f7;
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
  background-color: #d9d9d9;
  border-radius: 18px;
  width: 53px;
  justify-content: center;
  align-items: center;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const ButtonText = styled.Text`
  font-family: "Inter-Bold";
  font-size: 11px;
  margin-right: 2px;
`;

const CommetsBoxWrapper = styled.View``;

const CommentsBox = styled.View`
  padding-top: 13px;
  padding-bottom: 13px;
  padding-left: 25px;
  padding-right: 25px;
  border-bottom-width: 0.5px;
  border-bottom-color: #dbdbdb;
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
  font-family: "Inter-Bold";
  font-size: 11px;
  color: #fff;
`;

const UserName = styled.Text`
  font-family: "Inter-Bold";
  font-size: 12px;
`;

const CommentDetail = styled.Text`
  font-family: "Inter-Regular";
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
  border-color: #aaaaaa;
  border-radius: 20px;
  width: 24.69px;
  height: 11.6px;
  justify-content: center;
  align-items: center;
`;

const ReplyButtonText = styled.Text`
  font-family: "Inter-Regular";
  font-size: 9px;
  color: #aaaaaa;
`;

const ReplyBox = styled.View`
  padding-top: 13px;
  padding-bottom: 13px;
  padding-left: 40px;
  padding-right: 25px;
  border-bottom-width: 0.5px;
  border-bottom-color: #dbdbdb;
  background-color: #f2f2f2;
`;

const ReplyIcon = styled.Image`
  position: absolute;
  left: 20px;
  top: 10px;
  width: 12.73px;
  height: 14.09px;
`;

const MyselfMark = styled.View`
  align-items: center;
  justify-content: center;
  border-width: 0.5px;
  border-color: #c51e3a;
  border-radius: 20px;
  width: 15.95px;
  height: 10.61px;
  margin-left: 5px;
`;

const MyselfMarkText = styled.Text`
  font-size: 8px;
  color: #c51e3a;
  font-family: "Inter-Regular";
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
  border-color: #c51e3a;
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
  font-family: "Inter-Regular";
  width: 84%;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  padding-right: 10px;
`;

const LayoutBox = styled.View``;

const ReplyInputBox = styled.TextInput`
  font-family: "Inter-Regular";
  width: 84%;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  padding-right: 10px;
`;

const UploadButton = styled.TouchableOpacity``;

const ReplyModalWrapper = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
`;

const ReplyModal = styled.View`
  width: 210px;
  height: 90px;
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
`;

const ReplyOptionText = styled.Text`
  font-family: "Inter-Regular";
  font-size: 16px;
`;

const OptionButtonWrapper = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 15px;
  right: 15px;
  gap: 10px;
`;

const OptionButton = styled.TouchableOpacity`
  background-color: #d9d9d9;
  width: 38px;
  height: 19px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
`;

const OptionButtonText = styled.Text`
  font-family: "Inter-Regular";
  font-size: 13px;
`;
