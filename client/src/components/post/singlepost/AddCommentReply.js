import { useState } from "react";
import { useParams } from "react-router-dom";
const axios = require("axios");

export default function AddCommentReply({
  commentReplies,
  setCommentReplies,
  commentId,
  commentOwner,
}) {
  const { postId } = useParams();
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const [commentReply, setCommentReply] = useState("");
  const [toggle, setToggle] = useState(false);
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
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/Notifications`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        data: {
          action: "replied",
          actorId: currentUserId,
          recipientId: commentOwner,
          notifiableId: postId,
          notifiableObject: "Comment",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="inline-block h-full w-full">
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
          <button onClick={() => setToggle(!toggle)} className="mr-2 ml-2">
            Cancel
          </button>
          <button type="onSubmit">submit</button>
        </form>
      ) : (
        <button onClick={() => setToggle(!toggle)}>Reply</button>
      )}
    </div>
  );
}
