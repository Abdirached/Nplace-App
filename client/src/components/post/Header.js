import React from "react";
import { Link } from "react-router-dom";

export default function Header({ firstname }) {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${firstname}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="profile picture"
          />
          <p className="font-bold">{firstname}</p>
        </Link>
      </div>
    </div>
  );
}
