import React, { useState } from 'react';
import { community_context_api } from '../api/community/community.context'

const Context = React.createContext();
const ContextProvider = ({children}) => {
    const [postData, setPostData] = useState({
        "created_at": "2024-08-11T08:30:14.000Z",
        img_urls: []
      })
    const [postList, setPostList] = useState([{data: {}}]);
    
    const community_context = community_context_api
    return (
        <Context.Provider value={{ community_context, postData, postList }}>
            {children}
        </Context.Provider>
    );
};
export { Context, ContextProvider };