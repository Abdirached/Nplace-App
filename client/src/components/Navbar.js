import { Link } from "react-router-dom";
import { MdCloudUpload, MdNotifications, MdHome } from "react-icons/md";

export default function Navbar() {
  return (
    <div className="h-16 bg-white border-b border-gray-primary mb-4 sticky top-0 z-50">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to="/" aria-label="home">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToppz55Pdmw3ijkiuOuiOkmDZvMIxPSh6ZGg&usqp=CAU"
                  className="mt-2 mb-2 w-3/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex justify-evenly items-center align-items">
            <Link to="/" aria-label="Home">
              <MdHome className=" text-3xl font-bold mr-4" />
            </Link>
            <Link to="/Add" aria-label="Add">
              <MdCloudUpload className=" text-3xl font-bold mr-4" />
            </Link>
            <Link to="/Notifications" aria-label="Notifications">
              <MdNotifications className=" text-3xl font-bold mr-4" />
            </Link>
            <Link to="/Profile" aria-label="Profile">
              <img
                className="rounded-full h-8 w-8 flex"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="profile picture"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
