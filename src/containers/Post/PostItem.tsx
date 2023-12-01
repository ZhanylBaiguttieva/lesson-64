
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {Post} from '../../types';

// interface Props {
//   onClick: React.MouseEventHandler;
// }
const PostItem = () => {
  const navigate=useNavigate();
  const [postInfo, setPostInfo] = useState<Post>();

  const params = useParams();

  const fetchPostInfo = useCallback(async () => {
    const response = await axiosApi.get('posts/' + params.postId + '.json');
    const data: Post = response.data;

    const postInfoId = params.postId;
    const postInfoTitle = data.title;
    const postInfoDate = data.date;
    const postInfoBody = data.body;

    const postInfoObject: Post = {
      id: postInfoId,
      date: postInfoDate,
      title: postInfoTitle,
      body: postInfoBody,
    };

    setPostInfo(postInfoObject);
  },[params.postId]);

  useEffect(() => {
    void fetchPostInfo();
  }, [fetchPostInfo]);

  const onDelete = async () => {
    try {
      await axiosApi.delete('posts/' + params.postId + '.json');
      navigate('/');
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  return (
    <div className="row">
      <div className="col-sm-12 rounded-start">
        <div className="card-body mt-3  bg-warning">
          <div className="card-title">{postInfo?.date}</div>
          <div>{postInfo?.title}</div>
          <div>{postInfo?.body}</div>
            <Link to={'/post/'+ params.postId + '/edit'}>Edit article</Link>
          <div>
            <button onClick={onDelete} type="button" className="btn btn-danger m-2 ">Delete post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;