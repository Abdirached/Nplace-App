import { useState } from "react";
import { useSelector } from "react-redux";
import AddComment from "./AddComment";
import CommentReplies from "./CommentReplies";

export default function Comments({ commentData }) {
  const [comments, setComments] = useState(commentData);
  const currentUserInfo = useSelector((state) => state.user);
  return (
    <>
      <div>
        <AddComment comments={comments} setComments={setComments} />
      </div>
      <div>
        {comments.map((comment) => (
          <div key={comment.commentId}>
            <div>
              <p>{comment.text}</p>
              <p>
                {comment.User
                  ? comment.User.firstName
                  : currentUserInfo.user.firstName}
              </p>
            </div>
            <CommentReplies
              repliesData={comment.CommentReplies}
              commentId={comment.commentId}
            />
          </div>
        ))}
      </div>
    </>
  );
}
