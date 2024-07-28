//MyTeamComuScreen.js
import React, {useContext} from 'react'
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PostsContext } from '../Context API/PostsContext';
import { CommentsContext } from '../Context API/CommentsContext';
import { useNavigation } from '@react-navigation/native';

export default function LeagueComuScreen({posts}) {
  const {updateLikes, getPostById} = useContext(PostsContext);
  const {comments} = useContext(CommentsContext);
  const navigation = useNavigation();

  if (!posts || posts.length === 0) {
    return (
      <DefaultTextWrapper>
        <DefaultText>게시글이 아직 없습니다.</DefaultText>
      </DefaultTextWrapper>
    );
  }

  return (
    <ScrollWrapper showsVerticalScrollIndicator={false}>
      <ComuBoxWrapper>
        {posts.map((post, index) => {
          const postComments = comments ? comments[post.id] || [] : [];
            return (
              <ComuBox 
                key={`${post.id}-${index}`} 
                isFirst={index === 0} 
                isLast={index === post.length - 1}
                onPress={() => navigation.navigate('ComuPostedScreen', {
                  postId: post.id, 
                  category: post.category,
                  postData: getPostById(post.id) //게시글 데이터 전달
                })}
              >
                <DetailBox hasImage={post.images && post.images.length > 0}>
                  <DetailWrapper>
                    <ComuTitle numberOfLines={1}>{post.title}</ComuTitle>
                    <ComuDetail numberOfLines={1}>{post.detail}</ComuDetail>
                  </DetailWrapper>
                  <ComuFooter>
                    <IconWrapper>
                      <LikeIcon onPress={() => updateLikes(post.id)}><AntDesign name="hearto" size={10} color="#E05936" /></LikeIcon>
                      <LikeCount>{post.likes}</LikeCount>
                      <ChatIcon><MaterialCommunityIcons name="message-reply-outline" size={10} color="#8892F7" /></ChatIcon>
                      <ChatCount>{postComments.length}</ChatCount>
                    </IconWrapper>
                    <DateTime>{`| ${post.date} ${post.time} | ${post.author_name}`}</DateTime>
                  </ComuFooter>
                </DetailBox>
                {post.images && post.images.length > 0 && (
                <ComuImgBox>
                  <ComuImg source={{uri: post.images[0]}} />
                </ComuImgBox>
                )}
              </ComuBox>
            );
        })}
      </ComuBoxWrapper>
    </ScrollWrapper>
  )
}

const ScrollWrapper = styled.ScrollView`
  width: 100%;
  height: auto;
`;

const ComuBoxWrapper = styled.View`
  padding-right: 13px;
  padding-left: 13px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ComuBox = styled.TouchableOpacity`
  border-top-width: ${props => (props.isFirst ? '0.5px' : '0')};
  border-top-color: #CCCCCC;
  border-bottom-width: ${props => (props.isLast ? '0' : '0.5px')};
  border-bottom-color: #CCCCCC;
  width: 100%;
  height: 80px;
  padding-right: 12px;
  padding-left: 12px;
  padding-top: 2px;
  padding-bottom: 2px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DetailBox = styled.View`
  justify-content: center;
  width: ${({ hasImage }) => (hasImage ? '260px' : '100%')};
  padding-right: 10px;
  margin-top: 12px;
  margin-bottom: 12px;
`;

const DetailWrapper = styled.View`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ComuTitle = styled.Text`
  font-family: 'Inter-Bold';
  font-size: 14px;
  margin-bottom: 2px;
`;

const ComuDetail = styled.Text`
  font-family: 'Inter-Regular';
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
`;

const ComuImgBox = styled.View`
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const ComuImg = styled.Image`
  width: 69px;
  height: 69px;
  border-radius: 10px;
  resize-mode: cover;
`;

const ComuFooter = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LikeIcon = styled.TouchableOpacity``;

const ChatIcon = styled.View``;

const LikeCount = styled.Text`
  color: #E05936;
  margin-right: 5px;
  margin-left: 2px;
  font-size: 11px;
`;

const ChatCount = styled.Text`
  color: #8892F7;
  font-size: 11px;
  margin-right: 3px;
  margin-left: 2px;
`;

const DateTime = styled.Text`
  color: #AAAAAA;
  font-size: 11px;
`;

const DefaultTextWrapper = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`;


const DefaultText = styled.Text`
  font-family: 'Inter-Regular';
`;