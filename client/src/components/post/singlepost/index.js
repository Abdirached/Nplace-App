import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import Header from "../Header";
import Audio from "../Audio";
import Footer from "../Footer";
import Comments from "./Comments";
const axios = require("axios");

export default function SinglePost() {
  const history = useHistory();
  const { postId } = useParams();
  const [post, setPost] = useState();
  const userId = JSON.parse(localStorage.getItem("userId"));
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
  const deleteIndivualPost = async function deleteIndivualPostById() {
    try {
      const response = await axios.delete(
        `http://localhost:5000/Posts/${postId}/deletepost`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      console.log(response);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  if (post == null) {
    return null;
  }
  return (
    <div>
      {post.User.userId !== userId ? (
        <div
          className="rounded col-span-4 border bg-white border-gray-primary mb-12"
          key={post.postId}
        >
          <Header firstname={post.User.firstName} />
          <Audio src={post.video} caption={post.content} />
          <Footer caption={post.content} firstname={post.User.firstName} />
          <Link to={`/Posts/${post.postId}/Edit`}>Edit post</Link>
          <Comments commentData={post.Comments} postOwner={post.User.userId} />
        </div>
      ) : (
        <div
          className="rounded col-span-4 border bg-white border-gray-primary mb-12"
          key={post.postId}
        >
          <Header firstname={post.User.firstName} />
          <Audio src={post.video} caption={post.content} />
          <Footer caption={post.content} firstname={post.User.firstName} />
          <Link to={`/Posts/${post.postId}/Edit`}>Edit post</Link>
          <div>
            <button onClick={() => deleteIndivualPost()}>deletepost</button>
          </div>
          <Comments commentData={post.Comments} postOwner={post.User.userId} />
        </div>
      )}
    </div>
  );
}
