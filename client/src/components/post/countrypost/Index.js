import { useEffect } from "react";
import { postsAdded } from "../../../features/countryposts/CountryPostsSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import Video from "../Video";
import Footer from "../Footer";
const axios = require("axios");

export default function CountryPost() {
  const posts = useSelector((state) => state.countryPosts);
  console.log(posts);
  const dispatch = useDispatch();
  useEffect(() => {
    countryPosts();
  }, []);
  const countryPosts = async function getCountryPosts() {
    try {
      const response = await axios.get(
        "http://localhost:5000/Posts/country/Uk",
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
    <div>
      {posts.map((result) => {
        return result.map((data) => (
          <div
            className="rounded col-span-4 border bg-white border-gray-primary mb-12"
            key={data.postId}
          >
            <Header firstname={data.User.firstName} />
            <Video src={data.video} caption={data.content} />
            <Footer caption={data.content} firstname={data.User.firstName} />
          </div>
        ));
      })}
    </div>
  );
}
