import { useParams } from "react-router-dom";
const axios = require("axios");
export default function EditCommentReply({
  commentReplies,
  setCommentReplies,
  commentId,
  commentReplyId,
}) {
  const { postId } = useParams();
  const deleteIndivualCommentReply =
    async function deleteIndivualCommentReplyById() {
      try {
        const response = await axios.delete(
          `http://localhost:5000/Posts/${postId}/comments/${commentId}/commentReply/${commentReplyId}/deleteCommentReply`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        console.log(response);
        const foundCommentReplies = commentReplies.filter(
          (commentReply) => commentReply.commentReplyId != commentReplyId
        );
        setCommentReplies(foundCommentReplies);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div>
      <button onClick={() => deleteIndivualCommentReply()}>delete reply</button>
    </div>
  );
}
