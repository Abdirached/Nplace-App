import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Messages from "./chatmessages/Messages";
const axios = require("axios");

export default function Index() {
  const [chat, setChat] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [closed, setClosed] = useState(false);
  // console.log(currentChat);
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  useEffect(() => {
    let mounted = true;
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
        if (mounted) {
          setChat(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchChats();
    return () => {
      mounted = false;
    };
  }, [currentUserId]);

  return (
    <div className="md:grid md:grid-cols-3 w-full h-full">
      {!closed ? (
        <>
          <div className=" w-full md:col-span-1 h-full">
            {chat.chats?.map((chat) => (
              <div key={chat.chatId} className="mb-8 mt-4">
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
          <div className="hidden md:block md:col-span-2  md:w-4/5 md:ml-20">
            <Messages
              chat={chat}
              currentUserId={currentUserId}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
              closed={closed}
              setClosed={setClosed}
            />
          </div>
        </>
      ) : (
        <>
          <div className="hidden md:block  w-full md:col-span-1 h-full">
            {chat.chats?.map((chat) => (
              <div key={chat.chatId} className="mb-8 mt-4">
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
          <div className="col-span-2 md:w-4/5 md:ml-20">
            <Messages
              chat={chat}
              currentUserId={currentUserId}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
              closed={closed}
              setClosed={setClosed}
            />
          </div>
        </>
      )}
    </div>
  );
}
