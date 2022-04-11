import { useEffect, useState, useContext } from "react";
import ReactPlayer from "react-player";
import Skeleton from "react-loading-skeleton";
import UserContext from "../context/UserProvider";
const axios = require("axios");
export default function Profile() {
  const { user, auth } = useContext(UserContext);
  console.log(user);
  const [currentUserInfo, setCurrentUserInfo] = useState([]);
  const [open, setOpen] = useState(false);
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
      <div className="relative mt-8 flex-col sm:col-span-2 md:col-span-3">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {!currentUserInfo.posts
            ? new Array(3)
                .fill(0)
                .map((_, i) => <Skeleton key={i} width={250} height={150} />)
            : currentUserInfo.posts.length > 0
            ? currentUserInfo.posts.map((post) => (
                <div className="flex justify-center" key={post.postId}>
                  <div className="rounded-sm shadow-lg bg-white max-w-sm">
                    <div className="w-full">
                      <ReactPlayer
                        controls
                        url={post.video}
                        width="100%"
                        height="100%"
                      />
                    </div>
                    <div className="flex justify-between py-4 px-2">
                      <p className="text-gray-500 text-base">2 days ago</p>
                      <div className="flex justify-evenly gap-4">
                        <button className="inline-block px-4 py-1.5 bg-indigo-500 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">
                          Edit
                        </button>
                        <button
                          onClick={() => setOpen(true)}
                          className="inline-block px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        {open ? (
          <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-full bg-black-faded flex items-center justify-center">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex justify-end p-2">
                  <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>

                <div className="p-6 pt-0 text-center">
                  <svg
                    className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this product?
                  </h3>
                  <button className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {currentUserInfo.posts?.length === 0 && (
          <p className="text-center text-2xl">No Posts Yet</p>
        )}
      </div>
    </div>
  );
}
