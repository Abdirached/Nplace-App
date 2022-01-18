import { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { MessagesContext } from "../../context/MessagesProvider";
const axios = require("axios");

export default function Sidebar({
  chat,
  currentUserId,
  setCurrentChat,
  closed,
  setClosed,
  currentChat,
}) {
  const socket = io("http://localhost:5000", { query: { currentUserId } });
  const { messages } = useContext(MessagesContext);
  const [person, setPerson] = useState([]);
  const [chatStatus, setChatStatus] = useState([]);
  const [read, setRead] = useState(chat.isRead);
  const chatOwners = [chat?.ownerOne, chat?.ownerTwo];
  const personToChat = chatOwners.find((person) => person !== currentUserId);
  console.log(chatStatus?.isRead);
  // console.log(chat.Messages[chat.Messages.length - 1]);
  useEffect(() => {
    if (chatStatus && chatStatus.chatId === currentChat) {
      setChatStatus([]);
    }
  }, [chatStatus]);
  useEffect(() => {
    const updateCurrentChat = async function updateCurrentChatStatus() {
      if (
        messages &&
        messages[messages.length - 1]?.chatId === currentChat &&
        messages[messages.length - 1]?.senderId !== currentUserId
      ) {
        try {
          const response = await axios({
            method: "put",
            url: `http://localhost:5000/Chats/chat/${currentChat}`,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            data: {
              isRead: true,
            },
          });
          console.log("updated last chatroom status");
          setRead(true);
        } catch (error) {
          console.log(error);
        }
      }
    };
    updateCurrentChat();
    return () => {
      console.log("changed chat status in the last chatroom");
    };
  }, [messages]);
  useEffect(() => {
    let mounted = true;
    const fetchPerson = async function fetchPersonInfo() {
      try {
        const response = await axios.get(
          `http://localhost:5000/Profile/${personToChat}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        // console.log(response.data.user);
        if (mounted) {
          setPerson(response.data.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPerson();
    return () => {
      mounted = false;
    };
  }, [personToChat]);
  useEffect(() => {
    socket.on("getChatStatus", (data) => {
      setChatStatus(data);
    });
    return () => {
      socket.disconnect();
    };
  }, [currentChat]);
  return (
    <div className="w-full">
      <button
        onClick={() => {
          setChatStatus([]);
          setCurrentChat(chat.chatId);
          setClosed(!closed);
        }}
        className="w-full flex justify-between"
      >
        <div className="w-full flex">
          <img
            className="rounded-full h-12 w-12 flex mr-3 ml-1 mt-1"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="profile picture"
          />
          <div className="flex flex-col ">
            <p className="font-semibold text-lg">
              {person.firstName}
              <span className="ml-1 font-semibold text-lg">
                {person.lastName}
              </span>
            </p>
            <p className="text-gray-400">camera for you.</p>
            <div className="mt-1 mr-2 md:inline-block hidden lg:hidden">
              <p className="text-gray-400">10:45pm</p>
            </div>
          </div>
        </div>
        <div className="mt-1 mr-2 md:hidden lg:flex">
          <p className="text-gray-400">10:45pm</p>
          {!read &&
          chat.Messages[chat.Messages.length - 1]?.senderId !== currentUserId &&
          chat.chatId !== currentChat ? (
            <span className="text-xs px-2 font-bold bg-red-500 text-white rounded py-0.5 ml-2">
              info
            </span>
          ) : null}
          {chatStatus.length !== 0 &&
          !chatStatus.isread &&
          chatStatus.chatId !== currentChat &&
          chatStatus.senderId !== currentUserId &&
          chatStatus.chatId === chat.chatId ? (
            <span className="text-xs px-2 font-bold bg-blue-500 text-white rounded py-0.5 ml-2">
              info
            </span>
          ) : null}
        </div>
      </button>
    </div>
  );
}
