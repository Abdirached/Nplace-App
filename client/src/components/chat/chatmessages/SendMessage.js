import { useState } from "react";
const axios = require("axios");

export default function SendMessage({
  chat,
  currentUserId,
  setMessages,
  messages,
}) {
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
      setMessages([...messages, response.data.message]);
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
