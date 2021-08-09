import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { currentUserAdded } from "../features/users/UserSlice";
const axios = require("axios");
export default function UseUser() {
  const dispatch = useDispatch();
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
      dispatch(currentUserAdded(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  return currentUser;
}
