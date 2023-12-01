import {useNavigate, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {Post} from '../../types';


const PostForm = () => {
  const navigate = useNavigate();
  const[newPost, setNewPost] = useState({
    dateTime: '',
    title: '',
    body: '',
  });
  const [loading, setLoading] = useState(false);

  const params = useParams() as {postId: string};

  const postChanged = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setNewPost(prevState => ({
      ...prevState,
      [name]:value,
    }));
  }, []);
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    newPost.dateTime = getCurrentDateTime();
    try {
      await axiosApi.post('posts.json', newPost);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const editPost = useCallback(async () => {
    const response = await axiosApi.get('posts/' + params.postId + '.json');
    const data: Post = response.data;

    const postEditedId = params.postId;
    const postEditedTitle = data.title;
    const postEditedDateTime = data.dateTime;
    const postEditedBody = data.body;

    const postEditedObject: Post = {
      id: postEditedId,
      dateTime: postEditedDateTime,
      title: postEditedTitle,
      body: postEditedBody,
    };

    setNewPost(postEditedObject);
  },[params.postId]);

  useEffect(() => {
    if(params.postId) {
      void editPost();
    }
  }, [params.postId, editPost]);

  const form = (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title" type="text" name="title" required
          className="form-control"
          value={newPost.title}
          onChange={postChanged}
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Description</label>
        <input
          id="body" type="text" name="body" required
          className="form-control"
          value={newPost.body}
          onChange={postChanged}
        />
      </div>
      <button disabled={loading} type="submit" className="btn btn-primary m-3">
        Add post
      </button>
    </form>
  );

  return (
    <div className="m-3">
      <div>{form}</div>
    </div>
  );
};

export default PostForm;