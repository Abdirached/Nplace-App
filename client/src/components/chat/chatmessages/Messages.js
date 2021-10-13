import { useState, useEffect } from "react";
import SendMessage from "./SendMessage";
const axios = require("axios");

export default function Messages({ currentUserId, currentChat }) {
  const [chat, setChat] = useState([]);
  const [messages, setMessages] = useState([]);
  // console.log(chatMessages);
  useEffect(() => {
    const fetchSingleChat = async function fetchSingleChatWithId() {
      try {
        const response = await axios.get(
          `http://localhost:5000/Chats/chat/${currentChat}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        setChat(response.data.chat);
        setMessages(response.data.chat.Messages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleChat();
  }, [currentChat]);
  return (
    <div className="col-span-2 outline-black">
      {currentChat && messages ? (
        <div>
          {messages.map((message) => (
            <div key={message.messageId} className="mb-2">
              {message.senderId == currentUserId ? (
                <p className="ml-auto bg-blue-50 w-1/2">{message.text}</p>
              ) : (
                <p>{message.text}</p>
              )}
            </div>
          ))}
          <SendMessage
            chat={chat}
            currentUserId={currentUserId}
            setMessages={setMessages}
            messages={messages}
          />
        </div>
      ) : null}
    </div>
  );
}
