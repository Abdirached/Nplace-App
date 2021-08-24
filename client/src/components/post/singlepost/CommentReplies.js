import { useState } from "react";
import AddCommentReply from "./AddCommentReply";
import DeleteCommentReply from "./DeleteCommentReply";
const userId = JSON.parse(localStorage.getItem("userId"));

export default function CommentRepliesMain({ repliesData, commentId }) {
  const [commentReplies, setCommentReplies] = useState(repliesData);
  const [toggle, setToggle] = useState(false);
  const handleToggle = function handleToggleReplyInput() {
    setToggle(true);
  };
  if (!toggle) return <button onClick={handleToggle}>ViewReplies</button>;
  return (
    <>
      <div>
        <div>
          <AddCommentReply
            commentReplies={commentReplies}
            setCommentReplies={setCommentReplies}
            commentId={commentId}
          />
        </div>
        <div>
          <button
            onClick={() => {
              setToggle(false);
            }}
          >
            Hide Replies
          </button>
        </div>
        <div>
          {commentReplies
            ? commentReplies.map((reply) => (
                <div
                  className="border-2 border-opacity-5"
                  key={reply.commentReplyId}
                >
                  {userId == reply.User?.userId ? (
                    <div>
                      <audio src={reply.text} controls />
                      <p>{reply.User?.firstName}</p>
                      <DeleteCommentReply
                        commentReplies={commentReplies}
                        setCommentReplies={setCommentReplies}
                        commentId={commentId}
                        commentReplyId={reply.commentReplyId}
                      />
                    </div>
                  ) : (
                    <div>
                      <audio src={reply.text} controls />
                      <p>{reply.User?.firstName}</p>
                    </div>
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
