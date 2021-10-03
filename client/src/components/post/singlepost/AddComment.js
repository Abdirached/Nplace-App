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
    <div className="h-12 mb-16">
      <form onSubmit={onSubmit}>
        <input
          type="textArea"
          name="addComment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="    Add Comment"
          className="border-b border-gray-500  outline-none h-12 w-full mt-2 block"
        />
        <button
          type="submit"
          className="bg-blue-medium text-white rounded h-8 font-bold w-20 ml-4 mt-4"
        >
          submit
        </button>
      </form>
    </div>
  );
}
