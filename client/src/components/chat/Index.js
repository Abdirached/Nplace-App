import { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import Sidebar from "./Sidebar";
import Messages from "./chatmessages/Messages";
import { MessagesProvider } from "../../context/MessagesProvider";
const axios = require("axios");
export default function Index() {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const socket = io("http://localhost:5000", { query: { currentUserId } });
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    console.log(chats);
  }, [chats]);
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
          setChats(response.data.chats);
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
  useEffect(() => {
    socket.on("getNewchat", (data) => {
      // console.log(data);
      if (data) {
        setChats((prev) => [data, ...prev]);
      } else {
        console.log("no realtime chats yet");
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [currentChat]);
  return (
    <MessagesProvider>
      <div className="w-full overflow-y-hidden" style={{ height: "89.5vh" }}>
        {!closed ? (
          <div className="flex overflow-y-hidden" style={{ height: "89.5vh" }}>
            <div
              className="w-full bg-white border-r md:w-1/2 lg:w-2/5 sticky top-0 overflow-y-auto bottom-0"
              style={{ height: "89.5vh" }}
            >
              <div className="text-2xl mt-1 flex items-center border-b md:border-b-0">
                <span className=" font-semibold mr-3 text-gray-700 mb-4 mt-4 ml-4 md:mb-3">
                  Chats
                </span>
              </div>
              {chats?.map((chat) => (
                <div
                  key={chat.chatId}
                  className={`mb-6 mt-6 bg-gray-100 mx-auto rounded-md ${
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
            <div
              className="hidden md:block lg:w-3/5 md:w-1/2 w-full overflow-y-auto"
              style={{ height: "89.5vh" }}
            >
              <Messages
                currentUserId={currentUserId}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                closed={closed}
                setClosed={setClosed}
              />
            </div>
          </div>
        ) : (
          <div className="flex">
            <div
              className="hidden md:block w-full bg-white border-r md:w-1/2 lg:w-2/5 sticky top-0 overflow-y-auto bottom-0"
              style={{ height: "89.5vh" }}
            >
              <div className="text-2xl mt-1 flex items-center border-b md:border-b-0">
                <span className=" font-semibold mr-3 text-gray-700 mb-4 mt-4 ml-4 md:mb-3">
                  Chats
                </span>
              </div>
              {chats?.map((chat) => (
                <div
                  key={chat.chatId}
                  className={`mb-6 mt-6 bg-gray-100 mx-auto rounded-md ${
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
            <div
              className="md:w-1/2 lg:w-3/5 w-full overflow-y-auto"
              style={{ height: "89.5vh" }}
            >
              <Messages
                currentUserId={currentUserId}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                closed={closed}
                setClosed={setClosed}
              />
            </div>
          </div>
        )}
      </div>
    </MessagesProvider>
  );
}
