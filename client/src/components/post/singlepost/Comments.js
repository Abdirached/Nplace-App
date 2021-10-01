import { useState } from "react";
import AddComment from "./AddComment";
import CommentReplies from "./CommentReplies";
import DeleteComment from "./DeleteComment";
import EditComment from "./EditComment";

export default function Comments({ commentData, postOwner }) {
  const [comments, setComments] = useState(commentData);
  const userId = JSON.parse(localStorage.getItem("userId"));
  return (
    <>
      <div>
        <AddComment
          comments={comments}
          setComments={setComments}
          postOwner={postOwner}
        />
      </div>
      <div>
        {comments.map((comment) => (
          <div key={comment.commentId}>
            {userId == comment.User?.userId ? (
              <div>
                <p>{comment.text}</p>
                <p>{comment.User?.firstName}</p>
                <div>
                  <DeleteComment
                    comments={comments}
                    setComments={setComments}
                    commentId={comment.commentId}
                  />
                </div>
                <EditComment
                  comments={comments}
                  setComments={setComments}
                  commentId={comment.commentId}
                  commentText={comment.text}
                />
              </div>
            ) : (
              <div>
                <p>{comment.text}</p>
                <p>{comment.User?.firstName}</p>
              </div>
            )}
            <CommentReplies
              repliesData={comment.CommentReplies}
              commentId={comment.commentId}
              commentOwner={comment.User?.userId}
            />
          </div>
        ))}
      </div>
    </>
  );
}
