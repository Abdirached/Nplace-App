import { useState, useEffect, useContext } from "react";
import { MessagesContext } from "../../context/MessagesProvider";
import { SocketContext } from "../../context/SocketProvider";
const axios = require("axios");

export default function Sidebar({
  chat,
  user,
  setCurrentChat,
  closed,
  setClosed,
  currentChat,
  auth,
}) {
  const socket = useContext(SocketContext);
  const { messages } = useContext(MessagesContext);
  const [person, setPerson] = useState([]);
  const [chatStatus, setChatStatus] = useState([]);
  const [read, setRead] = useState(chat.isRead);
  const chatOwners = [chat?.ownerOne, chat?.ownerTwo];
  const personToChat = chatOwners.find((person) => person !== user);
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
        messages[messages.length - 1]?.senderId !== user
      ) {
        try {
          const response = await axios({
            method: "put",
            url: `http://localhost:5000/Chats/chat/${currentChat}`,
            headers: {
              Authorization: "Bearer " + auth,
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
              Authorization: "Bearer " + auth,
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
    if (!socket) return;
    socket.on("getChatStatus", (data) => {
      setChatStatus(data);
    });
    return () => {
      socket.off("getChatStatus");
    };
  }, []);
  return (
    <div className="w-full">
      <button
        onClick={() => {
          setChatStatus([]);
          setCurrentChat(chat.chatId);
          setClosed(!closed);
        }}
        className="w-full flex justify-between outline-none"
      >
        <div className="w-full flex m-2">
          <img
            className="rounded-full h-12 w-12 flex mr-3"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="profile picture"
          />
          <div className="flex flex-col justify-items-start items-start">
            <p className="font-semibold text-lg">
              {person.firstName}
              <span className="ml-1 font-semibold text-lg">
                {person.lastName}
              </span>
            </p>
            <p className="text-gray-500">camera for you.</p>
          </div>
        </div>
        <div className="flex flex-col justify-items-start items-start justify-evenly m-2">
          <p className="text-gray-500">10:45pm</p>
          {!read &&
          chat.Messages[chat.Messages.length - 1]?.senderId !== user &&
          chat.chatId !== currentChat ? (
            <span className="text-xs px-2 font-bold bg-blue-500 text-white rounded py-0.5 mt-1 ml-3">
              new
            </span>
          ) : null}
          {chatStatus.length !== 0 &&
          !chatStatus.isread &&
          chatStatus.chatId !== currentChat &&
          chatStatus.senderId !== user &&
          chatStatus.chatId === chat.chatId &&
          read ? (
            <span className="text-xs px-2 font-bold bg-blue-500 text-white rounded py-0.5 mt-1 ml-3">
              new
            </span>
          ) : null}
        </div>
      </button>
    </div>
  );
}
