import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Messages from "./chatmessages/Messages";
const axios = require("axios");

export default function Index() {
  const [chats, setChats] = useState([]);
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
          setChats(response.data);
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
    <div className="flex w-full h-full">
      {!closed ? (
        <>
          <div className="w-full h-screen bg-gray-50 border-r md:w-1/3 fixed">
            <div className="text-2xl mt-1 flex items-center border-b md:border-b-0">
              <span className=" font-bold mr-3 text-gray-700 mb-7 mt-4 ml-4 md:mb-3">
                Chat
              </span>
            </div>
            {chats.chats?.map((chat) => (
              <div
                key={chat.chatId}
                className="mb-6 mt-6 bg-white m-auto"
                style={{ width: "96%" }}
              >
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
          <div className="hidden md:block md:w-2/3 w-full md:ml-auto">
            <Messages
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
          <div className="hidden md:block w-full h-screen bg-gray-50 border-r md:w-1/3 fixed">
            <div className="text-2xl mt-1 flex items-center border-b md:border-b-0">
              <span className=" font-bold mr-3 text-gray-700 mb-7 mt-4 ml-4 md:mb-3">
                Chat
              </span>
            </div>
            {chats.chats?.map((chat) => (
              <div
                key={chat.chatId}
                className="mb-6 mt-6 bg-white m-auto"
                style={{ width: "96%" }}
              >
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
          <div className="md:w-2/3 w-full md:ml-auto">
            <Messages
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
