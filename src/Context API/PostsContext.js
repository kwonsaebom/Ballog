//PostsContext.js
import React, {useState} from 'react'

const PostsContext = React.createContext();

const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const getPostById = (id) => posts.find(post => post.id === id);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const updateLikes = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? {...post, likes: post.likes + 1} : post
    ));
  };

  return (
    <PostsContext.Provider value={{ posts, addPost, updateLikes, getPostById }}>
      {children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsProvider };
