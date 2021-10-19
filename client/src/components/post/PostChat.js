import { useState, useEffect } from "react";
import io from "socket.io-client";
const axios = require("axios");

export default function PostChat({ postUserId, postUserName }) {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const socket = io("http://localhost:5000", { query: { currentUserId } });
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const chatOwners = [chat.ownerOne, chat.ownerTwo];
  const personToChat = chatOwners.find((person) => person !== currentUserId);

  useEffect(() => {
    const createChat = async function createChatForPost() {
      try {
        const response = await axios({
          method: "post",
          url: `http://localhost:5000/Chats/${currentUserId}/${postUserId}`,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        });
        console.log(response.data);
        setChat(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    createChat();
  }, [postUserId, currentUserId]);
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
      });
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>
        <p>To: {postUserName}</p>
      </div>
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
