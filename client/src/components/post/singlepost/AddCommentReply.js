import { useState } from "react";
import { useParams } from "react-router-dom";
const axios = require("axios");

export default function AddCommentReply({
  commentReplies,
  setCommentReplies,
  commentId,
}) {
  const { postId } = useParams();
  console.log(commentId);
  const [commentReply, setCommentReply] = useState("");
  const [toggle, setToggle] = useState(false);
  const handleToggle = function handleToggleReplyInput() {
    setToggle(true);
  };
  const onSubmit = async function onSubmitComment(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/Posts/${postId}/comments/${commentId}/commentReply`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        data: {
          text: commentReply,
        },
      });
      console.log(response.data);
      setCommentReplies([response.data.commentReply, ...commentReplies]);
      setCommentReply("");
    } catch (error) {}
  };
  return (
    <div>
      {toggle ? (
        <form onSubmit={onSubmit}>
          <input
            type="textArea"
            name="addCommentReply"
            value={commentReply}
            onChange={(e) => setCommentReply(e.target.value)}
            placeholder="add commentReply"
            className="border-2"
          />
          <button type="onSubmit">submit</button>
        </form>
      ) : (
        <button onClick={handleToggle}>Reply</button>
      )}
    </div>
  );
}
