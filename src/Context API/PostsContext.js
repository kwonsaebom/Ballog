//PostsContext.js
import React, {useState} from 'react'

const PostsContext = React.createContext();

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPostById = (id) => posts.find(post => post.id === id);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const updateLikes = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? {...post, likes: post.likes + 1} : post
    ));
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, updatePost, deletePost, updateLikes, getPostById }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsProvider };