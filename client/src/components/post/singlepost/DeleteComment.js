import { useState } from "react";
import { useParams } from "react-router-dom";
const axios = require("axios");
export default function DeleteComment({ comments, setComments, commentId }) {
  const { postId } = useParams();
  const deleteIndivualComment = async function deleteIndivualCommentById() {
    try {
      const response = await axios.delete(
        `http://localhost:5000/Posts/${postId}/comments/${commentId}/deletecomment`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      console.log(response);
      const foundComments = comments.filter(
        (comment) => comment.commentId != commentId
      );
      setComments(foundComments);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          deleteIndivualComment();
        }}
      >
        delete
      </button>
    </div>
  );
}
