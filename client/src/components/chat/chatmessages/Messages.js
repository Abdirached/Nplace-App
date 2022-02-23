import { useState, useEffect, useContext, useRef } from "react";
import { formatRelative } from "date-fns";
import ReactLoader from "../../ReactLoader";
import SendMessage from "./SendMessage";
import { MdArrowBack } from "react-icons/md";
import { MessagesContext } from "../../../context/MessagesProvider";
import { SocketContext } from "../../../context/SocketProvider";
const axios = require("axios");
export default function Messages({
  user,
  currentChat,
  setCurrentChat,
  closed,
  setClosed,
}) {
  const socket = useContext(SocketContext);
  const { messages, setMessages } = useContext(MessagesContext);
  const [chat, setChat] = useState([]);
  const [person, setPerson] = useState([]);
  const chatOwners = [chat.ownerOne, chat.ownerTwo];
  const personToChat = chatOwners.find((person) => person !== user);
  // console.log(chatMessages);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    const scrollToBottom = function scrollToBottomfunc() {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [messages, socket]);
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
    if (currentChat !== messages[messages.length - 1]?.chatId) {
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
    if (!socket) return;
    socket.on("getMessage", (data) => {
      console.log(data);
      if (currentChat === data.chatId) {
        setMessages((prev) => [...prev, data]);
      } else {
        console.log("wrong room");
      }
    });
    return () => {
      socket.off("getMessage");
    };
  }, [currentChat]);
  return (
    <div className=" w-full h-full">
      {currentChat ? (
        <div>
          {messages.length !== 0 &&
          person.length !== 0 &&
          personToChat === person.userId ? (
            <div>
              <div className="flex items-center mb-4 border-b shadow-sm sticky z-20 bg-white top-0">
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
                  className="w-10 sm:w-16 h-10 sm:h-16 rounded-full m-4"
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
                    {message.senderId !== user ? (
                      <div className="flex flex-col">
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
                        <div className="flex items-start">
                          <span className="px-4 py-2 rounded-lg inline-block rounded-br-none text-gray-600 text-xs ml-6">
                            {formatRelative(
                              new Date(message.createdAt),
                              new Date()
                            )}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <div className="flex items-end justify-end">
                          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                            <div>
                              <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-300 text-gray-600">
                                {message.text}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-end justify-end">
                          <span className="px-4 py-2 rounded-lg inline-block rounded-br-none text-gray-600 text-xs">
                            {formatRelative(
                              new Date(message.createdAt),
                              new Date()
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef}></div>
                <SendMessage chat={chat} user={user} socket={socket} />
              </div>
            </div>
          ) : (
            <div>
              <ReactLoader />
            </div>
          )}
        </div>
      ) : (
        <div className=" m-0 absolute top-1/2 left-1/2">
          <span className="text-4xl text-gray-300">
            Open chat to start conversation
          </span>
        </div>
      )}
    </div>
  );
}
