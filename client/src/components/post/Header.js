import React from "react";
import { Link } from "react-router-dom";

export default function Header({ firstname, lastName }) {
  return (
    <div className="flex border-b border-gray-primary h-4 p-2 py-8">
      <div className="flex items-center">
        <Link to={`/p/${firstname}`} className="flex items-center">
          <img
            className="rounded-full h-10 w-10 flex mr-2 ml-1"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="profile picture"
          />
          <p className="font-bold text-lg mr-1 text-gray-700">{firstname}</p>
          <p className="font-bold text-lg text-gray-700">{lastName}</p>
        </Link>
      </div>
    </div>
  );
}
