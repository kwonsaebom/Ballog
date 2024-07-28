import React, { createContext, useState } from 'react';

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState({});

  const addComment = (postId, newComment) => {
    setComments(prevComments => {
      const postComments = prevComments[postId] || [];
      return {
        ...prevComments,
        [postId]: [...postComments, newComment]
      };
    });
  };

  return (
    <CommentsContext.Provider value={{ comments, addComment }}>
      {children}
    </CommentsContext.Provider>
  );
};
