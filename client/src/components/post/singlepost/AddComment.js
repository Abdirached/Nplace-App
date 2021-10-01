import { useState } from "react";
import { useParams } from "react-router-dom";
const axios = require("axios");

export default function AddComment({ comments, setComments, postOwner }) {
  console.log(postOwner);
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const [comment, setComment] = useState("");
  const { postId } = useParams();
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
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/Notifications`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        data: {
          action: "commented",
          actorId: currentUserId,
          recipientId: postOwner,
          notifiableId: postId,
          notifiableObject: "post",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
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
