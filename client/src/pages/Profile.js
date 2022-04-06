import { useEffect, useState, useContext } from "react";
import ReactPlayer from "react-player";
import Skeleton from "react-loading-skeleton";
import UserContext from "../context/UserProvider";
const axios = require("axios");
export default function Profile() {
  const { user, auth } = useContext(UserContext);
  console.log(user);
  const [currentUserInfo, setCurrentUserInfo] = useState([]);
  useEffect(() => {
    const currentUser = async function fetchcurrentUserDetails() {
      try {
        const response = await axios.get(
          `http://localhost:5000/Profile/${user}`,
          {
            headers: {
              Authorization: "Bearer " + auth,
            },
          }
        );
        // console.log(response.data.user);
        setCurrentUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    currentUser();
  }, [user]);
  return (
    <div className="h-full relative sm:grid sm:grid-cols-3 md:grid-cols-4">
      <div className="text-center mt-8">
        {currentUserInfo.user ? (
          <img
            src={currentUserInfo.user?.avatar}
            className="rounded-full w-20 mb-4 mx-auto h-20"
            alt="Avatar"
          />
        ) : (
          <Skeleton circle height={80} width={80} count={1} />
        )}
        <h5 className="text-xl font-medium leading-tight mb-2">
          {currentUserInfo.user?.firstName} {currentUserInfo.user?.lastName}
        </h5>
      </div>
      <div className="relative mt-12 flex-col sm:col-span-2 md:col-span-3">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {!currentUserInfo.posts
            ? new Array(3)
                .fill(0)
                .map((_, i) => <Skeleton key={i} width={250} height={150} />)
            : currentUserInfo.posts.length > 0
            ? currentUserInfo.posts.map((post) => (
                <div
                  key={post.postId}
                  className="relative w-full flex justify-center lg:w-4/5 lg:left-12"
                >
                  <ReactPlayer
                    controls
                    url={post.video}
                    width={350}
                    height={150}
                  />
                </div>
              ))
            : null}
        </div>
        {currentUserInfo.posts?.length === 0 && (
          <p className="text-center text-2xl">No Posts Yet</p>
        )}
      </div>
    </div>
  );
}
