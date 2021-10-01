import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import Header from "../Header";
import Audio from "../Audio";
import Footer from "../Footer";
import Comments from "./Comments";
import { MdEdit, MdDelete } from "react-icons/md";
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
    <div className="h-full">
      {post.User.userId !== userId ? (
        <div className="border bg-white border-gray-primary" key={post.postId}>
          <Header firstname={post.User.firstName} />
          <Audio src={post.video} caption={post.content} />
          <div>
            <p>{post.content}</p>
          </div>
          <Comments commentData={post.Comments} postOwner={post.User.userId} />
        </div>
      ) : (
        <div className="border bg-white border-gray-primary" key={post.postId}>
          <Header firstname={post.User.firstName} />
          <Audio src={post.video} caption={post.content} />
          <div>
            <p>{post.content}</p>
          </div>
          <div className="mb-2">
            <Link
              to={`/Posts/${post.postId}/Edit`}
              className="float-right mr-4"
            >
              <MdEdit className="text-2xl" />
            </Link>
            <button
              onClick={() => deleteIndivualPost()}
              className="float-right mr-2"
            >
              <MdDelete className="text-2xl" />
            </button>
          </div>
          <Comments commentData={post.Comments} postOwner={post.User.userId} />
        </div>
      )}
    </div>
  );
}
