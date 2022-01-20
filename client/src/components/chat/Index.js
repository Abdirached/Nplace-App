import { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import Messages from "./chatmessages/Messages";
import { MessagesProvider } from "../../context/MessagesProvider";
const axios = require("axios");

export default function Index() {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [closed, setClosed] = useState(false);
  // console.log(chats);
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
    <MessagesProvider>
      <div className="flex w-full h-full">
        {!closed ? (
          <>
            <div className="w-full h-screen bg-white border-r md:w-1/2 lg:w-2/5 fixed overflow-y-auto">
              <div className="text-2xl mt-1 flex items-center border-b md:border-b-0">
                <span className=" font-semibold mr-3 text-gray-700 mb-4 mt-4 ml-4 md:mb-3">
                  Channels
                </span>
              </div>
              {chats.chats?.map((chat) => (
                <div
                  key={chat.chatId}
                  className={`mb-6 mt-6 bg-gray-100 m-auto rounded-md ${
                    currentChat === chat.chatId && "bg-gray-300"
                  }`}
                  style={{ width: "95%" }}
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
            <div className="hidden md:block lg:w-3/5 md:w-1/2 w-full md:ml-auto">
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
            <div className="hidden md:block w-full h-screen bg-white border-r md:w-1/2 lg:w-2/5 fixed overflow-y-auto">
              <div className="text-2xl mt-1 flex items-center border-b md:border-b-0">
                <span className=" font-semibold mr-3 text-gray-700 mb-4 mt-4 ml-4 md:mb-3">
                  Channels
                </span>
              </div>
              {chats.chats?.map((chat) => (
                <div
                  key={chat.chatId}
                  className={`mb-6 mt-6 bg-gray-100 m-auto rounded-md ${
                    currentChat === chat.chatId && " bg-gray-300"
                  }`}
                  style={{ width: "95%" }}
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
            <div className="md:w-1/2 lg:w-3/5 w-full md:ml-auto">
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
    </MessagesProvider>
  );
}
