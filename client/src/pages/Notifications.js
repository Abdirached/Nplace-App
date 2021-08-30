import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

export default function Notifications() {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const [notifications, setNotifications] = useState();
  useEffect(() => {
    getNotification();
  }, []);
  const getNotification = async function getCurrentUserNotifications() {
    const response = await axios.get(
      `http://localhost:5000/Notifications/${currentUserId}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    );
    console.log(response);
    setNotifications(response.data.notification);
  };
  return (
    <div>
      {notifications?.map((notification) => (
        <Link
          to={`/Posts/${notification.notifiableId}`}
          key={notification.notificationId}
        >
          <div>
            <p>
              {notification.User?.firstName}
              {notification.action}on your {notification.notifiableObject}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
