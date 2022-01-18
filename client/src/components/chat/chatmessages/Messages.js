import { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import ReactLoader from "../../ReactLoader";
import SendMessage from "./SendMessage";
import { MdArrowBack } from "react-icons/md";
import { MessagesContext } from "../../../context/MessagesProvider";
const axios = require("axios");
export default function Messages({
  currentUserId,
  currentChat,
  setCurrentChat,
  closed,
  setClosed,
}) {
  const socket = io("http://localhost:5000", { query: { currentUserId } });
  const { messages, setMessages } = useContext(MessagesContext);
  const [chat, setChat] = useState([]);
  const [person, setPerson] = useState([]);
  const chatOwners = [chat.ownerOne, chat.ownerTwo];
  const personToChat = chatOwners.find((person) => person !== currentUserId);
  // console.log(chatMessages);
  useEffect(() => {
    let mounted = true;
    const fetchPerson = async function fetchPersonInfo() {
      if (personToChat !== undefined) {
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
      }
    };
    fetchPerson();
    return () => {
      mounted = false;
    };
  }, [chat]);
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
          {messages.length !== 0 &&
          person.length !== 0 &&
          personToChat === person.userId ? (
            <>
              <div className="flex items-center mb-4 border-b sticky z-20 bg-white top-16">
                <button
                  onClick={() => {
                    setClosed(!closed);
                    setCurrentChat(null);
                  }}
                  className="md:hidden ml-2 mr-1"
                >
                  <MdArrowBack className="text-4xl font-semibold" />
                </button>
                <img
                  className="w-10 sm:w-16 h-10 sm:h-16 rounded-full m-2"
                  src={person.avatar}
                  alt="profile picture"
                />
                <div className="text-2xl mt-1 flex items-center">
                  <span className="text-gray-700 mr-2">{person.firstName}</span>
                  <span className="text-gray-700 mr-3">{person.lastName}</span>
                </div>
              </div>
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
                          src={person.avatar}
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
            </>
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
