
import React, {useCallback, useEffect, useState} from 'react';
import {ListPost, Post} from '../../types';
import {Link} from 'react-router-dom';
import axiosApi from '../../axiosApi';


const Posts:React.FC= () => {
  const [posts, setPosts] = useState<Post[]>([
  ]);

  const fetchPost = useCallback(async () => {
    const response = await axiosApi.get('posts.json');
    const data: ListPost = response.data;
    const postList = Object.entries(data).map(([postId, post]) => {
      return {
        id: postId,
        dateTime: post.dateTime,
        title: post.title,
        body: post.body,
      };
    });
    setPosts(postList);
  },[]);

  useEffect(() => {
    void fetchPost();
  }, [fetchPost]);


  return (
    <div className="mt-5">
      <h4 className="mb-4">Posts</h4>
      {posts.map(post => (
        <div className="bg-warning mb-3" key={post.id}>
          <p>Created on: {post.dateTime}</p>
          <p>{post.title}</p>
          <Link to={'/post/' + post.id}>View more &gt;</Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
