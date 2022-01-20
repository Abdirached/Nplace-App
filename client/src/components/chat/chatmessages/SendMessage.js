import { useState, useEffect } from "react";
const axios = require("axios");

export default function SendMessage({ chat, currentUserId, socket }) {
  const [message, setMessage] = useState("");
  const chatOwners = [chat.ownerOne, chat.ownerTwo];
  const personToChat = chatOwners.find((person) => person !== currentUserId);
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
      console.log(response.data);
      socket.emit("sendMessage", {
        senderId: currentUserId,
        receiverId: personToChat,
        text: message,
        messageId: response.data.message.messageId,
        chatId: response.data.message.chatId,
        createdAt: response.data.message.createdAt,
      });
      setMessage("");
      const readStatusResponse = await axios({
        method: "put",
        url: `http://localhost:5000/Chats/chat/${chat.chatId}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        data: {
          isRead: false,
        },
      });
      console.log(readStatusResponse.data);
      socket.emit("chatStatus", {
        senderId: currentUserId,
        receiverId: personToChat,
        messageId: response.data.message.messageId,
        chatId: response.data.message.chatId,
        isRead: readStatusResponse.data.chat[1][0].isRead,
      });
    } catch (error) {}
  };
  return (
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2">
      <form onSubmit={onSubmit} className="flex">
        <input
          name="addComment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Write Something"
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3"
        />
        <button
          type="submit"
          className="ml-2 inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 w-6 transform rotate-90"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
}
