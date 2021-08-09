import { useState } from "react";
import { useParams } from "react-router-dom";
const axios = require("axios");

export default function AddComment({ comments, setComments }) {
  const { postId } = useParams();
  console.log(postId);
  const [comment, setComment] = useState("");
  const onSubmit = async function onSubmitComment(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/Posts/${postId}/comments`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        data: {
          text: comment,
        },
      });
      console.log(response.data.comment);
      setComments([response.data.comment, ...comments]);
      setComment("");
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
          placeholder="add Comment"
          className="border-4"
        />
        <button type="onSubmit">submit</button>
      </form>
    </div>
  );
}
