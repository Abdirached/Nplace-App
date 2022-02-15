import { useEffect, useState } from "react";
import io from "socket.io-client";
import ReactPlayer from "react-player";
import ReactLoader from "../../ReactLoader";
import Header from "../Header";
import Footer from "../Footer";
import UselocationListner from "../../../hooks/UseLocationListner";
import PostChat from "../PostChat";
import { formatDistance } from "date-fns";
const axios = require("axios");

export default function CountryPost() {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const socket = io("http://localhost:5000", {
    query: { currentUserId },
  });
  const { place } = UselocationListner();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  console.log(posts);
  useEffect(() => {
    let isMounted = true;
    const countryPosts = async function getCountryPosts() {
      if (place !== null) {
        try {
          const response = await axios.get(
            `http://localhost:5000/Posts/country/${place}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          );
          if (isMounted) {
            setPosts(response.data.posts);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("no place found");
      }
    };
    countryPosts();
    return () => {
      isMounted = false;
    };
  }, [place]);
  useEffect(() => {
    socket.on("newPost", (data) => {
      // console.log(data);
      if (data) {
        setPosts((prev) => [data, ...prev]);
      } else {
        console.log("no realtime posts yet");
      }
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div className=" relative md:w-2/3 mr-auto w-full mt-4">
      {posts.length !== 0 ? (
        posts.map((data) => (
          <div
            className=" rounded-xl border bg-white border-gray-primary mb-4 sm:w-4/5 md:w-3/4 lg:w-2/3 sm:mx-auto mx-2 shadow-sm"
            key={data.postId}
          >
            <Header
              firstname={data.User.firstName}
              lastName={data.User.lastName}
            />
            {data.video.split(".").pop() === "mp4" ||
            data.video.split(".").pop() === "webm" ? (
              <div className="mx-auto mt-4 h-1/5" style={{ width: "95%" }}>
                <ReactPlayer
                  url={data.video}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            ) : data.video.split(".").pop() === "jpeg" ||
              data.video.split(".").pop() === "jpg" ? (
              <div className="mx-auto mt-4 h-1/5" style={{ width: "95%" }}>
                <img src={data.video} className=" w-full h-full" />
              </div>
            ) : (
              <p className="text-center mt-2">Something went wrong !</p>
            )}
            <Footer caption={data.content} firstname={data.User.firstName} />
            {currentUserId !== data.userId ? (
              <button
                onClick={() => {
                  setOpen(!open);
                  setSelected(data.postId);
                }}
                className=" bg-indigo-500 rounded h-8 w-20 ml-4 mt-1 mb-4 text-white"
              >
                Message
              </button>
            ) : null}
            {open && selected === data.postId ? (
              <PostChat
                postUserId={data.userId}
                postUserName={data.User.firstName}
                setOpen={setOpen}
              />
            ) : null}
            <div>
              <p className="text-gray-base uppercase text-xs mb-4 ml-4">
                {formatDistance(new Date(data.createdAt), new Date())} ago
              </p>
            </div>
          </div>
        ))
      ) : (
        <ReactLoader />
      )}
    </div>
  );
}
