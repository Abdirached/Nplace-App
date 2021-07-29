import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentUserAdded } from "../features/users/UserSlice";
const axios = require("axios");
export default function Profile() {
  const dispatch = useDispatch();
  const currentUserInfo = useSelector((state) => state.user);
  console.log(currentUserInfo);
  useEffect(() => {
    currentUser();
  }, []);
  const currentUser = async function fetchCurrentUser() {
    try {
      const userId = JSON.parse(localStorage.getItem("userId"));
      console.log(userId);
      const response = await axios.get(
        `http://localhost:5000/Profile/${userId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      console.log(response.data);
      dispatch(currentUserAdded(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        {currentUserInfo.user ? (
          <div>{currentUserInfo.user.firstName}</div>
        ) : null}
      </div>
    </div>
  );
}
