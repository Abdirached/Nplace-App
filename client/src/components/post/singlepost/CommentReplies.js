import React from "react";

export default function CommentReplies({ repliesData }) {
  return (
    <div>
      {repliesData.map((reply) => (
        <div className="border-2 border-opacity-5" key={reply.commentReplyId}>
          <p>{reply.text}</p>
          <p>{reply.User ? reply.User.firstName : null}</p>
        </div>
      ))}
    </div>
  );
}
