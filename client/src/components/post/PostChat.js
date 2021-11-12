import { useState, useEffect } from "react";
const axios = require("axios");

export default function PostChat({ postUserId, postUserName, setOpen }) {
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
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
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 top-16 z-50 outline-none focus:outline-none bg-black-faded">
        <div className="relative w-4/5 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">{postUserName}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setOpen(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form onSubmit={onSubmit} className="flex">
                <input
                  type="text"
                  name="addComment"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Send Message"
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded py-3"
                />
                <button
                  type="submit"
                  className="bg-blue-medium text-white rounded h-8 w-20 ml-2 mt-2"
                >
                  Send
                </button>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
