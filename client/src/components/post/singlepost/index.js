import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Video from "../Video";
import Footer from "../Footer";
import Comments from "./Comments";
const axios = require("axios");

export default function SinglePost() {
  const { postId } = useParams();
  const [post, setPost] = useState();
  useEffect(() => {
    indivualPost();
  }, []);
  const indivualPost = async function getIndivualPost() {
    try {
      const response = await axios.get(
        `http://localhost:5000/Posts/${postId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      console.log(response);
      setPost(response.data.post);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {post ? (
        <div
          className="rounded col-span-4 border bg-white border-gray-primary mb-12"
          key={post.postId}
        >
          <Header firstname={post.User.firstName} />
          <Video src={post.video} caption={post.content} />
          <Footer caption={post.content} firstname={post.User.firstName} />
          <Comments commentData={post.Comments} />
        </div>
      ) : null}
    </div>
  );
}
