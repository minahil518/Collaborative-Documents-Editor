import React from 'react'
import { useAppSelector } from '../hooks'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export interface DocComment {
  id: string;
  text: string;
  comment: string;
  from: number;
  to: number;
  selection: string;
  user: {
    name: string;
    color: string;
    avatar?: string;
  }
  documentId: string;
}

const Comments: React.FC = () => {

  const comments = useSelector((state: RootState) => state.comments.list)

  type Comment = {
    id: React.Key | null | undefined;
    user: {
      color: string;
      name: string;
    };
    text: string;
    comment: string;
  };
  
  return (
    <div className="border p-3 bg-light">
      <h5>Comments</h5>
      {comments.map((comment: Comment) => (
        <div key={comment.id} className="mb-2">
          <strong style={{ color: comment.user.color }}>
            {comment.user.name}:
          </strong>
          <p>
            <em>{comment.text}</em>
          </p>
          <p>{comment.comment}</p>
        </div>
      ))}
    </div>
  );
  
}
export default Comments
