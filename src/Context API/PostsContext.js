//PostsContext.js
import React, {useState} from 'react'
import api from './api';
import { community_api } from '../api/community/community.api';

const PostsContext = React.createContext();

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => []);
  const [categoryPosts, setCategoryPosts] = useState({
    league: [],
    team: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async (type) => {
    if (categoryPosts[type].length > 0) {
        return; // 이미 데이터가 로드된 경우, 새로 요청하지 않음
    }
    setLoading(true);
    setError(null);
    try {
        const response = await community_api.get_list(type)
        //console.log('서버에서 가져온 게시글:', response.result);
        setCategoryPosts(prevState => ({
            ...prevState,
            [type]: response.result
        }));
    } catch (error) {
      setError('게시글 로드 실패');
      console.error('게시글 목록 불러오기 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const getPostById = (id) => {
    console.log(`getPostById 호출됨: id=${id}`);
    return posts.find(post => post.postId === id)
  };

  const addPost = async (newPost) => {
    const req = {
      title: newPost.title,
      content: newPost.content,
      img_urls: newPost.imageUrls,
      type: newPost.type,
    }
    try {
      setLoading(true);
      const response = await community_api.post(req);
      if (response.isSuccess) {
        const serverPostId = response.result; // 서버에서 반환된 postId
        const updatedPost = { ...newPost, postId: serverPostId }; // postId 갱신
        console.log('서버에 추가된 게시글:', updatedPost);

        setPosts([updatedPost, ...posts]); // posts 상태 업데이트
        console.log('업데이트된 posts 상태:', [updatedPost, ...posts]);
        return serverPostId; // 서버에서 반환된 postId 반환
      } else {
        setError('게시글 작성 실패');
      }
    } catch (error) {
      setError('게시글 작성 실패');
      console.error('글 작성 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (updatedPost) => {
    try {
      setLoading(true);
      //const response = await api.patch(`/community/post/${updatedPost.postId}`, updatedPost);
      const response = await community_api.patch(updatedPost,);
      if (response.data.isSuccess) {
        console.log('서버에서 업데이트된 게시글:', updatedPost);
        setPosts(posts.map(post => 
          post.postId === updatedPost.postId ? updatedPost : post
        ));
        setCategoryPosts(prevState => {
          const updatedCategory = prevState[updatedPost.type].map(post => 
            post.postId === updatedPost.postId ? updatedPost : post
          );
          return {
            ...prevState,
            [updatedPost.type]: updatedCategory,
          };
        });
      } else {
        setError('게시글 수정 실패');
      }
    } catch (error) {
      setError('게시글 수정 실패');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId) => {
    try {
      setLoading(true);
      const response = await api.delete(`/community/post/${postId}`);
      if (response.data.isSuccess) {
        setPosts(posts.filter(post => post.postId !== postId));
      } else {
        setError('게시글 삭제 실패');
      }
    } catch (error) {
      setError('게시글 삭제 실패');
      console.error('게시글 삭제 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const getPostDetail = async (postId) => {
    try {
      const response = await api.get(`/community/post/${postId}`);
      if (response.data.isSuccess) {
        console.log('글 상세 조회 성공:', response.data.result);
        return response.data.result; // 게시글 상세 정보 반환
      } else {
        console.error('글 상세 조회 실패:', response.data.message);
      }
    } catch (error) {
      console.error('글 상세 조회 중 오류 발생:', error);
    }
  };

  const toggleLike = async (postId) => {
    try {
      // 현재 게시글 상태 가져오기
      const post = posts.find(post => post.postId === postId);
      const updatedPost = {
        ...post,
        has_liked: !post.has_liked, // 좋아요 상태 토글
        like_count: post.has_liked ? post.like_count - 1 : post.like_count + 1 // 좋아요 수 증가/감소
      };
  
      // UI 업데이트를 먼저 수행
      setPosts(posts.map(post => post.postId === postId ? updatedPost : post));
  
      const post_user_id = 'test3'; // 실제 사용자 ID로 대체
      const response = await api.post(`/api-utils/post_like`, {
        post_id: postId,
        post_user_id,
        checked: updatedPost.has_liked, // 좋아요 상태 전달
        post_type: 'community',
      });
  
      if (!response.data.isSuccess) {
        console.error('좋아요 요청 실패:', response.data.message);
        // 서버 요청 실패 시 상태를 다시 원래대로 되돌림
        setPosts(posts);  // 실패 시 이전 상태로 복구
      } else {
        console.log('좋아요 토글 결과:', updatedPost);
      }
    } catch (error) {
      console.error('좋아요 토글 실패', error);
      // 서버 요청이 실패했을 때 상태를 다시 원래대로 되돌림
      setPosts(posts);
    }
  };

  return (
    <PostsContext.Provider value={{ posts, setPosts, fetchPosts, addPost, updatePost, deletePost, toggleLike, getPostById, getPostDetail, loading, error, categoryPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsProvider };