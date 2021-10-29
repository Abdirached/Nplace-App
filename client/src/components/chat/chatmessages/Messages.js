import { useState, useEffect } from "react";
import io from "socket.io-client";
import ReactLoader from "../../ReactLoader";
import SendMessage from "./SendMessage";
import { MdArrowBack } from "react-icons/md";
const axios = require("axios");

export default function Messages({
  currentUserId,
  currentChat,
  setCurrentChat,
  closed,
  setClosed,
}) {
  const socket = io("http://localhost:5000", { query: { currentUserId } });
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState([]);
  // console.log(chatMessages);
  useEffect(() => {
    if (currentChat !== messages[0]?.chatId) {
      setMessages([]);
    }
    let mounted = true;
    const fetchSingleChat = async function fetchSingleChatWithId() {
      if (currentChat !== null) {
        try {
          const response = await axios.get(
            `http://localhost:5000/Chats/chat/${currentChat}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
              },
            }
          );
          if (mounted) {
            setChat(response.data.chat);
            setMessages(response.data.chat.Messages);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchSingleChat();
    return () => {
      mounted = false;
    };
  }, [currentChat]);
  useEffect(() => {
    socket.on("getMessage", (data) => {
      console.log(currentChat);
      if (currentChat == data.chatId) {
        setMessages((prev) => [
          ...prev,
          {
            senderId: data.senderId,
            receiverId: data.receiverId,
            text: data.text,
            messageId: data.messageId,
            chatId: data.chatId,
          },
        ]);
      } else {
        console.log("wrong room");
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [currentChat]);
  return (
    <div className=" w-full h-full">
      {currentChat ? (
        <>
          <button
            onClick={() => {
              setClosed(!closed);
              setCurrentChat(null);
            }}
            className="md:hidden ml-2"
          >
            <MdArrowBack className="text-4xl font-semibold" />
          </button>
          {messages.length !== 0 ? (
            <div>
              {messages.map((message) => (
                <div
                  key={message.messageId}
                  className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                >
                  {message.senderId !== currentUserId ? (
                    <div className="flex items-end">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-600 text-white ">
                            {message.text}
                          </span>
                        </div>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                        alt="My profile"
                        className="w-6 h-6 rounded-full order-1"
                      />
                    </div>
                  ) : (
                    <div className="flex items-end justify-end">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                        <div>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-300 text-gray-600">
                            {message.text}
                          </span>
                        </div>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                        alt="My profile"
                        className="w-6 h-6 rounded-full order-2"
                      />
                    </div>
                  )}
                </div>
              ))}
              <SendMessage
                chat={chat}
                currentUserId={currentUserId}
                socket={socket}
              />
            </div>
          ) : (
            <ReactLoader />
          )}
        </>
      ) : (
        <span className="text-4xl text-gray-300">
          open chat to start conversation
        </span>
      )}
    </div>
  );
}
