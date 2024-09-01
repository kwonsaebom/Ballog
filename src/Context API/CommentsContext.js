//CommentContext.js
import React, { createContext, useState } from 'react';

export const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);

  const addComment = (post_id, newComment) => { //post_id에 해당하는 newComment 추가
    setComments(prevComments => [ //setComments 호출해서 comments 상태 업데이트
        ...prevComments, //기존 상태 복사
        {post_id, ...newComment} //새 댓글을 기존 댓글 배열(postComments)에 추가
    ]);
  };

  const addReply = (post_id, comment_id, newReply) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.post_id === post_id && comment.id === comment_id) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      })
    );
  };

  const getTotalCommentCount = (post_id) => {
    return comments
      .filter(comment => comment.post_id === post_id)
      .reduce((total, comment) => total + 1 + comment.replies.length, 0);
  };


  return (
    <CommentsContext.Provider value={{ comments, addComment, addReply, getTotalCommentCount }}>
      {children}
    </CommentsContext.Provider>
  );
};