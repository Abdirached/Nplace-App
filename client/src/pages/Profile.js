import { useEffect } from "react";
import { useSelector } from "react-redux";
import UseUser from "../hooks/UseUser";
const axios = require("axios");
export default function Profile() {
  const { currentUser } = UseUser();
  const currentUserInfo = useSelector((state) => state.user);
  console.log(currentUserInfo);
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
