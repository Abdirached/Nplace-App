import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MdHome, MdMenu, MdClose } from "react-icons/md";
import { HiViewGrid, HiChatAlt } from "react-icons/hi";
import UserContext from "../context/UserProvider";
import logo from "../images/logo5.png";

export default function Navbar() {
  const { role } = useContext(UserContext);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  return (
    <div className="h-16 bg-white border-b border-gray-primary sticky top-0 z-50">
      <div className="h-full w-full">
        {role === "buyer" ? (
          <div className="flex justify-between h-full">
            <div className="text-gray-700 text-center flex items-center align-items cursor-default ml-4 md:ml-6 gap-3">
              <img src={logo} className="w-10 h-10 rounded-full" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Offerflow
              </span>
            </div>
            <div className=" hidden md:flex text-gray-700 text-center  justify-evenly items-center align-items gap-6 mr-6">
              <Link to="/Add" aria-label="Add">
                <button
                  type="button"
                  className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-md px-6 py-2 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Create a order
                </button>
              </Link>
              <Link to="/Chat" aria-label="Notifications">
                <HiChatAlt className=" text-2xl" />
              </Link>
              <Link to="/Profile" aria-label="Notifications">
                <HiViewGrid className=" text-2xl" />
              </Link>
              <button onClick={() => setDropDownOpen(!dropDownOpen)}>
                <img
                  className="rounded-full h-8 w-8 flex"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="profile picture"
                />
              </button>
              {dropDownOpen ? (
                <div className="origin-top-right absolute right-2 top-14 w-44 rounded shadow-lg py-1 bg-white focus:outline-none">
                  <ul
                    className="py-1 text-base text-gray-700 dark:text-gray-200 text-left"
                    aria-labelledby="dropdownDefault"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="md:hidden">
              <button onClick={() => setToggleOpen(!toggleOpen)}>
                {!toggleOpen ? (
                  <MdMenu className="text-2xl font-bold md:hidden mr-4 mt-4" />
                ) : (
                  <MdClose className="text-2xl font-bold md:hidden mr-4 mt-4" />
                )}
              </button>
              {toggleOpen ? (
                <div className=" md:hidden flex flex-col origin-top absolute right-0 mt-2  w-full rounded-md shadow-md py-1 bg-white focus:outline-none">
                  <Link
                    to="/Add"
                    aria-label="Add"
                    className="block px-4 py-4 text-sm text-gray-700"
                  >
                    <button
                      type="button"
                      className="text-white bg-indigo-500 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-md px-6 py-2 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Create a order
                    </button>
                  </Link>
                  <Link
                    to="/Chat"
                    aria-label="Notifications"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    <HiChatAlt className=" text-2xl font-bold mb-4" />
                  </Link>
                  <Link
                    to="/Profile"
                    aria-label="Profile"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    <HiViewGrid className=" text-2xl font-bold mb-4" />
                  </Link>
                  <button
                    onClick={() => setDropDownOpen(!dropDownOpen)}
                    className={`px-4 flex ${!dropDownOpen && "mb-4"}`}
                  >
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                      alt="profile picture"
                    />
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="caret-down"
                      className="w-2 ml-2 mt-2.5"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path
                        fill="currentColor"
                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                      ></path>
                    </svg>
                  </button>
                  {dropDownOpen ? (
                    <ul
                      className=" mb-2 text-base text-gray-700 dark:text-gray-200 text-left ml-10"
                      aria-labelledby="dropdownDefault"
                    >
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : role === "seller" ? (
          <div className="flex justify-between h-full">
            <div className="text-gray-700 text-center flex items-center align-items cursor-default md:ml-6 ml-4 gap-3">
              <img src={logo} className="w-10 h-10 rounded-full" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Offerflow
              </span>
            </div>
            <div className=" hidden md:flex text-gray-700 text-center  justify-evenly items-center align-items gap-6 mr-6">
              <Link to="/" aria-label="Home">
                <MdHome className=" text-2xl" />
              </Link>
              <Link to="/Chat" aria-label="Notifications">
                <HiChatAlt className=" text-2xl" />
              </Link>
              <button onClick={() => setDropDownOpen(!dropDownOpen)}>
                <img
                  className="rounded-full h-8 w-8 flex"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="profile picture"
                />
              </button>
              {dropDownOpen ? (
                <div className="origin-top-right absolute right-2 top-14 w-44 rounded shadow-lg py-1 bg-white focus:outline-none">
                  <ul
                    className="py-1 text-base text-gray-700 dark:text-gray-200 text-left"
                    aria-labelledby="dropdownDefault"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="md:hidden">
              <button onClick={() => setToggleOpen(!toggleOpen)}>
                {!toggleOpen ? (
                  <MdMenu className="text-3xl font-bold md:hidden mr-4 mt-4" />
                ) : (
                  <MdClose className="text-3xl font-bold md:hidden mr-4 mt-4" />
                )}
              </button>
              {toggleOpen ? (
                <div className=" md:hidden flex flex-col origin-top absolute right-0 mt-2 w-full rounded-md shadow-md py-1 bg-white focus:outline-none">
                  <Link
                    to="/"
                    aria-label="Home"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    <MdHome className=" text-2xl font-bold mb-4" />
                  </Link>
                  <Link
                    to="/Chat"
                    aria-label="Notifications"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    <HiChatAlt className=" text-2xl font-bold mb-4" />
                  </Link>
                  <button
                    onClick={() => setDropDownOpen(!dropDownOpen)}
                    className={`px-4 flex ${!dropDownOpen && "mb-4"}`}
                  >
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                      alt="profile picture"
                    />
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="caret-down"
                      className="w-2 ml-2 mt-2.5"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path
                        fill="currentColor"
                        d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                      ></path>
                    </svg>
                  </button>
                  {dropDownOpen ? (
                    <ul
                      className="mb-2 text-base text-gray-700 dark:text-gray-200 text-left ml-4"
                      aria-labelledby="dropdownDefault"
                    >
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
