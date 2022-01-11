import { useEffect, useState, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { UserContext } from "../context/UserProvider";
const axios = require("axios");
export default function Sidebar() {
  const { user } = useContext(UserContext);
  console.log(user);
  const [currentUserInfo, setCurrentUserInfo] = useState([]);
  useEffect(() => {
    const currentUser = async function fetchcurrentUserDetails() {
      try {
        const response = await axios.get(
          `http://localhost:5000/Profile/${user}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
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
    <div className="w-full flex sm:relative py-2 bg-white rounded-lg shadow-sm mt-4 border">
      <div className="sm:flex sm:justify-center sm:w-full">
        {currentUserInfo.user ? (
          <img
            className="rounded-full h-20 w-20 object-fill sm:h-28 sm:w-28 lg:w-32 lg:h-32"
            alt={`${currentUserInfo.user.firstName} profile`}
            src={currentUserInfo.user.avatar}
          />
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>
      <div className="ml-2 flex flex-col w-full">
        <div className="relative flex top-4 sm:top-4 sm:justify-center lg:justify-start lg:w-4/5 sm:w-full">
          <p className="text-xl font-bold">{currentUserInfo.user?.firstName}</p>
          <p className="text-xl font-bold ml-1">
            {currentUserInfo.user?.lastName}
          </p>
        </div>
        <div className="flex relative top-7 sm:top-8 w-20  sm:justify-center lg:justify-start lg:w-4/5 sm:w-full">
          <button
            type="submit"
            className="bg-red-500 text-white w-full rounded h-8 sm:w-20"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
