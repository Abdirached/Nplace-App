import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MdCloudUpload, MdMail, MdHome, MdMenu, MdClose } from "react-icons/md";
import UserContext from "../context/UserProvider";
import logo from "../images/keekeen2.png";

export default function Navbar() {
  const { role } = useContext(UserContext);
  const [toggleOpen, setToggleOpen] = useState(false);
  return (
    <div className="h-16 bg-white border-b border-gray-primary sticky top-0 z-50">
      <div className="h-full w-full">
        {role === "buyer" ? (
          <div className="flex justify-between h-full">
            <div className="text-gray-700 text-center flex items-center align-items cursor-default md:ml-6">
              <img src={logo} className="mt-4 mb-2 w-48 h-40" />
            </div>
            <div className=" hidden md:flex text-gray-700 text-center  justify-evenly items-center align-items gap-6 mr-6">
              <Link to="/Add" aria-label="Add">
                <MdCloudUpload className=" text-3xl" />
              </Link>
              <Link to="/Chat" aria-label="Notifications">
                <MdMail className=" text-3xl" />
              </Link>
              <Link to="/Profile" aria-label="Profile">
                <img
                  className="rounded-full h-8 w-8 flex"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="profile picture"
                />
              </Link>
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
                <div className=" md:hidden flex flex-col origin-top absolute right-0 mt-2  w-full rounded-md shadow-md py-1 bg-white focus:outline-none">
                  <Link
                    to="/Add"
                    aria-label="Add"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    <MdCloudUpload className=" text-3xl font-bold mb-4" />
                  </Link>
                  <Link
                    to="/Chat"
                    aria-label="Notifications"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    <MdMail className=" text-3xl font-bold mb-4" />
                  </Link>
                  <Link
                    to="/Profile"
                    aria-label="Profile"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                      alt="profile picture"
                    />
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        ) : role === "seller" ? (
          <div className="flex justify-between h-full">
            <div className="text-gray-700 text-center flex items-center align-items cursor-default md:ml-6">
              <img src={logo} className="mt-4 mb-2 w-48 h-40" />
            </div>
            <div className=" hidden md:flex text-gray-700 text-center  justify-evenly items-center align-items gap-6 mr-6">
              <Link to="/" aria-label="Home">
                <MdHome className=" text-3xl" />
              </Link>
              <Link to="/Chat" aria-label="Notifications">
                <MdMail className=" text-3xl" />
              </Link>
              <Link to="/Profile" aria-label="Profile">
                <img
                  className="rounded-full h-8 w-8"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="profile picture"
                />
              </Link>
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
                    <MdHome className=" text-3xl font-bold mb-4" />
                  </Link>
                  <Link
                    to="/Chat"
                    aria-label="Notifications"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    <MdMail className=" text-3xl font-bold mb-4" />
                  </Link>
                  <Link
                    to="/Profile"
                    aria-label="Profile"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                      alt="profile picture"
                    />
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
