import { useEffect, useState } from "react";
import { postsAdded } from "../../../features/countryposts/CountryPostsSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import Audio from "../Audio";
import Footer from "../Footer";
import UselocationListner from "../../../hooks/UseLocationListner";
import PostChat from "../PostChat";
const axios = require("axios");

export default function CountryPost() {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const { place } = UselocationListner();
  const posts = useSelector((state) => state.countryPosts);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  console.log(posts);
  const dispatch = useDispatch();
  useEffect(() => {
    countryPosts();
  }, [place]);
  const countryPosts = async function getCountryPosts() {
    try {
      const response = await axios.get(
        `http://localhost:5000/Posts/country/${place.country}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      dispatch(postsAdded(response.data.posts));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" relative w-4/5 m-auto sm:col-span-3 sm:w-3/4 lg:w-3/5 sm:left-48 md:left-56 lg:left-80">
      {posts
        ? posts.map((data) => (
            <div
              className="rounded-lg col-span-4 border bg-white border-gray-primary mb-10"
              key={data.postId}
            >
              <Header
                firstname={data.User.firstName}
                lastName={data.User.lastName}
              />
              <Audio src={data.video} caption={data.content} />
              <Footer caption={data.content} firstname={data.User.firstName} />
              {currentUserId !== data.userId ? (
                <button
                  onClick={() => {
                    setOpen(!open);
                    setSelected(data.postId);
                  }}
                >
                  send Message
                </button>
              ) : null}
              {open && selected === data.postId ? (
                <PostChat
                  postUserId={data.userId}
                  postUserName={data.User.firstName}
                />
              ) : null}
            </div>
          ))
        : null}
    </div>
  );
}
