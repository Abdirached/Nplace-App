import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Messages from "./chatmessages/Messages";
const axios = require("axios");

export default function Index() {
  const [chat, setChat] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [closed, setClosed] = useState(false);
  console.log(currentChat);
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  useEffect(() => {
    const fetchChats = async function fetchCurrentUserChats() {
      try {
        const response = await axios.get(
          `http://localhost:5000/Chats/${currentUserId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        console.log(response);
        setChat(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();
  }, [currentUserId]);

  return (
    <div className="grid grid-cols-3">
      {!closed ? (
        <>
          <div>
            {chat.chats?.map((chat) => (
              <div key={chat.chatId} className="mb-4">
                <Sidebar
                  chat={chat}
                  currentUserId={currentUserId}
                  setCurrentChat={setCurrentChat}
                  closed={closed}
                  setClosed={setClosed}
                  currentChat={currentChat}
                />
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <Messages
              chat={chat}
              currentUserId={currentUserId}
              currentChat={currentChat}
              closed={closed}
              setClosed={setClosed}
            />
          </div>
        </>
      ) : (
        <>
          <div className="hidden md:block">
            {chat.chats?.map((chat) => (
              <div key={chat.chatId} className="mb-4">
                <Sidebar
                  chat={chat}
                  currentUserId={currentUserId}
                  setCurrentChat={setCurrentChat}
                  closed={closed}
                  setClosed={setClosed}
                  currentChat={currentChat}
                />
              </div>
            ))}
          </div>
          <div>
            <Messages
              chat={chat}
              currentUserId={currentUserId}
              currentChat={currentChat}
              closed={closed}
              setClosed={setClosed}
            />
          </div>
        </>
      )}
    </div>
  );
}
