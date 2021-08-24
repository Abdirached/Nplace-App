import { useState } from "react";
import AddComment from "./AddComment";
import CommentReplies from "./CommentReplies";
import DeleteComment from "./DeleteComment";

export default function Comments({ commentData }) {
  const [comments, setComments] = useState(commentData);
  const userId = JSON.parse(localStorage.getItem("userId"));
  return (
    <>
      <div>
        <AddComment comments={comments} setComments={setComments} />
      </div>
      <div>
        {comments.map((comment) => (
          <div key={comment.commentId}>
            {userId == comment.User?.userId ? (
              <div>
                <audio src={comment.text} controls />
                <p>{comment.User?.firstName}</p>
                <div>
                  <DeleteComment
                    comments={comments}
                    setComments={setComments}
                    commentId={comment.commentId}
                  />
                </div>
              </div>
            ) : (
              <div>
                <audio src={comment.text} controls />
                <p>{comment.User?.firstName}</p>
              </div>
            )}
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
