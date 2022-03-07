import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import Header from "../Header";
import Audio from "../Audio";
import Footer from "../CardFooter";
import Comments from "./Comments";
import { MdEdit, MdDelete } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";
const axios = require("axios");

export default function SinglePost() {
  const history = useHistory();
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [toggleOpen, setToggleOpen] = useState(false);
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
        <div className="bg-white" key={post.postId}>
          <Header firstname={post.User.firstName} />
          <Audio src={post.video} caption={post.content} />
          <div className="mt-4 mb-4">
            <p className="ml-4">{post.content}</p>
          </div>
          <Comments commentData={post.Comments} postOwner={post.User.userId} />
        </div>
      ) : (
        <div className="bg-white" key={post.postId}>
          <Header firstname={post.User.firstName} />
          <Audio src={post.video} caption={post.content} />
          <div className="mt-4 mb-4">
            <p className="ml-4">{post.content}</p>
          </div>
          <div className="h-8">
            <button
              onClick={() => {
                setToggleOpen(!toggleOpen);
              }}
              className="outline-none float-right mr-2"
            >
              {!toggleOpen ? (
                <HiOutlineDotsVertical className="text-2xl font-semibold" />
              ) : (
                <HiOutlineDotsVertical className="text-2xl font-semibold" />
              )}
            </button>
            {toggleOpen ? (
              <div className="bg-gray-50 border z-50 w-24 pl-2 absolute right-2 top-72 mt-2 rounded">
                <Link to={`/Posts/${post.postId}/Edit`}>
                  <MdEdit className="text-lg mb-1" />
                </Link>
                <button onClick={() => deleteIndivualPost()}>
                  <MdDelete className="text-lg hover:text-red-500" />
                </button>
              </div>
            ) : null}
          </div>
          <Comments commentData={post.Comments} postOwner={post.User.userId} />
        </div>
      )}
    </div>
  );
}
