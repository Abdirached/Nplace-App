import { useEffect } from "react";
import { MdComment } from "react-icons/md";
import { postsAdded } from "../../../features/countryposts/CountryPostsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Header";
import Video from "../Video";
import Footer from "../Footer";
import UselocationListner from "../../../hooks/UseLocationListner";
const axios = require("axios");

export default function CountryPost() {
  const { place } = UselocationListner();
  const posts = useSelector((state) => state.countryPosts);
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
              className="rounded col-span-4 border bg-white border-gray-primary mb-10"
              key={data.postId}
            >
              <Header
                firstname={data.User.firstName}
                lastName={data.User.lastName}
              />
              <Video src={data.video} caption={data.content} />
              <Footer caption={data.content} firstname={data.User.firstName} />
              <Link to={`/Posts/${data.postId}`} className="flex">
                <MdComment className="ml-4 mt-2 mb-4 text-2xl" />
                <p className="ml-1 mt-2">{data.Comments.length}</p>
              </Link>
            </div>
          ))
        : null}
    </div>
  );
}
