import React from "react";
import CommentReplies from "./CommentReplies";

export default function Comments({ commentData }) {
  return (
    <div>
      {commentData.map((comment) => (
        <div key={comment.commentId}>
          <div>
            <p>{comment.text}</p>
            <p>{comment.User ? comment.User.firstName : null}</p>
          </div>
          <CommentReplies repliesData={comment.CommentReplies} />
        </div>
      ))}
    </div>
  );
}
