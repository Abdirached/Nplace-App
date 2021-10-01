import { useState } from "react";
import { useParams } from "react-router-dom";
const axios = require("axios");
export default function EditComment({
  comments,
  setComments,
  commentId,
  commentText,
}) {
  const { postId } = useParams();
  const [comment, setComment] = useState(commentText);
  const onSubmit = async function onSubmitComment(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:5000/Posts/${postId}/comments/${commentId}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        data: {
          text: comment,
        },
      });
      // filter comments in the state to remove the old one thats updated
      const foundComments = comments.filter(
        (comment) => comment.commentId != response.data.comment[1][0].commentId
      );
      console.log(response.data.comment[1][0]);
      setComments([response.data.comment[1][0], ...foundComments]);
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="textArea"
          name="addComment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="edit Comment"
          className="border-4"
        />
        <button type="onSubmit">submit</button>
      </form>
    </div>
  );
}
