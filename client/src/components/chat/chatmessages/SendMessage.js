import { useState, useEffect } from "react";
import io from "socket.io-client";
const axios = require("axios");

export default function SendMessage({
  chat,
  currentUserId,
  setMessages,
  messages,
}) {
  const socket = io("http://localhost:5000", { query: { currentUserId } });
  const [message, setMessage] = useState("");
  const chatOwners = [chat.ownerOne, chat.ownerTwo];
  const personToChat = chatOwners.find((person) => person !== currentUserId);
  useEffect(() => {
    socket.on("getMessage", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          senderId: data.senderId,
          receiverId: data.receiverId,
          text: data.text,
          messageId: data.messageId,
        },
      ]);
    });
  }, []);
  const onSubmit = async function onSubmitMessage(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/Chats/chat/${chat.chatId}/messages`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        data: {
          senderId: currentUserId,
          receiverId: personToChat,
          text: message,
        },
      });
      // console.log(response.data);
      socket.emit("sendMessage", {
        senderId: currentUserId,
        receiverId: personToChat,
        text: message,
        messageId: response.data.message.messageId,
      });
      setMessage("");
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={onSubmit} className="flex">
        <textarea
          type="input"
          name="addComment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder=" Add Comment"
          className="border outline-none w-4/5 mt-4 resize-none overflow-hidden"
          rows="2"
        />
        <button
          type="submit"
          className="bg-blue-medium text-white rounded h-8 font-bold w-20 ml-2 mt-6"
        >
          submit
        </button>
      </form>
    </div>
  );
}
