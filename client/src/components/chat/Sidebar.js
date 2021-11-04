import { useState, useEffect } from "react";
const axios = require("axios");

export default function Sidebar({
  chat,
  currentUserId,
  setCurrentChat,
  closed,
  setClosed,
}) {
  const [person, setPerson] = useState([]);
  const chatOwners = [chat.ownerOne, chat.ownerTwo];
  const personToChat = chatOwners.find((person) => person !== currentUserId);
  // console.log(personToChat);
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
  }, [currentUserId]);

  return (
    <div className=" flex w-full justify-between">
      <div className="w-full flex">
        <img
          className="rounded-full h-12 w-12 flex mr-3 ml-1 mt-1"
          src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          alt="profile picture"
          onClick={() => {
            setCurrentChat(chat.chatId);
            setClosed(!closed);
          }}
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
      </div>
    </div>
  );
}
