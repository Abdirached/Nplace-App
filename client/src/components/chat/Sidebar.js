import { useState, useEffect } from "react";
const axios = require("axios");

export default function Sidebar({
  chat,
  currentChat,
  currentUserId,
  setCurrentChat,
  closeSidebar,
  setCloseSidebar,
}) {
  const [person, setPerson] = useState([]);
  const chatOwners = [chat.ownerOne, chat.ownerTwo];
  const personToChat = chatOwners.find((person) => person !== currentUserId);
  // console.log(personToChat);
  useEffect(() => {
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
        setPerson(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPerson();
  }, [currentUserId]);

  return (
    <>
      {!closeSidebar ? (
        <div className=" flex  w-full">
          <img
            className="rounded-full h-10 w-10 flex mr-3 ml-1"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="profile picture"
            onClick={() => {
              setCurrentChat(chat.chatId);
              setCloseSidebar(!closeSidebar);
            }}
          />
          <div className=" ">
            <p className="font-bold text-base">
              {person.firstName}
              <span className="ml-1 font-bold text-base">
                {person.lastName}
              </span>
            </p>
          </div>
        </div>
      ) : closeSidebar && currentChat ? (
        <div className="   hidden md:flex w-full">
          <img
            className="rounded-full h-10 w-10 flex mr-3 ml-1"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="profile picture"
            onClick={() => {
              setCurrentChat(chat.chatId);
            }}
          />
          <div className=" ">
            <p className="font-bold text-base">
              {person.firstName}
              <span className="ml-1 font-bold text-base">
                {person.lastName}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className=" flex">
          <img
            className="rounded-full h-10 w-10 flex mr-3 ml-1"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="profile picture"
            onClick={() => {
              setCurrentChat(chat.chatId);
            }}
          />
          <div className=" ">
            <p className="font-bold text-base">
              {person.firstName}
              <span className="ml-1 font-bold text-base">
                {person.lastName}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
