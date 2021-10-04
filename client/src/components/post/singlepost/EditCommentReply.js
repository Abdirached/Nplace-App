import { useState } from "react";
import { useParams } from "react-router-dom";
const axios = require("axios");
export default function EditCommentReply({
  commentReplies,
  setCommentReplies,
  commentId,
  commentReplyId,
  commentReplyText,
  setshowEditComponent,
}) {
  const { postId } = useParams();
  const [commentReply, setCommentReply] = useState(commentReplyText);
  const onSubmit = async function onSubmitCommentReply(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:5000/Posts/${postId}/comments/${commentId}/commentReply/${commentReplyId}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        data: {
          text: commentReply,
        },
      });
      // filter comments in the state to remove the old one thats updated
      const foundCommentReplies = commentReplies.filter(
        (commentReply) =>
          commentReply.commentReplyId !=
          response.data.commentReply.commentReplyId
      );
      console.log(response.data.commentReply);
      setCommentReplies([response.data.commentReply, ...foundCommentReplies]);
      setshowEditComponent(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
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
    </div>
  );
}
