// CommunityScreen.js
import React, {useState, useEffect,  useContext} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import LeagueComuScreen from './LeagueComuScreen';
import MyTeamComuScreen from './MyTeamComuScreen';
import { PostsContext } from '../Context API/PostsContext';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function CommunityScreen({ navigation }) {
  const {posts, setPosts, fetchPosts, loading, error} = useContext(PostsContext);
  const [selectedCategory, setSelectedCategory] = useState('league');
  const route = useRoute();

  useEffect(() => {
    fetchPosts(selectedCategory); // 선택된 카테고리에 따라 포스트 가져오기

    const unsubscribe = navigation.addListener('focus', () => {
      const updatedPost = route.params?.updatedPost;
      if (updatedPost) {
        setPosts(prevPosts => prevPosts.map(post => 
          post.postId === updatedPost.postId ? updatedPost : post
        ));
      }
    });
  
    return unsubscribe;
  }, [selectedCategory, navigation, route.params?.updatedPost]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const filteredPosts = posts.filter(post => post.type === selectedCategory);

  return (
    <Wrapper>
      <HeaderWrapper>
        <CtgyWrapper>
          <CtgyButton 
          onPress={() => setSelectedCategory('league')} 
          isActive={selectedCategory === 'league'}
          >
            <CtgyText>리그 커뮤니티</CtgyText>
            <TextWrapper1 isActive={selectedCategory === 'league'} />
          </CtgyButton>
          <CtgyButton 
          onPress={() => {setSelectedCategory('team')}}
          isActive={selectedCategory === 'team'}
          >
            <CtgyText>마이팀 커뮤니티</CtgyText>
            <TextWrapper2 isActive={selectedCategory === 'team'} />
          </CtgyButton>
        </CtgyWrapper>
        <InputBoxWrapper>
          <SearchButton>
            <Feather name="search" size={20} color="#C51E3A" />
          </SearchButton>
          <InputBox 
          placeholder='글을 입력하여주세요' 
          placeholderTextColor={'#C51E3A'}
          multiline
          />
        </InputBoxWrapper>
      </HeaderWrapper>
      {selectedCategory === 'league' ? (
        <LeagueComuScreen posts={filteredPosts} />
      ) : (
        <MyTeamComuScreen posts={filteredPosts} />
      )}
      <ButtonWrapper>
        <WriteButton onPress={() => navigation.navigate('ComuWriteScreen', {type: selectedCategory})}>
          <FontAwesome6 name="pen" size={20} color="#fff" />
          <ButtonText>글 쓰기</ButtonText>
        </WriteButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const HeaderWrapper = styled.View`
  margin-right: 13px;
  margin-left: 13px;
  padding-bottom: 5px;
  justify-content: center;
  align-items: center;
`;

const CtgyWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 13px;
`;

const CtgyButton = styled.TouchableOpacity`
  width: 50%;
  height: 42px;
  align-items: center;
  justify-content: center;
`;

const TextWrapper1 = styled.View`
  position: absolute;
  bottom: 5px;
  width: 80px;
  border-bottom-width: ${({ isActive }) => (isActive ? '2px' : '0')};
  border-bottom-color: ${({ isActive }) => (isActive ? '#000000' : 'transparent')};
`;

const TextWrapper2 = styled.View`
  position: absolute;
  bottom: 5px;
  width: 90px;
  border-bottom-width: ${({ isActive }) => (isActive ? '2px' : '0')};
  border-bottom-color: ${({ isActive }) => (isActive ? '#000000' : 'transparent')};
`;

const CtgyText = styled.Text`
  font-size: 17px;
  width: 100%;
  text-align: center;
  font-family: 'Inter-Bold';
`;

const InputBoxWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 20px;
  border-color: #C51E3A;
  border-width: 1px;
  width: 100%;
  height: 34px;
  gap: 5px;
`;

const InputBox = styled.TextInput`
  font-size: 17px;
  font-family: 'Inter-Regular';
  color: #C51E3A;
  width: 90%;
  height: auto;
  align-items: center;
  justify-content: center;
`;

const SearchButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 0px;
  right: 0px;
  background-color: #C51E3A;
  width: 100px;
  height: 35px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 1px 1px;
  shadow-opacity: 0.3;
  shadow-radius: 2px;
  elevation: 2;
  right: 13px;
  bottom: 13px;
`;

const WriteButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-family: 'Inter-Bold';
  font-size: 16px;
  margin-left: 10px;
`;