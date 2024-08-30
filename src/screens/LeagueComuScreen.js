//LeagueComuScreen.js
import React, {useContext} from 'react'
import { PostsContext } from '../Context API/PostsContext';
import { CommentsContext } from '../Context API/CommentsContext';
import ComuPostListScreen from './ComuPostListScreen';

export default function LeagueComuScreen({posts}) {
  const {getPostById} = useContext(PostsContext);
  const {getTotalCommentCount} = useContext(CommentsContext);

  return (
    <ComuPostListScreen
      posts={posts} 
      getPostById={getPostById} 
      getTotalCommentCount={getTotalCommentCount}
      type="league"
    />
  )
}