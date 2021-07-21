import React from "react";

export default function Footer({ firstname, caption }) {
  return (
    <div className="p-4 pt-2 pb-1">
      <span className="mr-1 font-bold">{firstname}</span>
      <span className="italic">{caption}</span>
    </div>
  );
}
