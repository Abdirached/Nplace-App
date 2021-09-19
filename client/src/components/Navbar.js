import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-4">
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 mr-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
            <Link to="/Profile" aria-label="Profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 mr-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
            <Link to="/Add" aria-label="Add">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 mr-6 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
