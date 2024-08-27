//PostsContext.js
import React, {useState} from 'react'

const PostsContext = React.createContext();

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => []);

  const getPostById = (id) => posts.find(post => post.id === id);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? {
            ...post,
            has_liked: !post.has_liked, // 좋아요 상태 토글
            likes: post.has_liked ? post.likes - 1 : post.likes + 1 // 좋아요 수 증가/감소
          }
        : post
    ));
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost, toggleLike, getPostById }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsProvider };