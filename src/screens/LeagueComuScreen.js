//LeagueComuScreen.js
import React, {useContext} from 'react'
import { PostsContext } from '../Context API/PostsContext';
import { CommentsContext } from '../Context API/CommentsContext';
import ComuPostList from './ComuPostList';

export default function LeagueComuScreen({posts}) {
  const {getPostById} = useContext(PostsContext);
  const {getTotalCommentCount} = useContext(CommentsContext);

  return (
    <ComuPostList
      posts={posts} 
      getPostById={getPostById} 
      getTotalCommentCount={getTotalCommentCount}
      category="league"
    />
  )
}