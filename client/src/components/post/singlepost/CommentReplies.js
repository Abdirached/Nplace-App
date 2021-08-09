import { useState } from "react";
import { useSelector } from "react-redux";
import AddCommentReply from "./AddCommentReply";
import UseUser from "../../../hooks/UseUser";

export default function CommentRepliesMain({ repliesData, commentId }) {
  const { currentUser } = UseUser();
  const [commentReplies, setCommentReplies] = useState(repliesData);
  const currentUserInfo = useSelector((state) => state.user);
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
                  <p>{reply.text}</p>
                  <p>
                    {reply.User
                      ? reply.User.firstName
                      : currentUserInfo.user.firstName}
                  </p>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
